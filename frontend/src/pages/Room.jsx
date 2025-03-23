import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Input,
  Button,
  List,
  ListItem,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import io from 'socket.io-client';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Room = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const [players, setPlayers] = useState([]);
  const [celebrity, setCelebrity] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [celebrities, setCelebrities] = useState([]);
  const [username] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('username') || '';
  });
  const toast = useToast();
  
  useEffect(() => {
    const socket = io(API_BASE_URL);
    
    socket.emit('joinRoom', roomId);
    
    socket.on('playerJoined', (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });
    
    socket.on('gameStarted', () => {
      setGameStarted(true);
    });
    
    socket.on('allCelebritiesSubmitted', (allCelebrities) => {
      setCelebrities(allCelebrities);
    });
    
    return () => {
      socket.disconnect();
    };
  }, [roomId]);
  
  const startGame = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/rooms/${roomId}/start`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to start game',
        status: 'error',
        duration: 3000,
      });
    }
  };
  
  const submitCelebrity = async () => {
    try {
      if (!celebrity) {
        toast({
          title: 'Error',
          description: 'Please enter a celebrity name',
          status: 'error',
          duration: 3000,
        });
        return;
      }
      
      await axios.post(`${API_BASE_URL}/api/rooms/${roomId}/celebrity`, { 
        celebrity,
        username 
      });
      setCelebrity('');
      
      toast({
        title: 'Success',
        description: 'Celebrity submitted successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit celebrity',
        status: 'error',
        duration: 3000,
      });
    }
  };
  
  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8}>
        <Heading>Room: {roomId}</Heading>
        
        <Box w="100%" p={6} borderRadius="lg" borderWidth={1} bg="white">
          <VStack spacing={4}>
            <Text fontWeight="bold">Players:</Text>
            <List spacing={2} w="100%">
              {players.map((player) => (
                <ListItem key={player.username}>
                  {player.username} {player.isModerator ? '(Moderator)' : ''} 
                  {player.hasSubmittedCelebrity ? '✓' : ''}
                </ListItem>
              ))}
            </List>
            
            {!gameStarted && players.some(p => p.isModerator) && (
              <Button colorScheme="blue" onClick={startGame} w="100%">
                Start Game
              </Button>
            )}
            
            {gameStarted && celebrities.length === 0 && !players.find(p => p.username === username)?.hasSubmittedCelebrity && (
              <>
                <Input
                  placeholder="Enter a celebrity name"
                  value={celebrity}
                  onChange={(e) => setCelebrity(e.target.value)}
                />
                <Button colorScheme="green" onClick={submitCelebrity} w="100%">
                  Submit Celebrity
                </Button>
              </>
            )}
            
            {celebrities.length > 0 && (
              <>
                <Text fontWeight="bold">Celebrity List:</Text>
                <List spacing={2} w="100%">
                  {celebrities.map((celeb, index) => (
                    <ListItem key={index}>{celeb}</ListItem>
                  ))}
                </List>
              </>
            )}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Room; 