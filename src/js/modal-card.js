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
