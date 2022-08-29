import { Box } from "@chakra-ui/react";
import ContentsListing from "./ContentsListing";
import Header from "./Header";

const App = () => {
  return (
    <Box bgColor="bgBlack" color="fontWhite" minH="100vh">
      <Header />
      <ContentsListing />
    </Box>
  );
};

export default App;
