
const movies = require('../movies')

const getAllMovies = (request, response) => {
  return response.send(movies)
}

const searchMovieByTitleOrDirector = (request, response) => {
  const { search } = request.params

  const movie = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(search.toLowerCase()) ||
            movie.directors.find((director) => director.toLowerCase().includes(search.toLowerCase()))
  })

  if (!movie.length) return response.sendStatus(404)

  return response.send(movie)
}

const saveNewMovie = (request, response) => {
  const {
    title, directors, releaseDate, rating, runTime, genres
  } = request.body

  if (!title || !directors || !releaseDate || !rating || !runTime || !genres) {
    return response
      .status(400)
      .send('The following parameters are required: title, directors, releaseDate, rating, runTime, genres')
  }

  const newMovie = {
    title, directors, releaseDate, rating, runTime, genres
  }

  movies.push(newMovie)

  return response.status(201).send(newMovie)
}

module.exports = { getAllMovies, searchMovieByTitleOrDirector, saveNewMovie }
