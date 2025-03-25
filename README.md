# Celebrity Game

"Celebrity" is an interactive web-based party game where players submit celebrity names anonymously and then try to match other players to their submitted celebrities. The game combines elements of social deduction, memory, and interpersonal knowledge to create an engaging multiplayer experience that can be played in classroom settings, parties, or virtual gatherings.

## Author

Sibgha Ahmad

## Useful Links
Video demo: 
Slides: https://docs.google.com/presentation/d/1yajsFIgxmoiooYI_mCcvdq3o4GG3MdQZ9-VVg4t0OBM/edit#slide=id.g32826e2c885_0_67
Design Document: https://docs.google.com/document/d/1FmdwVxQvugul5ilbhRcgqyJbeDzh7CTB3hkGtt9qKXE/edit?tab=t.0
Deployed Application: http://3.140.228.98/


# Project Structure

```
CELEBRITY/
├── backend/
│   ├── dist/
│   ├── node_modules/
│   ├── src/
│   │   ├── models/
│   │   ├── types/
│   │   │   └── room.ts
│   │   ├── utils/
│   │   │   └── roomCode.ts
│   │   └── server.ts
│   ├── .env
│   ├── .eslintrc.json
│   ├── .prettierrc
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── node_modules/
│   ├── src/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── env.d.ts
│   │   └── main.jsx
│   ├── .env
│   ├── .env.production
│   ├── .eslintrc.json
│   ├── .gitignore
│   ├── .prettierrc
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.js
├── .gitignore
├── CelebrityScreenshot.png
├── LICENSE
└── README.md
```

## Architecture Overview

The project follows a modern full-stack architecture with separate frontend and backend components:

### Backend
- **Node.js** TypeScript server 
- Custom type definitions in `types/room.ts`
- Utility functions for room management in `utils/roomCode.ts`
- TypeScript configuration with `tsconfig.json`
- Compiled output stored in the `dist` directory

### Frontend
- **React** application built with **Vite**
- JSX components with TypeScript support
- Environment-specific configurations (.env files)
- Built with modern tooling (ESLint, Prettier)

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
     PORT=8000
     ```

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
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
  - MongoDB 
  - Socket.IO
  
## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
