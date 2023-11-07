import '../sass/components/_modal-card.scss';
import { moviesContainer } from './cards-home';
// import { watchedMoviesContainer } from './library';
import { saveToWatched } from './localStorage';
import { saveToQue } from './localStorage';
import { movieID, getMovieDetails, fetchPageBar } from './fetch.js';
// import { after } from 'lodash';
//import { merge } from 'lodash';

// const btnClose = modal.querySelector('.btn--close');

export function hideModal(tagToHidden, divClicked) {
  const modal = document.querySelector(tagToHidden);
  modal.classList.toggle('is-hidden');

  const modalContainer = modal.querySelector('.modal-card');
  // console.log(modalContainer);
  console.log(divClicked);
  // createModalCard(divClicked);
}

export const createModalCard = divClicked => {
  return fetchPageBar(1, `movie/${divClicked}`, '').then(response => {
    const renderBar = `
    <ul" class="modal-card__list">
      <li><img src="https://image.tmdb.org/t/p/w300${response.poster_path}" alt="${response.title}" class="modal-card__img"></li>
      <li>
      <ul>
        <li><h2 class="modal-card__title">${response.title}</h2></li>
        <li> 
          <ul >
            <li>Vote / Votes</li>
            <li>${response.vote_average} / ${response.vote_count}</li>
            <li>Popularity</li>
            <li>${response.popularity}</li>
            <li>Original Title</li>
            <li>${response.original_title}</li>
            <li>Genre</li>            
            <li>text</li>
          </ul >
        </li>
        <li>About</li>
        <li>${response.overview}</li>
      </ul >
    </li>
    </ul>
    `;
    return renderBar;
  });
};

//   //Adding EvenListiner to watched and Que buttons
//   //Adding logic for their textContent
//   let watched = [];
//   const watchedData = JSON.parse(localStorage.getItem('watched'));

//   if (watchedData != null) {
//     watched.push(...watchedData);
//   }

//   if (watched.includes(movieID)) {
//     modalBtnAddWatch.textContent = 'REMOVE FROM WATCHED';
//     modalBtnAddQue.textContent = 'ALREADY WATCHED';
//   }

//   modalBtnAddWatch.addEventListener('click', saveToWatched);

//   let que = [];
//   const queData = JSON.parse(localStorage.getItem('que'));

//   if (queData != null) {
//     que.push(...queData);
//   }

//   if (que.includes(movieID)) {
//     modalBtnAddQue.textContent = 'REMOVE FROM QUE';
//   }

//   modalBtnAddQue.addEventListener('click', saveToQue);

// const displayMovieInfo = async e => {
//   const movie_id = e.target.parentElement.getAttribute('id');

//   getMovieDetails(movie_id).then(el => {
//     createModalCard(el);
//     modal.parentElement.classList.toggle('is-hidden');
//   });
// };

// watchedMoviesContainer.addEventListener('click', displayMovieInfo);

// btnClose.addEventListener('click', hideModal);

// window.addEventListener('keydown', event => {
//   if (event.key === 'Escape') {
//     hideModal();
//   }
// });

// modal.parentElement.addEventListener('click', el => {
//   if (el.target.classList.contains('modal-container')) {
//     hideModal();
//   }
// });
