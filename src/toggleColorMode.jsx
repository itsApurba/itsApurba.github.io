import { IconButton } from "@chakra-ui/button";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Tooltip } from "@chakra-ui/tooltip";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ToggleColorMode = ({ props }) => {
  const colorModeValue = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const { toggleColorMode } = useColorMode();

  const handleClick = () => {
    toggleColorMode();
  };

  //   console.log(colorModeValue, SwitchIcon);
  //   console.log(FaMoon);
  return (
    <div>
      <Tooltip label={colorModeValue === "dark" ? "Dark Mode" : "Light Mode"}>
        <IconButton
          icon={<SwitchIcon />}
          onClick={handleClick}
          aria-label={`Switch to ${colorModeValue} mode`}
          size='md'
          fontSize='md'
          //   variant='ghost'
          //   color='current'
          marginLeft='2'
          _hover={{
            bg: useColorModeValue("gray.200", "gray.900"),
          }}
          {...props}
        />
      </Tooltip>
    </div>
  );
};

export default ToggleColorMode;
