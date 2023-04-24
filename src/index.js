import Notiflix from 'notiflix';
import refs from './js/refs';
refs.formSearch.addEventListener('submit', onFormSearch);
function onFormSearch(e) {
  e.preventDefault();
}
