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
  HStack,
  Icon,
} from '@chakra-ui/react';
import axios from 'axios';
import io from 'socket.io-client';

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
    const socket = io({
      path: '/socket.io'
    });
    
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
      await axios.post(`/api/rooms/${roomId}/start`);
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
      
      await axios.post(`/api/rooms/${roomId}/celebrity`, { 
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
    <Container maxW="container.lg" py={10}>
      <VStack spacing={6} bg="white" p={8} borderRadius="xl" boxShadow="lg">
        <Heading color="brand.accent2">Room Code: {roomId}</Heading>
        <Text fontSize="lg" color="brand.accent2">
          Welcome, {username}!
        </Text>
        
        <List spacing={3} w="full">
          <Heading size="md" color="brand.accent2" mb={2}>
            Players:
          </Heading>
          {players.map((player, index) => (
            <ListItem
              key={index}
              p={3}
              bg="#f6bd60"
              borderRadius="md"
              color="white"
            >
              <HStack justify="space-between">
                <Text>
                  {player.username} {player.isModerator && "(Moderator)"}
                </Text>
                {player.hasSubmittedCelebrity && (
                  <Text fontSize="lg" color="green.500">✓</Text>
                )}
              </HStack>
            </ListItem>
          ))}
        </List>

        {!gameStarted && players.some(p => p.isModerator) && (
          <Button
            onClick={startGame}
            bg="brand.accent1"
            color="white"
            _hover={{ bg: 'brand.accent3' }}
            w="full"
          >
            Start Game
          </Button>
        )}

        {gameStarted && !players.find(p => p.username === username)?.hasSubmittedCelebrity && (
          <VStack w="full" spacing={4}>
            <Input
              placeholder="Enter a celebrity name"
              value={celebrity}
              onChange={(e) => setCelebrity(e.target.value)}
              bg="white"
              borderColor="brand.accent1"
              _hover={{ borderColor: 'brand.accent3' }}
            />
            <Button
              onClick={submitCelebrity}
              bg="brand.accent1"
              color="white"
              _hover={{ bg: 'brand.accent3' }}
              w="full"
            >
              Submit Celebrity
            </Button>
          </VStack>
        )}

        {celebrities.length > 0 && (
          <VStack w="full" spacing={4}>
            <Heading size="md" color="brand.accent2">
              Celebrities to Guess:
            </Heading>
            <List spacing={3} w="full">
              {celebrities.map((celeb, index) => (
                <ListItem
                  key={index}
                  p={3}
                  bg="white"
                  borderRadius="md"
                  border="1px"
                  borderColor="gray.200"
                >
                  {celeb}
                </ListItem>
              ))}
            </List>
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Room; 