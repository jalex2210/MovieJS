import '../sass/components/_cards-home.scss';
import { fetchPageBar } from './fetch';
import { hideModal } from './modal-card';

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const movieGrid = document.querySelector('.movie-grid');

export function getMovies(
  currentPage = 1,
  route = 'trending/movie/day',
  searchTerm = ''
) {
  fetchPageBar(currentPage, route, searchTerm)
    .then(data => displayMovies(data.results))
    .catch(error => console.error('Error:', error));
}

function displayMovies(movies) {
  movieGrid.innerHTML = '';
  movies.forEach(movie => {
    fetchPageBar(1, `movie/${movie.id}`, '').then(movieDetails => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');
      movieCard.innerHTML = `
            <img src="${
              'https://image.tmdb.org/t/p/w500/' + movie.poster_path
            }" alt="${movie.title}">
            <h3 class="movie-title">${movie.title.toUpperCase()}</h3>
                       <p class="movie-genre">
                      </p> 
                        <p class="movie-year">${
                          movieDetails.release_date
                            ? movieDetails.release_date.substring(0, 4)
                            : 'N/A'
                        }</p>
         `;
      movieGrid.appendChild(movieCard);
    });
  });
}

function searchMovies() {
  const searchTerm = searchInput.value;
  if (searchTerm) {
    getMovies(1, '/search/movie', searchTerm);
  } else {
    getMovies(1, 'trending/movie/day', '');
  }
}

window.addEventListener('load', () => {
  getMovies(1, 'trending/movie/day', '');
});

searchButton.addEventListener('click', searchMovies);
searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    searchMovies();
  }
});

movieGrid.addEventListener('click', e => {
  if (e.target.tagName !== 'IMG') {
    return;
  }

  hideModal('.modal-container');
  console.log(e);
});
// export const moviesContainer = document.querySelector('.cards-container');
// export const preloader = document.getElementById('preloader');
