import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { headerHeight, horizontalMargin } from "../constants/length";
import { useAppDispatch } from "../redux/hooks";
import {
  fetchContents,
  setSearchTitle,
  setSearchType,
} from "../redux/slices/contents";
import { setPage } from "../redux/slices/page";

const Header = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [type, setType] = useState<string>("");
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    // Retrieve contents each time the search term is updated.
    if (title && type) dispatch(fetchContents({ s: title, type }));
    else if (title) dispatch(fetchContents({ s: title }));
    dispatch(setSearchTitle(title));
    dispatch(setSearchType(type));
    dispatch(setPage(1));
  }, [title, type]);

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    const regExp = /^[A-Za-z]*$/;
    if (regExp.test(text)) setTitle(text);
  };

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
        {!isMobile && (
          <Box mr="30vw">
            <Text
              fontFamily="'Bebas Neue', cursive"
              fontSize="32px"
              color="vanflixRed"
              letterSpacing="2px"
            >
              VANFLIX
            </Text>
          </Box>
        )}
        <InputGroup w="300px">
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input
            value={title}
            onChange={(event) => onChangeTitle(event)}
            placeholder="Search by title"
            _placeholder={{ color: "fontWhite" }}
          />
          {title && (
            <InputRightElement>
              <CloseIcon cursor="pointer" onClick={() => setTitle("")} />
            </InputRightElement>
          )}
        </InputGroup>
        <Select
          onChange={(e) => setType(e.target.value)}
          placeholder="Select type"
          width="200px"
          defaultValue=""
        >
          <option value="">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </Select>
      </HStack>
    </Box>
  );
};

export default Header;
