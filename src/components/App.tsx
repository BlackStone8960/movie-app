import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchMovies } from "../redux/movieSlice";

const App = () => {
  const dispatch = useAppDispatch();
  const { movie } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(fetchMovies({ s: "Shinobi:" }));
  }, []);

  useEffect(() => {
    console.log({ movie });
  }, [movie]);

  return (
    <div className="App">
      {movie?.contents?.Search?.length && (
        <div>
          {movie.contents.Search.map((m) => (
            <div key={m?.imdbID}>
              <img src={m?.Poster}></img>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
