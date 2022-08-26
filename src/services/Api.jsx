import axios from 'axios';
const API_KEY = '27044661-5039fd8f86a9259a09df45cad';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const FetchData = async (value, page, perPage) => {
  const response = await axios.get(
    `?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&perPage=${perPage}`
  );

  const responseData = await response.data;
  if (!responseData.total) {
    return Promise.reject(new Error(`There is no image that goes by ${value}`));
  }
  return responseData;
};

export default FetchData;
