import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
  VisuallyHidden,
} from '@chakra-ui/react';
import axios from 'axios';
import io from 'socket.io-client';

// Define Player PropType shape
const PlayerShape = PropTypes.shape({
  username: PropTypes.string.isRequired,
  isModerator: PropTypes.bool.isRequired,
  hasSubmittedCelebrity: PropTypes.bool.isRequired,
  celebrity: PropTypes.string,
});

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
  
  // Helper function to check if current user is moderator
  const isModerator = players.find(p => p.username === username)?.isModerator;

  return (
    <Container maxW="container.lg" py={10} role="main" aria-label="Game Room">
      <VStack spacing={6} bg="white" p={8} borderRadius="xl" boxShadow="lg">
        <Heading as="h1" color="brand.accent2">
          Room Code: <span aria-label={`Room code is ${roomId}`}>{roomId}</span>
        </Heading>
        
        <Text fontSize="lg" color="brand.accent2" role="status">
          Welcome, {username}!
        </Text>
        
        <Box as="section" aria-label="Players List" w="full">
          <Heading as="h2" size="md" color="brand.accent2" mb={2}>
            Players:
          </Heading>
          <List spacing={3} w="full" role="list">
            {players.map((player, index) => (
              <ListItem
                key={index}
                p={3}
                bg="white"
                borderRadius="md"
                border="1px"
                borderColor="gray.200"
                role="listitem"
                aria-label={`${player.username}${player.isModerator ? ', Moderator' : ''}${player.hasSubmittedCelebrity ? ', has submitted celebrity' : ', has not submitted celebrity'}`}
              >
                <HStack justify="space-between">
                  <Text>
                    {player.username} {player.isModerator && (
                      <span aria-label="Moderator">(Moderator)</span>
                    )}
                  </Text>
                  {player.hasSubmittedCelebrity && (
                    <>
                      <Text fontSize="lg" color="green.500" aria-hidden="true">✓</Text>
                      <VisuallyHidden>Has submitted celebrity</VisuallyHidden>
                    </>
                  )}
                </HStack>
              </ListItem>
            ))}
          </List>
        </Box>

        {!gameStarted && isModerator && (
          <Button
            onClick={startGame}
            bg="brand.accent1"
            color="white"
            _hover={{ bg: 'brand.accent3' }}
            w="full"
            aria-label="Start the game"
          >
            Start Game
          </Button>
        )}

        {gameStarted && !players.find(p => p.username === username)?.hasSubmittedCelebrity && (
          <VStack w="full" spacing={4} as="form" role="form" aria-label="Submit celebrity form">
            <Input
              placeholder="Enter a celebrity name"
              value={celebrity}
              onChange={(e) => setCelebrity(e.target.value)}
              bg="white"
              borderColor="brand.accent1"
              _hover={{ borderColor: 'brand.accent3' }}
              aria-label="Enter celebrity name"
              required
            />
            <Button
              onClick={submitCelebrity}
              bg="brand.accent1"
              color="white"
              _hover={{ bg: 'brand.accent3' }}
              w="full"
              aria-label="Submit celebrity name"
            >
              Submit Celebrity
            </Button>
          </VStack>
        )}

        {celebrities.length > 0 && isModerator && (
          <Box as="section" aria-label="Celebrities List" w="full">
            <Heading as="h2" size="md" color="brand.accent2">
              Celebrities to Guess:
            </Heading>
            <List spacing={3} w="full" role="list">
              {celebrities.map((celeb, index) => (
                <ListItem
                  key={index}
                  p={3}
                  bg="white"
                  borderRadius="md"
                  border="1px"
                  borderColor="gray.200"
                  role="listitem"
                  aria-label={`Celebrity ${index + 1}: ${celeb}`}
                >
                  {celeb}
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {celebrities.length > 0 && !isModerator && (
          <Text 
            color="brand.accent2" 
            fontStyle="italic"
            role="status"
            aria-live="polite"
          >
            All celebrities have been submitted. The moderator will share the list with everyone.
          </Text>
        )}
      </VStack>
    </Container>
  );
};

Room.propTypes = {
  players: PropTypes.arrayOf(PlayerShape),
  celebrities: PropTypes.arrayOf(PropTypes.string),
  gameStarted: PropTypes.bool,
  username: PropTypes.string,
  roomId: PropTypes.string,
};

Room.defaultProps = {
  players: [],
  celebrities: [],
  gameStarted: false,
  username: '',
  roomId: '',
};

export default Room; 