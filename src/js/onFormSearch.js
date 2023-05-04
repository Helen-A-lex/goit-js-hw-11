import refs from './refs';
import Notiflix from 'notiflix';
import { getPictures } from './getPictures';
import { renderPictureCard } from './renderPictureCard';
import { onLoad } from './onLoad';
let searchQuery = '';
let page = 1;
const perPage = 40;
let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};
let observer = new IntersectionObserver(onLoad, options);

export function onFormSearch(e) {
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
      totalHits = data.totalHits;
      if (totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderPictureCard(data.hits);
        observer.observe(refs.target);
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      refs.formSearch.reset();
    });
}
