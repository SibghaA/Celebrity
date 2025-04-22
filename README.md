# Celebrity Game

"Celebrity" is an interactive web-based party game where players submit celebrity names anonymously and then try to match other players to their submitted celebrities. The game combines elements of social deduction, memory, and interpersonal knowledge to create an engaging multiplayer experience that can be played in classroom settings, parties, or virtual gatherings.

## Author

Sibgha Ahmad

## Useful Links
* Usability Study: https://docs.google.com/document/d/145BX3r-Lu1TUup0I5x-NXiUiUv7oihycem5SNgOEF9E/edit?tab=t.0#heading=h.jes5k3v1bf1u
* Video demo: https://youtu.be/kz7RfYTgMbQ
* Slides: https://docs.google.com/presentation/d/1iyW6hkLYjMHEakUd2-VddsN6x1cbMVrh092yabyQOtU/edit?slide=id.g218a6db239b_0_0#slide=id.g218a6db239b_0_0
* Design Document: https://docs.google.com/document/d/1hBNsHlk04Fn01MpLURZQR7yISB0Kr-l29n8hbOTohkE/edit?tab=t.0
* Deployed Application: http://3.140.228.98/


# Project Structure

```
CELEBRITY/
├── README.md
├── LICENSE
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── types/
│   │   ├── utils/
│   │   └── server.ts
│   ├── .env
│   ├── .eslintrc.json
│   ├── .prettierrc
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Room.jsx
    │   │   └── Rules.jsx
    │   ├── App.jsx
    │   ├── env.d.ts
    │   └── main.jsx
    ├── .env
    ├── .env.production 
    ├── .eslintrc.json
    ├── .gitignore
    ├── .prettierrc
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.js
    └── CelebrityScreenshot.png
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
