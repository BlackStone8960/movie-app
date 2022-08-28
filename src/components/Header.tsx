import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { headerHeight, horizontalMargin } from "../constants/length";
import { useAppDispatch } from "../redux/hooks";
import { fetchMovies } from "../redux/movieSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (title) dispatch(fetchMovies({ s: title }));
  }, [title]);

  return (
    <Box
      h={headerHeight}
      p={`4px ${horizontalMargin}`}
      position="fixed"
      top="0"
      left="0"
      right="0"
      bgColor="bgBlack"
    >
      <HStack h="100%">
        <Box mr="30vw">
          <Text fontFamily="Bebas Neue" fontSize="24px">
            VANFLIX
          </Text>
        </Box>
        <InputGroup w="500px">
          <Input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Search by title"
            _placeholder={{ color: "fontWhite" }}
          />
          <InputRightElement>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
      </HStack>
    </Box>
  );
};

export default Header;
