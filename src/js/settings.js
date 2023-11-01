import axios from 'axios';

const ACCESTOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmVmZjlkMDk3ZWY5OWI4MzY3ZTJkMDY1NzVmMjZiOCIsInN1YiI6IjY1MzlhYjNkMjRmMmNlMDEzOTBmOWU1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MgqO6vuao29-Y8qbjGSQ68L0X7WzB_O9jSrh0BC_P1g';
const BASEURL = 'https://api.themoviedb.org/3/trending/movie/day';

async function fetch(currentPage = 1) {
  const response = await axios.get(BASEURL, {
    headers: {
      Authorization: 'Bearer ' + ACCESTOKEN,
      accept: 'application/json',
    },
    params: {
      language: 'en-US',
      page: currentPage,
    },
  });
  return response.data;
}

export { fetch };
