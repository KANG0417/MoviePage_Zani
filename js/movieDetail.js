// 1. 쿼리스트링을 불러온다
const URLSearch = new URLSearchParams(document.location.search);

// 2. 쿼리스트링에서 무비아이디값을 가져온다 (변수에 담는다)
const byKey = "movieId";
const movieId = URLSearch.get(byKey);

const API_KEY = "6058bbe97cc057987d5101e107d2daa2";
const detailUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR&page=1`;

// 3. 변수에 담은 무비아이디 값으로 fetch 를 해온다
const fetchMovies = () => {
  fetch(detailUrl)
    .then((response) => response.json())
    .then((data) => {
      // 객체 형태 데이터를 구조분해할당 시켜줘서 변수에 담아주기
      const { title, overview, runtime, vote_average, poster_path } = data;

      // 4. fetch를 해온 데이터를 document에 렌더링해준다
      const movieDetiles = `
            <div class='infor'>
                <img src='https://image.tmdb.org/t/p/w500${poster_path}'>
                <div class='movieTitle'>${title}</div>
                <div class='movieOverview'>${overview}</div>
                <div class='RunVote'>
                    <div class='movieVote'><p>평점</p>${Math.ceil(vote_average * 10) / 10}</div>
                    <div class='movieRuntime'><p>러닝타임</p>${runtime}</div>
                </div>
            </div>
            `;

      const movieContainer = document.getElementById("movie-container");
      movieContainer.innerHTML = movieDetiles;
    })
    .catch((err) => console.error(err));
};

fetchMovies();

export const movieData = async () => {
  const response = await fetch(detailUrl);
  const { title, id } = await response.json();
  return { title, id };
};
