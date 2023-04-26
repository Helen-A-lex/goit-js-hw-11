import Notiflix from 'notiflix';
import axios from 'axios';
import refs from './js/refs';
// import { getPictures } from './js/getPictures';

refs.formSearch.addEventListener('submit', onFormSearch);
refs.btnLoadMore.addEventListener('click', onBtnLoadMoreClick);
let searchQuery = '';
function onFormSearch(e) {
  e.preventDefault();
  searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  console.log(searchQuery);
}
async function getPictures(searchQuery, page, perPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '35754029-ae2c95690085c71643cf1e4c6';

  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );

  const pictures = response.data;
  return pictures;
}
function onBtnLoadMoreClick() {}

function createPictureCard() {}
