import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { headerHeight, horizontalMargin } from "../constants/length";
import { useAppDispatch } from "../redux/hooks";
import { fetchContents, setSearchTitle } from "../redux/slices/contents";
import { setPage } from "../redux/slices/page";

const Header = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log("Come from Header Component");
    console.log({ HeaderTitle: title });
    if (title) dispatch(fetchContents({ s: title }));
    dispatch(setSearchTitle(title));
    dispatch(setPage(1));
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
          <Text fontFamily="Bebas Neue" fontSize="24px" color="vanflixRed">
            VANFLIX
          </Text>
        </Box>
        <InputGroup w="500px">
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Search by title"
            _placeholder={{ color: "fontWhite" }}
          />
          {title && (
            <InputRightElement>
              <CloseIcon cursor="pointer" onClick={() => setTitle("")} />
            </InputRightElement>
          )}
        </InputGroup>
      </HStack>
    </Box>
  );
};

export default Header;
