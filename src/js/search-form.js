import debounce from 'lodash.debounce';
import { getSearchedMovies, getGenres } from './fetch';
import { refreshRendering } from './refreshrendering';
import { moviesContainer } from './cards-home';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 3000;
export let searchInput;

const form = document.querySelector('#search-form');
const input = document.querySelector('#search-form input');
