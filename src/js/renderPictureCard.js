import refs from './refs';
import { getPictures } from './getPictures';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderPictureCard(pictures) {
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
