import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const Home: React.FC = () => {
  const [roomCode, setRoomCode] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const createRoom = async () => {
    try {
      if (!username) {
        toast({
          title: 'Error',
          description: 'Please enter a username',
          status: 'error',
          duration: 3000,
        });
        return;
      }
      
      const response = await axios.post('/api/rooms/create', { username });
      navigate(`/room/${response.data.roomCode}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create room',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const joinRoom = async () => {
    try {
      if (!username || !roomCode) {
        toast({
          title: 'Error',
          description: 'Please enter both username and room code',
          status: 'error',
          duration: 3000,
        });
        return;
      }

      await axios.post(`/api/rooms/${roomCode}/join`, { username });
      navigate(`/room/${roomCode}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to join room',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8}>
        <Heading>Celebrity Game</Heading>
        <Box w="100%" p={6} borderRadius="lg" borderWidth={1} bg="white">
          <VStack spacing={4}>
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button colorScheme="blue" w="100%" onClick={createRoom}>
              Create New Room
            </Button>
            <Text>- OR -</Text>
            <Input
              placeholder="Enter room code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <Button colorScheme="green" w="100%" onClick={joinRoom}>
              Join Room
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Home; 