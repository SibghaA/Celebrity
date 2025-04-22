import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  VisuallyHidden,
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
    <Container maxW="container.md" py={10} role="main" aria-label="Celebrity Game Home">
      <VStack spacing={8} bg="white" p={8} borderRadius="xl" boxShadow="lg">
        <Heading as="h1" color="brand.accent2">Celebrity Game</Heading>
        
        <Box as="section" aria-label="Create New Room" w="full">
          <VisuallyHidden as="h2">Create New Room as Moderator</VisuallyHidden>
          <Input
            placeholder="Enter moderator's name"
            value={moderatorName}
            onChange={(e) => setModeratorName(e.target.value)}
            bg="white"
            borderColor="brand.accent1"
            _hover={{ borderColor: 'brand.accent3' }}
            aria-label="Moderator name"
            required
          />
          <Button
            onClick={createRoom}
            bg="brand.accent1"
            color="white"
            _hover={{ bg: 'brand.accent3' }}
            w="full"
            mt={4}
            aria-label="Create new room as moderator"
          >
            Create New Room
          </Button>
        </Box>

        <Text color="brand.accent2" role="separator" aria-label="or">- OR -</Text>

        <Box as="section" aria-label="Join Existing Room" w="full">
          <VisuallyHidden as="h2">Join Existing Room as Player</VisuallyHidden>
          <Input
            placeholder="Enter player name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            bg="white"
            borderColor="brand.accent1"
            _hover={{ borderColor: 'brand.accent3' }}
            aria-label="Player name"
            required
          />
          <Input
            placeholder="Enter room code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            bg="white"
            borderColor="brand.accent1"
            _hover={{ borderColor: 'brand.accent3' }}
            mt={4}
            aria-label="Room code"
            required
          />
          <Button
            onClick={joinRoom}
            bg="brand.accent2"
            color="white"
            _hover={{ bg: 'brand.accent3' }}
            w="full"
            mt={4}
            aria-label="Join existing room as player"
          >
            Join Room
          </Button>
        </Box>

        <Button
          onClick={openRules}
          bg="brand.accent3"
          color="white"
          size="md"
          w="auto"
          _hover={{ bg: 'brand.accent1' }}
          fontWeight="bold"
          aria-label="Open game rules in new tab"
        >
          Game Rules
        </Button>
      </VStack>
    </Container>
  );
};

Home.propTypes = {
  onCreateRoom: PropTypes.func,
  onJoinRoom: PropTypes.func,
  onOpenRules: PropTypes.func,
};

Home.defaultProps = {
  onCreateRoom: () => {},
  onJoinRoom: () => {},
  onOpenRules: () => {},
};

export default Home; 