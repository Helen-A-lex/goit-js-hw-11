import Notiflix from 'notiflix';
import axios from 'axios';
import refs from './js/refs';
import { getPictures } from './js/getPictures';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

refs.formSearch.addEventListener('submit', onFormSearch);
refs.btnLoadMore.addEventListener('click', onBtnLoadMoreClick);

let searchQuery = '';
let page = 1;
const perPage = 40;

// Нескінченний скрол
let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};
let observer = new IntersectionObserver(onLoad, options);
function onLoad(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      getPictures(searchQuery, page, perPage)
        .then(data => {
          renderPictureCard(data.hits);
          SimpleLightbox.refresh();
        })
        .catch(error => console.log(error));
    }
  });
}

function onFormSearch(e) {
  e.preventDefault();
  searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  refs.pictureContainer.innerHTML = '';
  page = 1;

  if (searchQuery === '') {
    Notiflix.Notify.failure(
      'The search string cannot be empty. Please specify your search query.'
    );
    return;
  }
  getPictures(searchQuery, page, perPage)
    .then(data => {
      if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderPictureCard(data.hits);
        observer.observe(refs.target);
        refs.btnLoadMore.hidden = false;
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      refs.formSearch.reset();
    });
}

function renderPictureCard(pictures) {
  const markup = pictures
    .map(
      ({
        id,
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<a class="gallery__link" href="${largeImageURL}"data-lb-group="search-results"> 
      <div class="gallery-wrapper" id="${id}">
           <img class="gallery__img" src="${webformatURL}" alt="${tags}" loading="lazy"  />
            <div class="info">
              <p class="info-item"><b>Likes</b> ${likes}</p>
              <p class="info-item"><b>Views</b> ${views}</p>
              <p class="info-item"><b>Comments</b> ${comments}</p>
              <p class="info-item"><b>Downloads</b> ${downloads}</p>
            </div>
          </div>
          </a>`
    )
    .join('');
  refs.pictureContainer.insertAdjacentHTML('beforeend', markup);
  const simpleLightBox = new SimpleLightbox('.gallery__link');

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function onBtnLoadMoreClick() {
  page += 1;

  getPictures(searchQuery, page, perPage)
    .then(data => {
      renderPictureCard(data.hits);

      const totalPages = Math.ceil(data.totalHits / perPage);

      if (page > totalPages) {
        refs.btnLoadMore.hidden = true;
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
      SimpleLightbox.refresh();
    })

    .catch(error => console.log(error));
}
