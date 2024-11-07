
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import MovieDescription from './MovieDescription'
import AllMovies from './AllMovies'
import MovieNavbar from './MovieNavbar'

function App() {


  return (
    <>
    <BrowserRouter>
    <MovieNavbar/>
    <Routes>
      <Route path="/" element = {<AllMovies/>}/>
      <Route path='/movieDetail' element = {<MovieDescription/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
