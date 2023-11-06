import '../sass/components/_cards-home.scss';
import { getInitialMovies, getGenres, getMovieDetails, API_KEY } from './fetch';

// export const moviesContainer = document.querySelector('.cards-container');
// export const preloader = document.getElementById('preloader');

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');
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
    movieGrid.innerHTML = '';
    movies.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');
      movieCard.innerHTML = `
           <img src="${
             'https://image.tmdb.org/t/p/w500/' + movie.poster_path
           }" alt="${movie.title}">
           <h3>${movie.title}</h3>
           <p>${movie.overview}</p>
         `;
      movieGrid.appendChild(movieCard);
    });
  }

  function searchMovies(event) {
    event.preventDefault(); // Prevenir el envío del formulario
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

  searchButton.addEventListener('click', searchMovies);
  searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      searchMovies();
    }
  });

  // Cargar las películas populares al cargar la página
  getMovies(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
});
