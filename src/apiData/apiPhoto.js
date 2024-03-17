import axios from 'axios';

const ACCESS_KEY = '1vMNbvwqnPoXlOmKrRPKI0MvekqTfwqhrZ0t4Aal_0Y';

axios.defaults.baseURL = 'https://api.unsplash.com/';
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getPhotos = async (query, page) => {
  const { data } = await axios.get(
    `search/photos/?client_id=${ACCESS_KEY}&query=${query}&page=${page}`
  );

  return data;
};
