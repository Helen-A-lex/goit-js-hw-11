import { renderPictureCard } from './renderPictureCard';
import { getPictures } from './getPictures';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './refs';
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

let allPicturesLoaded = false;
let totalHits = 0;

export function onLoad(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && perPage < totalHits) {
      page += 1;
      getPictures(searchQuery, page, perPage)
        .then(data => {
          renderPictureCard(data.hits);
          SimpleLightbox.refresh();
          perPage += data.hits.length;
          if (perPage >= totalHits) {
            allPicturesLoaded = true;
            refs.btnLoadMore.hidden = true;
          }
        })
        .catch(error => console.log(error));
    }
  });
}
