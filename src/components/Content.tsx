import { Button, Image, Text, VStack } from "@chakra-ui/react";
import { TITLE_LIMIT } from "../constants/contents";
import { ContentProps } from "../types/components/Content";
import { verifyPoster } from "../utils/image";

const Content = ({ content, onClickDetail }: ContentProps) => {
  const omitString = (str?: string) => {
    let result = "";
    if (str)
      result = str.length > TITLE_LIMIT ? str.slice(0, TITLE_LIMIT) + "…" : str;
    return result;
  };

  return (
    <VStack key={content?.imdbID} w="150px" h="325px" m="5px">
      <Image
        src={verifyPoster(content)}
        w="150px"
        h="225px"
        objectFit="cover"
      />
      <Text fontSize="14px" h="42px" overflow="hidden" mb="16px">{`${omitString(
        content?.Title
      )} (${content?.Year})`}</Text>
      <Button onClick={() => onClickDetail(content)} color="bgBlack" size="sm">
        Detail
      </Button>
    </VStack>
  );
};

export default Content;
