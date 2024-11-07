

import React, { useState,useEffect } from "react"
import { Search, Menu, X } from "lucide-react"
import axios from "axios"
import { movieCategory } from "./movieSlice";
import Navbar from "./MovieNavbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Movies() {
  let [displayAllMovies,setDisplayAllMovies] = useState([])
  
  let [movieCategory,setMovieCategory] = useState('popular')
  let category= useSelector((state)=>state.movie.category);
  let searchInput = useSelector((state)=>state.movie.searchInput);
  console.log(searchInput)
  let navigate = useNavigate();
async function getMovieData(){
    let response=await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1');
    console.log(response.data.results);
    setDisplayAllMovies(response.data.results)
}

async function getTopRatedData(){
    let response = await axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1");
    console.log(response.data.results)
     setDisplayAllMovies(response.data.results)
}

async function getUpcommingData(){
    let response = await axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1");
    console.log(response.data.results);
     setDisplayAllMovies(response.data.results);
}

async function onMovieSearchHandler(movieName){

    let searchMovieName = movieName.toLowerCase();
    console.log(searchMovieName);
    let response =await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${searchMovieName}&page=1`);
    setDisplayAllMovies(response.data.results)
    console.log(response.data.results);
}




useEffect(()=>{
    if(category=="popular"){
        getMovieData();
    }else if(category=="toprated"){
        getTopRatedData();
    }else if(category=="upcomming"){
        getUpcommingData();
    }else{
        getMovieData();
    }

    if(searchInput){
        onMovieSearchHandler(searchInput);
    }
    
},[category,searchInput]);
function goToMovieDetails(movie){
    navigate('/movieDetail',{state:movie});
}


  return (
    <div className="min-h-screen bg-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayAllMovies.map((movie) => (
            <div key={movie.id} className="relative group" onClick={()=>{goToMovieDetails(movie.id)}}>
              <div className="aspect-[2/3] overflow-hidden rounded-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-white truncate">{movie.title}</h3>
                <p className="text-sm text-gray-400">Rating: {movie.vote_average}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}