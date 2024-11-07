import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Moviedetails() {
  const [getMovieDetail, setMovieDetail] = useState({});
  const [genres, setGenres] = useState([]);
  const [castDetails, setCastDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const location = useLocation();
  const movieInfo = location.state;

  async function getMovieFunction() {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieInfo}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`);
    setMovieDetail(response.data);
    if (response.data.genres) {
      setGenres(response.data.genres);
    }
  }

  async function getCastDetail() {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieInfo}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`);
    setCastDetails(response.data.cast);
  }

  useEffect(() => {
    getMovieFunction();
    getCastDetail();
  }, []);
  const indexOfLastCast = currentPage * itemsPerPage;
  const indexOfFirstCast = indexOfLastCast - itemsPerPage;
  const currentCast = castDetails.slice(indexOfFirstCast, indexOfLastCast);
  const totalPages = Math.ceil(castDetails.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row items-center gap-8 p-8">
        <div className="flex flex-col gap-4 max-w-md">
          <img
            src={`https://image.tmdb.org/t/p/w500/${getMovieDetail.poster_path}`}
            alt="Movie poster"
            className="h-[250px] w-[180px] rounded-lg object-cover mx-auto md:mx-0"
          />
          <h1 className="text-3xl font-bold text-center md:text-left">{getMovieDetail.title}</h1>
          <div className="flex items-center gap-4 justify-center md:justify-start text-gray-300 text-sm">
            <span className="rounded-md bg-gray-800 px-2 py-1">{getMovieDetail.vote_average}</span>
            <span>{getMovieDetail.runtime} min</span>
            {genres.map((ele) => (
              <span key={ele.id}>{ele.name}</span>
            ))}
          </div>
          <div className="text-gray-400 text-center md:text-left">
            Release Date: {getMovieDetail.release_date}
          </div>
          <div className="text-gray-300 text-center md:text-left">
            {getMovieDetail.overview}
          </div>
        </div>
        <div
          className="w-full md:w-1/2 h-[300px] md:h-[450px] rounded-lg bg-cover bg-center shadow-lg"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${getMovieDetail.backdrop_path})`,
          }}
        />
      </div>
      <div className="px-8 py-6">
        <h2 className="mb-6 text-2xl font-bold text-left">Cast</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 transition-all duration-300">
          {currentCast.map((i) => (
            <div key={i.id} className="flex flex-col gap-2">
              <div className="aspect-[2/3] overflow-hidden rounded-lg">
                <img
                  src={i.profile_path ? `https://image.tmdb.org/t/p/w500/${i.profile_path}` : ""}
                  alt={i.original_name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-sm text-center">
                <div className="font-semibold">{i.original_name}</div>
                <div className="text-gray-400">{i.character}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="mr-2 px-4 py-2 bg-gray-800 rounded transition-all duration-300 hover:bg-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="ml-2 px-4 py-2 bg-gray-800 rounded transition-all duration-300 hover:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
