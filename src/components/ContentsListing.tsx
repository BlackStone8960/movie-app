import {
  Box,
  Flex,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { CONTENTS_PER_PAGE } from "../constants/contents";
import { headerHeight, horizontalMargin } from "../constants/length";
import { useAppSelector } from "../redux/hooks";
import { verifyPoster } from "../utils/image";
import { isNullOrUndefined } from "../utils/lodashExtensions";
import Content from "./Content";
import DarkModal from "./DarkModal";
import ErrorMsg from "./ErrorMsg";
import Pagination from "./Pagination";
import ProgressIndicator from "./ProgressIndicator";

const ContentsListing = () => {
  const {
    contents,
    page: { current: currentPage },
  } = useAppSelector((state) => state);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedContent, setSelectedContent] = useState<any>(null);

  const renderErrorMsg = (error: any) => {
    let errorMsg = "";

    switch (error) {
      case "Movie not found!":
        errorMsg = "Movie not found, try other words.";
        break;
      case "Too many results.":
        errorMsg = "Too many results. Please search with a detailed term.";
        break;
      default:
        errorMsg = "Something went wrong.";
    }

    return <ErrorMsg text={errorMsg} />;
  };

  const onClickDetail = (content: any) => {
    setSelectedContent(content);
    onOpen();
  };

  // If the number is four or more digits, separate them with commas.
  const oneThousandSeparator = (num: string | number): string => {
    let result = "";
    if (!isNullOrUndefined(num)) result = Number(num).toLocaleString();
    return result;
  };

  const capitaliseFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <>
      <Box p={`calc(${headerHeight} + 16px) ${horizontalMargin} 32px`}>
        {contents?.searchTitle === "" ? (
          <ErrorMsg text="Enter some words in the search box!" />
        ) : contents?.status === "loading" ? (
          <ProgressIndicator />
        ) : contents?.status === "idle" && contents?.result?.Search?.length ? (
          <Box>
            <Text mb="24px">
              {`Page ${oneThousandSeparator(currentPage)} of 
              ${oneThousandSeparator(contents?.result?.totalResults)} 
              result${contents?.result?.totalResults > 1 && "s"}`}
            </Text>
            <Flex align="flex-start" justify="left" flexWrap="wrap" mb="24px">
              {contents.result.Search.map((m: any) => (
                <Content
                  key={m?.imdbID}
                  content={m}
                  onClickDetail={onClickDetail}
                />
              ))}
            </Flex>
            {contents?.result?.totalResults > CONTENTS_PER_PAGE && (
              <Pagination />
            )}
          </Box>
        ) : (
          <>{renderErrorMsg(contents?.result?.Error)}</>
        )}
      </Box>
      {selectedContent && (
        <DarkModal isOpen={isOpen} onClose={onClose}>
          <Flex>
            <Box mr="24px">
              <Image src={verifyPoster(selectedContent)} w="300px" />
            </Box>
            <Box>
              <Text fontWeight="bold" fontSize="24px" mb="24px">
                {selectedContent.Title}
              </Text>
              <VStack align="flex-start">
                <Text>Year: {selectedContent.Year}</Text>
                <Text>Type: {capitaliseFirstLetter(selectedContent.Type)}</Text>
                <Text>ID: {selectedContent.imdbID}</Text>
              </VStack>
            </Box>
          </Flex>
        </DarkModal>
      )}
    </>
  );
};

export default ContentsListing;
