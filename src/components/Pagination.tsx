import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Center, HStack, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { CONTENTS_PER_PAGE } from "../constants/contents";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchMovies, setPage } from "../redux/movieSlice";
import { isNullOrUndefined } from "../utils/lodashExtensions";

const chevrons = { w: "36px", h: "36px", cursor: "pointer" };

const Pagination = () => {
  const firstRendering = useRef(true);
  const dispatch = useAppDispatch();
  const { movie } = useAppSelector((state) => state);
  const [numOfPages, setNumOfPages] = useState(0);
  const [paginationClicked, setPaginationClicked] = useState(false);

  useEffect(() => {
    // When first rendering, do nothing
    if (firstRendering.current) {
      firstRendering.current = false;
      return;
    }

    if (paginationClicked && movie.page > 0) {
      dispatch(fetchMovies({ s: movie.searchTitle, page: movie.page }));
      console.log("Come from Pagination");
      console.log({ page: movie.page, title: movie.searchTitle });
    }
  }, [movie.page]);

  useEffect(() => {
    if (
      !isNullOrUndefined(movie?.contents) &&
      movie.contents.totalResults !== 0
    ) {
      setNumOfPages(Math.ceil(movie.contents.totalResults / CONTENTS_PER_PAGE));
    }
  }, [movie.contents?.totalResults]);

  const onPaginationClicked = async (i: number) => {
    await setPaginationClicked(true);
    dispatch(setPage(i));
  };

  const createPagination = (numOfPages: number) => {
    const pageIndexComponents = [];
    for (let i = 1; i <= numOfPages; i++) {
      pageIndexComponents.push(
        <Text
          key={i}
          onClick={() => onPaginationClicked(i)}
          fontSize="20px"
          cursor="pointer"
          color={i === movie.page ? "red" : "fontWhite"}
        >
          {i}
        </Text>
      );
    }
    return pageIndexComponents;
  };

  return (
    <>
      {numOfPages !== 0 && (
        <Center p="16px 0">
          <HStack spacing="20px" wrap="wrap" justify="center">
            <ChevronLeftIcon
              onClick={() =>
                movie.page > 1 && onPaginationClicked(movie.page - 1)
              }
              sx={chevrons}
            />
            {createPagination(numOfPages)}
            <ChevronRightIcon
              onClick={() =>
                movie.page < numOfPages && onPaginationClicked(movie.page + 1)
              }
              sx={chevrons}
            />
          </HStack>
        </Center>
      )}
    </>
  );
};

export default Pagination;
