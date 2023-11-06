import '../sass/components/_cards-home.scss';
import { getInitialMovies, getGenres, getMovieDetails, API_KEY } from './fetch';

// export const moviesContainer = document.querySelector('.cards-container');
// export const preloader = document.getElementById('preloader');

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.querySelector('.search-form__button');
  const searchInput = document.querySelector('.search-form__input');
  const movieGrid = document.querySelector('.movie-grid');
  const searchResults = document.querySelector('.search-results');

  const apiKey = API_KEY;

  function getMovies(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayMovies(data.results))
      .catch((error) => console.error('Error:', error));
  }

  function displayMovies(movies) {
    searchResults.innerHTML = ''; // Limpiar los resultados de búsqueda
    movieGrid.innerHTML = ''; // Limpiar las películas populares

    movies.forEach((movie) => {
      // Obtener detalles adicionales de la película
      fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`)
        .then((response) => response.json())
        .then((movieDetails) => {
          const movieCard = document.createElement('div');
          movieCard.classList.add('movie-card');
          movieCard.innerHTML = `
            <img src="${
              'https://image.tmdb.org/t/p/w500/' + movie.poster_path
            }" alt="${movie.title}">
            <h3 class="movie-title">${movie.title.toUpperCase()}</h3>
            <p class="movie-genre">Genre: ${movieDetails.genres
              .map((genre) => genre.name)
              .join(', ')}</p> 
            <p class="movie-year">Year: ${
              movieDetails.release_date
                ? movieDetails.release_date.substring(3, 4)
                : 'N/A'
            }</p>
          `;
          searchResults.appendChild(movieCard);
        })
        .catch((error) => console.error('Error fetching movie details:', error));
    });
  }

  function searchMovies() {
    const searchTerm = searchInput.value;
    if (searchTerm) {
      getMovies(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
      );
    } else {
      getMovies(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
      );
    }
  }

  searchButton.addEventListener('click', (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe
    searchMovies();
  });

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evitar que el formulario se envíe
      searchMovies();
    }
  });

  // Cargar las películas populares al cargar la página
  getMovies(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
});
