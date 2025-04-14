import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  VStack,
  Heading,
  Text,
  Box,
  UnorderedList,
  ListItem,
  OrderedList,
  Button,
} from '@chakra-ui/react';

const Rules = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} bg="white" p={8} borderRadius="xl" boxShadow="lg" align="start">
        <Heading color="brand.accent2" size="xl">Celebrity Guessing Game Rules</Heading>
        
        <Box>
          <OrderedList spacing={4}>
            <ListItem>
              <Text fontWeight="bold">Secret Selection:</Text>
              <Text>Each player secretly chooses a celebrity name without telling anyone.</Text>
            </ListItem>
            
            <ListItem>
              <Text fontWeight="bold">Taking Turns:</Text>
              <Text>Players take turns guessing which celebrity name belongs to which player.</Text>
              <Text>On your turn, you make one guess at a time.</Text>
              <Text fontStyle="italic">Example: "I think Sarah chose Brad Pitt."</Text>
            </ListItem>
            
            <ListItem>
              <Text fontWeight="bold">Correct Guesses:</Text>
              <UnorderedList>
                <ListItem>The correctly guessed player joins your team</ListItem>
                <ListItem>You get to continue guessing until you make a wrong guess</ListItem>
              </UnorderedList>
            </ListItem>
            
            <ListItem>
              <Text fontWeight="bold">Winning Strategy:</Text>
              <Text>The goal is to avoid being guessed while correctly guessing others.</Text>
              <UnorderedList>
                <ListItem>Choose a celebrity that others wouldn't easily associate with you</ListItem>
                <ListItem>The last player/team remaining wins</ListItem>
              </UnorderedList>
            </ListItem>
            
            <ListItem>
              <Text fontWeight="bold">Game End:</Text>
              <Text>The game ends when all but one player/team have not been guessed.</Text>
            </ListItem>
          </OrderedList>
        </Box>

        <Text fontWeight="bold" fontStyle="italic" color="brand.accent2">
          Remember, pick challenging celebrities that aren't obvious matches to your personality or interests!
        </Text>

        <Heading color="brand.accent2" size="lg" pt={4}>How to play the game</Heading>
        
        <Box>
          <UnorderedList spacing={4}>
            <ListItem>
              If you're the moderator, add your name and create a new room.
            </ListItem>
            <ListItem>
              Then, share the room code with your friends!
            </ListItem>
            <ListItem>
              For all other players, add your name and the room code shared by the moderator.
            </ListItem>
            <ListItem>
              Once all players have joined the game, start the game and submit your celebrity name.
            </ListItem>
            <ListItem>
              A randomized celebrity list will be generated from all the celebrities given by all players.
            </ListItem>
            <ListItem>
              You can only look at the list twice throughout the game.
            </ListItem>
          </UnorderedList>
        </Box>

        <Box w="full" pt={6}>
          <Button
            onClick={goToHome}
            bg="brand.accent1"
            color="white"
            _hover={{ bg: 'brand.accent3' }}
            size="lg"
            w="full"
          >
            Start Game
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Rules; 