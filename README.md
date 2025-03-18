# Celebrity Game

A web-based implementation of the Celebrity game where players can create rooms, join existing rooms, and play together.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or a remote instance)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `backend` directory
   - Add the following variables:
     ```
     MONGODB_URI=mongodb://localhost:27017/celebrity-game
     PORT=5000
     ```

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## How to Play

1. Create a Room:
   - Enter your username
   - Click "Create New Room"
   - Share the room code with other players

2. Join a Room:
   - Enter your username
   - Enter the room code
   - Click "Join Room"

3. Start the Game:
   - Once all players have joined, the room moderator can start the game
   - Each player enters a celebrity name
   - When everyone has submitted, the list of celebrities will be displayed to all players

## Technologies Used

- Frontend:
  - React
  - TypeScript
  - Chakra UI
  - Socket.IO Client
  - Vite

- Backend:
  - Node.js
  - Express
  - TypeScript
  - MongoDB with Mongoose
  - Socket.IO 