import { Center, Text } from "@chakra-ui/react";
import { headerHeight } from "../constants/length";

const ErrorMsg = ({ text }: { text: string }) => {
  return (
    <Center h={`calc(100vh - ${headerHeight})`}>
      <Text fontSize="24px">{text}</Text>
    </Center>
  );
};

export default ErrorMsg;
