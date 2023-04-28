import axios from 'axios';

async function getPictures(searchQuery, page, perPage) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '35754029-ae2c95690085c71643cf1e4c6';

  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );

  const pictures = response.data;
  console.log(pictures);
  return pictures;
}
export { getPictures };
