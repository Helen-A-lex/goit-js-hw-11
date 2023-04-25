import Notiflix from 'notiflix';
import axios from 'axios';
import refs from './js/refs';

refs.formSearch.addEventListener('submit', onFormSearch);
refs.btnLoadMore.addEventListener('click', onBtnLoadMoreClick);
function onFormSearch(e) {
  e.preventDefault();
  const searchQuery = e.currentTarget.elements.searchQuery.value;
  console.log(searchQuery);
  getPictures();
}
function onBtnLoadMoreClick() {}
async function getPictures() {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '35754029-ae2c95690085c71643cf1e4c6';
  const option = {
    method: 'GET',
    headers: {
      Authorization: `${API_KEY}`,
    },
  };
  const response = await axios.get(
    `${BASE_URL}?q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`,
    option
  );

  console.log(response);
  const pictures = await response.json();
  return pictures;
}
