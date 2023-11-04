import '../sass/components/_cards-home.scss';
import { getInitialMovies, getGenres, getMovieDetails } from './fetch';

export const moviesContainer = document.querySelector('.cards-container');
export const preloader = document.getElementById('preloader');
