import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export default axios.create({
  baseURL: 'http://www.omdbapi.com/',
});
