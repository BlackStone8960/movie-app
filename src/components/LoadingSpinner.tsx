import { Center, Spinner } from "@chakra-ui/react";
import { headerHeight } from "../constants/length";

const LoadingSpinner = () => {
  return (
    <Center h="100vh" mt={`-${headerHeight}`}>
      <Spinner color="fontWhite" size="xl" speed="1s" />
    </Center>
  );
};

export default LoadingSpinner;
