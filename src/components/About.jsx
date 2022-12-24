import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  Fade,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  SlideFade,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { HiMail } from "react-icons/hi";
import Container from "./container";
import Emoji from "./Emoji";
import { MdEmail } from "react-icons/md";
const About = () => {
  return (
    <section id='about'>
      <Center h={"full"}>
        <SlideFade in={true}>
          <Flex
            // mt={"16"}
            align={"center"}
            gap={"4"}
            direction={["column", "column", "row"]}
          >
            <Avatar
              size={"2xl"}
              src={"https://avatars.githubusercontent.com/u/25547103"}
            />
            <Container boxShadow={"xl"} p='6' rounded='md'>
              <Heading
                py={4}
                display={"flex"}
                alignItems={"center"}
                size='lg'
                gap={"2"}
              >
                <Emoji />
                <Flex wrap={"wrap"}>
                  <Text
                    bgGradient='linear(to-l, #fc679e, #0669b3)'
                    bgClip='text'
                    fontSize={["lg", "xl", "2xl"]}
                    fontWeight='extrabold'
                  >
                    Hello____
                  </Text>
                  <Text
                    align={"left"}
                    fontSize={["md", "lg", "xl", "2xl"]}
                    fontWeight='bold'
                  >
                    I'm Apurba Adhikary
                  </Text>
                </Flex>
              </Heading>

              <VStack align={"flex-start"}>
                <Text align='left' fontSize={["sm", "md", "lg"]}>
                  Aspiring full stack developer from INDIA 🇮🇳 with a
                  specialization in MERN stack.
                  <br />
                  <br />I like to solve problems and make user-centric products,
                  Looking forward to honing my skills in a challenging work
                  environment.
                </Text>
                <ButtonGroup pt={3} isAttached={true} borderRadius={"md"}>
                  <Link
                    href='https://drive.google.com/uc?export=download&id=1TProYyrD1Vlbmy3GdMzesgicSlmjCQng'
                    target={"_blank"}
                    _hover={{
                      textDecor: "none",
                    }}
                  >
                    <Button
                      bg={"green.300"}
                      transitionDuration='0.5s'
                      _hover={{
                        shadow: "md",
                        textDecoration: "none",
                        transform: "translateY(-5px)",
                        transitionDuration: "0.5s",
                        transitionTimingFunction: "ease-in-out",
                      }}
                    >
                      Resume
                    </Button>
                  </Link>
                  <HStack pl={"4"} gap={2}>
                    <Link
                      href={"https://github.com/itsApurba"}
                      isExternal
                      transitionDuration='0.5s'
                      _hover={{
                        shadow: "md",
                        transform: "translateY(-5px)",
                        transitionDuration: "0.5s",
                        transitionTimingFunction: "ease-in-out",
                      }}
                    >
                      <FaGithub size={"28px"} />
                    </Link>
                    <Link
                      href={"https://in.linkedin.com/in/apurba1212"}
                      isExternal
                      color={"linkedin.900"}
                      transitionDuration='0.5s'
                      _hover={{
                        shadow: "md",
                        transform: "translateY(-5px)",
                        transitionDuration: "0.5s",
                        transitionTimingFunction: "ease-in-out",
                      }}
                    >
                      <FaLinkedin size={"28px"} />
                    </Link>
                    <Link
                      href={"https://api.whatsapp.com/send?phone=919062371141"}
                      isExternal
                      color={"green.500"}
                      transitionDuration='0.5s'
                      _hover={{
                        shadow: "md",
                        transform: "translateY(-5px)",
                        transitionDuration: "0.5s",
                        transitionTimingFunction: "ease-in-out",
                      }}
                    >
                      <IoLogoWhatsapp size={"30px"} />
                    </Link>
                    <Link
                      href={"mailto://its.apurba@outlook.com"}
                      isExternal
                      color={"red.600"}
                      transitionDuration='0.5s'
                      _hover={{
                        shadow: "md",
                        transform: "translateY(-5px)",
                        transitionDuration: "0.5s",
                        transitionTimingFunction: "ease-in-out",
                      }}
                    >
                      <MdEmail size={"34px"} />
                    </Link>
                  </HStack>
                </ButtonGroup>
              </VStack>
            </Container>
          </Flex>
        </SlideFade>
      </Center>
    </section>
  );
};

export default About;
