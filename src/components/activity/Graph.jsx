import { Image, Link } from "@chakra-ui/react";
import React from "react";

const Graph = () => {
  return (
    <Link isExternal href='https://github.com/itsApurba'>
      <Image
        w={"xl"}
        loading='eager'
        alt='Apurba Adhikary'
        src='https://activity-graph.herokuapp.com/graph?username=itsapurba&bg_color=0D1117&color=79fe96&line=79fe96&point=FFFFFF&hide_border=true'
      />
    </Link>
  );
};

export default Graph;
