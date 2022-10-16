import { Avatar } from "@chakra-ui/avatar";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Flex, HStack, Link } from "@chakra-ui/layout";
import React from "react";
import Navlinks from "./Navlinks";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { IconButton } from "@chakra-ui/button";

const links = [
  { name: "About Me", path: "#about" },
  { name: "Skills", path: "#skills" },
  { name: "Projects", path: "#projects" },
  { name: "Contact Me", path: "#contact" },
];

const HeaderNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box pos={"sticky"} px={4} boxShadow={"lg"}>
      <Flex
        h={"14"}
        align={"center"}
        justify={"center"}
        w={["90%", "85%", "80%"]}
        maxW={900}
        mx='auto'
      >
        <IconButton
          size={"md"}
          icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          aria-label={"Open Menu"}
          display={["inherit", "inherit", "none"]}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} align={"center"}>
          <Box>
            <Avatar
              as={Link}
              size={"sm"}
              href={"#projects"}
              //   src={UserIcon}
              src={"https://avatars2.githubusercontent.com/u/37842853?v=4"}
            />
          </Box>

          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {links.map((item, index) => (
              <Navlinks key={index} name={item.name} path={item.path} />
            ))}
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default HeaderNav;
