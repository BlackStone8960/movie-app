import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { headerHeight, horizontalMargin } from "../constants/length";
import { useAppSelector } from "../redux/hooks";

const MovieListing = () => {
  const { movie } = useAppSelector((state) => state);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  const onOpenDetails = (movie: any) => {
    setSelectedMovie(movie);
    onOpen();
  };

  return (
    <>
      <Box p={`${headerHeight} ${horizontalMargin}`}>
        {movie?.contents?.Search?.length ? (
          <Flex align="center" justify="left" flexWrap="wrap">
            {movie.contents.Search.map((m) => (
              <VStack key={m?.imdbID} w="150px" h="325px" m="5px">
                <Image
                  src={
                    m.Poster !== "N/A" && m?.Poster
                      ? m.Poster
                      : `${process.env.PUBLIC_URL}/noImageFound.png`
                  }
                  w="150px"
                  h="225px"
                  objectFit="cover"
                />
                <Text
                  fontSize="14px"
                  h="42px"
                  overflow="hidden"
                >{`${m?.Title} (${m?.Year})`}</Text>
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
        ) : (
          <Center h={`calc(100vh - ${headerHeight})`}>
            <Text fontSize="24px">
              No Movies Found. Input some search terms.
            </Text>
          </Center>
        )}
      </Box>
      {selectedMovie && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader maxW="850px">
              <Image
                src={selectedMovie.Poster}
                w="150px"
                h="225px"
                objectFit="cover"
              />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody maxW="850px">
              <Text>{`${selectedMovie.Title} (${selectedMovie.Year})`}</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default MovieListing;
