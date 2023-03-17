import {Router, Route} from 'react-router-dom'
import SearchBar from './searchBar'
import MovieDetails from './movieDetails'
import './App.css'

const App = () => (
  <Router>
    <Route exact path="/" component={SearchBar} />
    <Route exact path="/movie/:imdbID" component={MovieDetails} />
  </Router>
)

export default App
