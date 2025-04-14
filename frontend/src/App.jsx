import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
import Home from './pages/Home';
import Room from './pages/Room';
import Rules from './pages/Rules';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#f7ede2',
      }
    }
  },
  colors: {
    brand: {
      primary: '#f7ede2',    // Main background
      secondary: '#f5cac3',  // Secondary elements
      accent1: '#f6bd60',    // Buttons and highlights
      accent2: '#84a59d',    // Navigation and headers
      accent3: '#f28482',    // Important actions/alerts
    }
  }
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="gray.50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </Box>
    </ChakraProvider>
  );
};

export default App; 