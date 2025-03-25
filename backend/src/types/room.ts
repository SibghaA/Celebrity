export interface Player {
  username: string;
  isModerator: boolean;
  hasSubmittedCelebrity: boolean;
  celebrity?: string;
}

export interface Room {
  roomCode: string;
  isGameStarted: boolean;
  players: Player[];
  celebrities: string[];
} 