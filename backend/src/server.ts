import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Room } from './models/Room.js';
import { generateRoomCode } from './utils/roomCode.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Socket.IO connection handling
io.on('connection', (socket) => {
  socket.on('joinRoom', async (roomId) => {
    socket.join(roomId);
    const room = await Room.findOne({ roomCode: roomId });
    if (room) {
      io.to(roomId).emit('playerJoined', room.players);
    }
  });
});

// API Routes
app.post('/api/rooms/create', async (req, res) => {
  try {
    const { username } = req.body;
    const roomCode = generateRoomCode();

    const room = new Room({
      roomCode,
      players: [{ username, isModerator: true }],
    });

    await room.save();
    res.json({ roomCode });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create room' });
  }
});

app.post('/api/rooms/:roomId/join', async (req, res) => {
  try {
    const { roomId } = req.params;
    const { username } = req.body;

    const room = await Room.findOne({ roomCode: roomId });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    if (room.isGameStarted) {
      return res.status(400).json({ error: 'Game has already started' });
    }

    room.players.push({ username, isModerator: false });
    await room.save();

    io.to(roomId).emit('playerJoined', room.players);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to join room' });
  }
});

app.post('/api/rooms/:roomId/start', async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findOne({ roomCode: roomId });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    room.isGameStarted = true;
    await room.save();

    io.to(roomId).emit('gameStarted');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to start game' });
  }
});

app.post('/api/rooms/:roomId/celebrity', async (req, res) => {
  try {
    const { roomId } = req.params;
    const { celebrity, username } = req.body;

    const room = await Room.findOne({ roomCode: roomId });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const player = room.players.find((p) => p.username === username);
    if (player) {
      player.hasSubmittedCelebrity = true;
      player.celebrity = celebrity;
    }

    await room.save();

    // Check if all players have submitted
    const allSubmitted = room.players.every((p) => p.hasSubmittedCelebrity);
    if (allSubmitted) {
      const celebrities = room.players.map((p) => p.celebrity!).sort(() => Math.random() - 0.5);
      room.celebrities = celebrities;
      await room.save();
      io.to(roomId).emit('allCelebritiesSubmitted', celebrities);
    }

    io.to(roomId).emit('playerJoined', room.players);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit celebrity' });
  }
});

const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
