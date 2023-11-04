'use strict';
'id';
import axios from 'axios';
import { API_KEY, BASE_URL } from './fetch';
import { searchInput } from './search-form';
import { renderMovies } from './search-form';

///////////////////

import { fetchPageBar } from './fetch.js';

const pagesBar = document.querySelector('.pages');
const loaderModal = document.querySelector('.loader-modal');

const requestFetch = page => {
  fetchPageBar(page)
    .then(ok => {
      console.log('Response async function: OK', ok);
    })
    .catch(error => console.log(error))
    .finally(() => {
      console.log('Finally');
      loaderModal.classList.toggle('is-hidden');
    });
};

function pagesHtmlBar(beginValue = 1, endValue = 5) {
  const beginRange = parseInt(beginValue, 10);
  const endRange = parseInt(endValue, 10);

  const initialRangeArray = [];

  for (let i = beginRange; i <= endRange; i += 1) {
    if (i === endRange) {
      initialRangeArray.push(
        `<li data-id="${i}" class="pages__item"><a href="javascript:void(0)">${i}</a></li><li data-id="${
          i + 1
        }" class="pages__item pages__item--movement" name="next">
        <a href="javascript:void(0)">></a></li>`
      );
    } else if (beginRange > 1 && i === beginRange) {
      initialRangeArray.push(
        `<li data-id="${
          i - 1
        }" class="pages__item pages__item--movement" name="previous"><a href="javascript:void(0)"><</a></li><li data-id="${i}" class="pages__item"><a href="javascript:void(0)">${i}</a></li>`
      );
    } else {
      initialRangeArray.push(
        `<li data-id="${i}" class="pages__item"><a href="javascript:void(0)">${i}</a></li>`
      );
    }
  }

  const renderBar = initialRangeArray.join('');
  return (pagesBar.innerHTML = renderBar);
}

function clearActivePage(array, classToRemove) {
  const newArray = [...array];
  newArray.map(element => element.classList.remove(classToRemove));
}

window.addEventListener('load', () => {
  pagesHtmlBar(1, 5);
  document
    .querySelector(`[data-id="${1}"]`)
    .classList.toggle('pages__item--active');
});

pagesBar.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    loaderModal.classList.toggle('is-hidden');

    const allActiveSelectPage = document.querySelectorAll(
      '.pages__item--active'
    );
    const pageId = parseInt(e.target.parentElement.getAttribute('data-id'), 10);
    const tagName = e.target.parentElement.getAttribute('name');

    clearActivePage(allActiveSelectPage, 'pages__item--active');

    if (tagName === 'next') {
      pagesHtmlBar(pageId - 4, pageId);
      document
        .querySelector(`[data-id="${pageId}"]`)
        .classList.toggle('pages__item--active');
    } else if (tagName === 'previous') {
      pagesHtmlBar(pageId, pageId + 4);
      document
        .querySelector(`[data-id="${pageId}"]`)
        .classList.toggle('pages__item--active');
    } else {
      const fatherElement = e.target.parentElement;
      fatherElement.classList.toggle('pages__item--active');
    }

    requestFetch(pageId);
  }
});
