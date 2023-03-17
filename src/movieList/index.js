import {Link} from 'react-router-dom'
import './index.css'

const MovieList = props => {
  const {eachMovie} = props
  const {Title, Poster, Id, imdbID} = eachMovie
  // console.log(props)

  return (
    <Link to={`/movie/${imdbID}`} className="link">
      <li className="list">
        <img src={Poster} alt={Id} className="poster-image" />
        <h3 className="movie-name">{Title}</h3>
      </li>
    </Link>
  )
}

export default MovieList
