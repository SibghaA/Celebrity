import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  isModerator: { type: Boolean, default: false },
  hasSubmittedCelebrity: { type: Boolean, default: false },
  celebrity: { type: String },
});

const roomSchema = new mongoose.Schema({
  roomCode: { type: String, required: true, unique: true },
  isGameStarted: { type: Boolean, default: false },
  players: [playerSchema],
  celebrities: [{ type: String }],
});

export const Room = mongoose.model('Room', roomSchema); 