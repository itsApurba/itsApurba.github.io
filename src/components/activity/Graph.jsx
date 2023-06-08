import { Image, Link } from "@chakra-ui/react";
import React from "react";

const Graph = () => {
  return (
    <Link isExternal href='https://github.com/itsApurba'>
      <Image
        w={"xl"}
        // loading='lazy'
        alt='Apurba Adhikary'
        src='https://github-readme-activity-graph.vercel.app/graph?username=itsapurba&bg_color=000000&color=ae9f37&line=578e62&point=137000&area=true&hide_border=true'
      />
    </Link>
  );
};

export default Graph;
