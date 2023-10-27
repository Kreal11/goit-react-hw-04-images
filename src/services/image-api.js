import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/';
const key = '39794314-b7170df023ca4db44fdda06f6';

export const fetchImages = async params => {
  const { data } = await axios.get('api/', {
    params: {
      ...params,
      key,
    },
  });
  return data;
};
