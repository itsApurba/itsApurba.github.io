import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Flex,
  Heading,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Emoji from "./Emoji";

const About = () => {
  return (
    <section id='about'>
      <Center h={"full"}>
        <Flex
          align={"center"}
          gap={"4"}
          direction={["column", "column", "row"]}
        >
          <Avatar
            size={"2xl"}
            src={"https://avatars.githubusercontent.com/u/25547103"}
          />
          <Container boxShadow={"xl"} p='6' rounded='md'>
            <Box pl={2} py={5}>
              <Heading display={"flex"} as='h2' size='lg'>
                <Emoji />
                _Hey_!
              </Heading>
            </Box>
            <VStack align={"flex-start"}>
              <Container>I am Apurba Adhikary</Container>
              <ButtonGroup pt={3} pl={4} isAttached={true} borderRadius={"md"}>
                <Button bg={"green.300"}>Resume</Button>
              </ButtonGroup>
            </VStack>
          </Container>
        </Flex>
      </Center>
    </section>
  );
};

export default About;
