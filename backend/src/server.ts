import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';
import { generateRoomCode } from './utils/roomCode.js';
import { Room, Player } from './types/room.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const client = new MongoClient(process.env.MONGODB_URI!);
let db: Db;

app.use(express.json());

// Connect to MongoDB
async function connectToMongo() {
  try {
    await client.connect();
    db = client.db('celebrity-game');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

connectToMongo();

// Socket.IO connection handling
io.on('connection', (socket) => {
  socket.on('joinRoom', async (roomId) => {
    socket.join(roomId);
    const room = await db.collection('rooms').findOne({ roomCode: roomId });
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

    const room: Room = {
      roomCode,
      isGameStarted: false,
      players: [{ username, isModerator: true, hasSubmittedCelebrity: false }],
      celebrities: [],
    };

    await db.collection('rooms').insertOne(room);
    res.json({ roomCode });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create room' });
  }
});

app.post('/api/rooms/:roomId/join', async (req, res) => {
  try {
    const { roomId } = req.params;
    const { username } = req.body;

    const room = await db.collection('rooms').findOne({ roomCode: roomId });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    if (room.isGameStarted) {
      return res.status(400).json({ error: 'Game has already started' });
    }

    const newPlayer: Player = { username, isModerator: false, hasSubmittedCelebrity: false };
    await db
      .collection('rooms')
      .updateOne({ roomCode: roomId }, { $push: { players: newPlayer as any } });

    const updatedRoom = await db.collection('rooms').findOne({ roomCode: roomId });
    if (!updatedRoom) {
      return res.status(500).json({ error: 'Failed to update room' });
    }

    io.to(roomId).emit('playerJoined', updatedRoom.players);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to join room' });
  }
});

app.post('/api/rooms/:roomId/start', async (req, res) => {
  try {
    const { roomId } = req.params;

    const result = await db
      .collection('rooms')
      .updateOne({ roomCode: roomId }, { $set: { isGameStarted: true } });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }

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

    const room = await db.collection('rooms').findOne({ roomCode: roomId });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const player = room.players.find((p: Player) => p.username === username);
    if (player) {
      player.hasSubmittedCelebrity = true;
      player.celebrity = celebrity;
    }

    await db
      .collection('rooms')
      .updateOne({ roomCode: roomId }, { $set: { players: room.players } });

    // Check if all players have submitted
    const allSubmitted = room.players.every((p: Player) => p.hasSubmittedCelebrity);
    if (allSubmitted) {
      const celebrities = room.players
        .map((p: Player) => p.celebrity!)
        .sort(() => Math.random() - 0.5);
      await db
        .collection('rooms')
        .updateOne({ roomCode: roomId }, { $set: { celebrities: celebrities } });
      io.to(roomId).emit('allCelebritiesSubmitted', celebrities);
    }

    io.to(roomId).emit('playerJoined', room.players);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit celebrity' });
  }
});

// Cleanup on server shutdown
process.on('SIGINT', async () => {
  try {
    await client.close();
    process.exit(0);
  } catch (error) {
    console.error('Error during cleanup:', error);
    process.exit(1);
  }
});

const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
