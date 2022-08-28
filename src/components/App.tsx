import { Box } from "@chakra-ui/react";
import Header from "./Header";
import MovieListing from "./MovieListing";

const App = () => {
  return (
    <Box bgColor="bgBlack" color="fontWhite" minH="100vh">
      <Header />
      <MovieListing />
    </Box>
  );
};

export default App;
