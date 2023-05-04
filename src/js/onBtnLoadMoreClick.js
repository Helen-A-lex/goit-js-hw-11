import { getPictures } from './getPictures';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { renderPictureCard } from './renderPictureCard';
let searchQuery = '';
let page = 1;
const perPage = 40;

export function onBtnLoadMoreClick() {
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
