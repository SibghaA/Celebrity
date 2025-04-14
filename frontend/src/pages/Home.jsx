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

const Home = () => {
  const [roomCode, setRoomCode] = useState('');
  const [moderatorName, setModeratorName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const createRoom = async () => {
    try {
      if (!moderatorName) {
        toast({
          title: 'Error',
          description: 'Please enter moderator name',
          status: 'error',
          duration: 3000,
        });
        return;
      }
      
      const response = await axios.post('/api/rooms/create', { username: moderatorName });
      navigate(`/room/${response.data.roomCode}?username=${encodeURIComponent(moderatorName)}`);
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
      if (!playerName || !roomCode) {
        toast({
          title: 'Error',
          description: 'Please enter both player name and room code',
          status: 'error',
          duration: 3000,
        });
        return;
      }

      await axios.post(`/api/rooms/${roomCode}/join`, { username: playerName });
      navigate(`/room/${roomCode}?username=${encodeURIComponent(playerName)}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to join room',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const openRules = () => {
    window.open('/rules', '_blank');
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} bg="white" p={8} borderRadius="xl" boxShadow="lg">
        <Heading color="brand.accent2">Celebrity Game</Heading>
        
        <Input
          placeholder="Enter moderator's name"
          value={moderatorName}
          onChange={(e) => setModeratorName(e.target.value)}
          bg="white"
          borderColor="brand.accent1"
          _hover={{ borderColor: 'brand.accent3' }}
        />
        <Button
          onClick={createRoom}
          bg="brand.accent1"
          color="white"
          _hover={{ bg: 'brand.accent3' }}
          w="full"
        >
          Create New Room
        </Button>

        <Text color="brand.accent2">- OR -</Text>

        <Input
          placeholder="Enter player name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          bg="white"
          borderColor="brand.accent1"
          _hover={{ borderColor: 'brand.accent3' }}
        />
        <Input
          placeholder="Enter room code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          bg="white"
          borderColor="brand.accent1"
          _hover={{ borderColor: 'brand.accent3' }}
        />
        <Button
          onClick={joinRoom}
          bg="brand.accent2"
          color="white"
          _hover={{ bg: 'brand.accent3' }}
          w="full"
        >
          Join Room
        </Button>

        <Button
          onClick={openRules}
          bg="brand.accent3"
          color="white"
          size="md"
          w="auto"
          _hover={{ bg: 'brand.accent1' }}
          fontWeight="bold"
        >
          Game Rules
        </Button>
      </VStack>
    </Container>
  );
};

export default Home; 