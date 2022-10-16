import { Link } from "@chakra-ui/layout";
import React from "react";

const Navlinks = ({ name, path }) => {
  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
      }}
      href={path}
    >
      {name}
    </Link>
  );
};

export default Navlinks;
