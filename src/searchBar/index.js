import {Component} from 'react'
import {v4} from 'uuid'
import {Loader} from 'react-loader-spinner'
import MovieList from '../movieList'

import './index.css'

class SearchBar extends Component {
  state = {
    movieName: '',
    moviesList: [],
    isLoading: false,
    isFailure: false,
  }

  failureData = () => (
    <div className="failure-container">
      <h1>Results Not Found</h1>
    </div>
  )

  searchMovie = async event => {
    const {movieName} = this.state
    this.setState({isLoading: true})

    event.preventDefault()
    const apiKey = '6067bb2e'

    const apiUrl = `http://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}`

    const response = await fetch(apiUrl)
    // console.log(response)
    if (response.ok === true) {
      const data = await response.json()

      // console.log(data)
      if (data.Response === 'False') {
        this.setState({moviesList: [], isLoading: false, isFailure: true})
      } else {
        const updateMovie = data.Search.map(movie => ({...movie, Id: v4()}))
        this.setState({
          moviesList: updateMovie,
          isLoading: false,
          isFailure: false,
        })
      }
    }
  }

  displayMovie = event => {
    this.setState({movieName: event.target.value})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderMovies = () => {
    const {moviesList} = this.state

    return (
      <ul className="movies-list">
        {moviesList.map(movie => (
          <MovieList key={movie.Id} eachMovie={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {movieName, isLoading, isFailure} = this.state
    // console.log(isLoading)
    return (
      <div className="app-container">
        <div className="movie-container">
          <h1 className="heading">Movie Searching App</h1>
          <form className="search-container" onSubmit={this.searchMovie}>
            <input
              value={movieName}
              type="search"
              className="search"
              placeholder="Enter Movie Name..."
              onChange={this.displayMovie}
            />
            <button type="submit" className="button">
              Search
            </button>
          </form>
          {isLoading && this.renderLoadingView()}
          {this.renderMovies()}
          {isFailure && this.failureData()}
        </div>
      </div>
    )
  }
}

export default SearchBar
