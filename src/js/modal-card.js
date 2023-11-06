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

  const modalCard = modal.querySelector('.modal-card');

  createModalCard(divClicked).then(renderBar => {
    return (modalCard.innerHTML = renderBar);
  });
}

export const createModalCard = divClicked => {
  return fetchPageBar(1, `movie/${divClicked}`, '').then(response => {
    const renderBar = `
    <ul class="modal-card__list">
      <li class="modal-poster"><img src="https://image.tmdb.org/t/p/w300${response.poster_path}" alt="${response.title}" class="modal-card__img"></li>
      <li class="modal-data">
      <ul>
        <li><h2 class="modal-card__title">${response.title}</h2></li>
        <li class="info-list-wrap"> 
        <ul class="info-list">
        <li>
          <div class="data">Votes / Vote</div>
          <div class="value">
            <span class="votes">${response.vote_average}</span> / <span class="vote">${response.vote_count}</span>
          </div>
        </li>
        <li>
          <div class="data">Popularity</div>
          <div class="value">${response.popularity}</div>
        </li>
        <li>
          <div class="data">Original Title</div>
          <div class="value">${response.original_title}</div>
        </li>
        <li>
          <div class="data">Genre</div>
          <div class="value">text</div>
        </li>
      </ul>
        </li>
        <li class="about">About</li>
        <li class="sinopsis">${response.overview}</li>
        <ul class="buttons">
        <li><button class="button add">ADD TO WATCHED</button></li>
        <li><button class="button queue">ADD TO QUEUE</button></li>
        </ul>
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
