import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { CONTENTS_PER_PAGE, TITLE_LIMIT } from "../constants/contents";
import { headerHeight, horizontalMargin } from "../constants/length";
import { useAppSelector } from "../redux/hooks";
import { isNullOrUndefined } from "../utils/lodashExtensions";
import ErrorMsg from "./ErrorMsg";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./Pagination";

const MovieListing = () => {
  const {
    contents,
    page: { current: currentPage },
  } = useAppSelector((state) => state);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedContent, setSelectedContent] = useState<any>(null);

  const omitString = (str?: string) => {
    let result = "";
    if (str)
      result = str.length > TITLE_LIMIT ? str.slice(0, TITLE_LIMIT) + "…" : str;
    return result;
  };

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

  const onOpenDetails = (content: any) => {
    setSelectedContent(content);
    onOpen();
  };

  const verifyPoster = (content: any): string =>
    content.Poster !== "N/A" && content?.Poster
      ? content.Poster
      : `${process.env.PUBLIC_URL}/noImageFound.png`;

  // If the number is three or more digits, separate them with commas.
  const oneThousandSeparator = (num: string | number): string => {
    let result = "";
    if (!isNullOrUndefined(num)) result = Number(num).toLocaleString();
    return result;
  };

  return (
    <>
      <Box p={`calc(${headerHeight} + 16px) ${horizontalMargin} 32px`}>
        {contents?.searchTitle === "" ? (
          <ErrorMsg text="Enter some words in the search box!" />
        ) : contents?.status === "loading" ? (
          <LoadingSpinner />
        ) : contents?.status === "idle" && contents?.result?.Search?.length ? (
          <Box>
            <Text mb="24px">
              {`Page ${oneThousandSeparator(currentPage)} of 
              ${oneThousandSeparator(contents?.result?.totalResults)} 
              result${contents?.result?.totalResults > 1 && "s"}`}
            </Text>
            <Flex align="flex-start" justify="left" flexWrap="wrap" mb="24px">
              {contents.result.Search.map((m: any) => (
                <VStack key={m?.imdbID} w="150px" h="325px" m="5px">
                  <Image
                    src={verifyPoster(m)}
                    w="150px"
                    h="225px"
                    objectFit="cover"
                  />
                  <Text
                    fontSize="14px"
                    h="42px"
                    overflow="hidden"
                    mb="16px"
                  >{`${omitString(m?.Title)} (${m?.Year})`}</Text>
                  <Button
                    onClick={() => onOpenDetails(m)}
                    color="bgBlack"
                    size="sm"
                  >
                    Detail
                  </Button>
                </VStack>
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
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay bg="blackAlpha.700" />
          <ModalContent
            maxW="850px"
            p="20px"
            bgColor="modalBgBlack"
            color="fontWhite"
          >
            <ModalCloseButton />
            <ModalBody>
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
                    <Text>Type: {selectedContent.Type}</Text>
                    <Text>ID: {selectedContent.imdbID}</Text>
                  </VStack>
                </Box>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default MovieListing;
