import { Center, Text } from "@chakra-ui/react";
import { headerHeight } from "../constants/length";
import { ErrorMsgProps } from "../types/components/ErrorMsg";

const ErrorMsg = ({ text }: ErrorMsgProps) => {
  return (
    <Center h={`calc(100vh - ${headerHeight})`}>
      <Text fontSize="32px">{text}</Text>
    </Center>
  );
};

export default ErrorMsg;
