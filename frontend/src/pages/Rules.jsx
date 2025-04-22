import React from 'react';
import PropTypes from 'prop-types';
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
  VisuallyHidden,
} from '@chakra-ui/react';

const Rules = () => {
  const navigate = useNavigate();

  return (
    <Container maxW="container.md" py={10} role="main" aria-label="Game Rules">
      <VStack spacing={8} bg="white" p={8} borderRadius="xl" boxShadow="lg" align="start">
        <Heading as="h1" color="brand.accent2">Celebrity Guessing Game Rules</Heading>
        
        <Box as="section" aria-label="Game Rules">
          <OrderedList spacing={4} role="list">
            <ListItem>
              <Text fontWeight="bold" as="h2">Secret Selection:</Text>
              <Text>Each player secretly chooses a celebrity name without telling anyone.</Text>
            </ListItem>
            
            <ListItem>
              <Text fontWeight="bold" as="h2">Taking Turns:</Text>
              <Text>Players take turns guessing which celebrity name belongs to which player.</Text>
              <Text>On your turn, you make one guess at a time.</Text>
              <Text fontStyle="italic" aria-label="Example: I think Sarah chose Brad Pitt">
                Example: "I think Sarah chose Brad Pitt."
              </Text>
            </ListItem>
            
            <ListItem>
              <Text fontWeight="bold" as="h2">Correct Guesses:</Text>
              <UnorderedList>
                <ListItem>The correctly guessed player joins your team</ListItem>
                <ListItem>You get to continue guessing until you make a wrong guess</ListItem>
              </UnorderedList>
            </ListItem>
            
            <ListItem>
              <Text fontWeight="bold" as="h2">Winning Strategy:</Text>
              <Text>The goal is to avoid being guessed while correctly guessing others.</Text>
              <UnorderedList>
                <ListItem>Choose a celebrity that others wouldn't easily associate with you</ListItem>
                <ListItem>The last player/team remaining wins</ListItem>
              </UnorderedList>
            </ListItem>
            
            <ListItem>
              <Text fontWeight="bold" as="h2">Game End:</Text>
              <Text>The game ends when all but one player/team have not been guessed.</Text>
            </ListItem>
          </OrderedList>
        </Box>

        <Text 
          fontWeight="bold" 
          fontStyle="italic" 
          color="brand.accent2"
          role="note"
          aria-label="Important reminder"
        >
          Remember, pick challenging celebrities that aren't obvious matches to your personality or interests!
        </Text>

        <Box as="section" aria-label="How to Play Instructions" w="full">
          <Heading as="h2" color="brand.accent2" size="lg" pt={4}>
            How to play the game
          </Heading>
          
          <UnorderedList spacing={4} role="list">
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

        <Button
          onClick={() => navigate('/')}
          bg="brand.accent1"
          color="white"
          _hover={{ bg: 'brand.accent3' }}
          size="lg"
          w="full"
          mt={4}
          aria-label="Return to game home page"
        >
          Start Game
        </Button>
      </VStack>
    </Container>
  );
};

Rules.propTypes = {
  onStartGame: PropTypes.func,
};

Rules.defaultProps = {
  onStartGame: () => {},
};

export default Rules; 