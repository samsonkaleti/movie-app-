import {Component} from 'react'
import { Audio } from 'react-loader-spinner'

import './index.css'

class MovieDetails extends Component {
  state = {
    movieDetail: {},
    isLoading: true,
  }

  componentDidMount = () => {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {imdbID} = params
    const apiKey = '6067bb2e'

    const response = await fetch(
      `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`,
    )
    const data = await response.json()

    // console.log(data)
    this.setState({movieDetail: data, isLoading: false})
  }

  returnHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Audio type="TailSpin" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderMovieDetails = () => {
    const {movieDetail} = this.state
    const {
      imdbID,
      Poster,
      Title,
      Director,
      Actors,
      imdbRating,
      Language,
      Year,
      Genre,
      Plot,
      Awards,
      Runtime,
      imdbVotes,
    } = movieDetail

    return (
      <>
        <div className="movie-details-container">
          <img src={Poster} alt={imdbID} className="poster-image" />
          <div className="movie-details">
            <h1 className="movie-heading">
              Movie Name: <span className="title">{Title}</span>
            </h1>
            <p className="director-name">
              Director: <span className="title">{Director}</span>
            </p>
            <p className="director-name">
              Cast: <span className="title">{Actors}</span>
            </p>
            <p className="director-name">
              ImdbRating: <span className="title">{imdbRating}</span>
            </p>
            <p className="director-name">
              Language: <span className="title">{Language}</span>
            </p>
            <p className="director-name">
              Duration: <span className="title">{Runtime}</span>
            </p>
            <p className="director-name">
              Year: <span className="title">{Year}</span>
            </p>
            <p className="director-name">
              Genre: <span className="title">{Genre}</span>
            </p>
          </div>
        </div>
        <div className="bottom-details">
          <div className="bottom">
            <h1 className="bottom-heading">Plot</h1>
            <p className="description">{Plot}</p>
          </div>
          <div className="bottom">
            <h1 className="bottom-heading">Awards</h1>
            <p className="description">{Awards}</p>
          </div>
          <div className="bottom">
            <h1 className="bottom-heading">imdbVotes</h1>
            <p className="description">{imdbVotes}</p>
          </div>
        </div>
        <button type="button" className="back-button" onClick={this.returnHome}>
          Back to Home
        </button>
      </>
    )
  }

  render() {
    const {movieDetail, isLoading} = this.state
    console.log(movieDetail)
    return (
      <div className="container">
        {isLoading ? this.renderLoadingView() : this.renderMovieDetails()}
      </div>
    )
  }
}

export default MovieDetails
