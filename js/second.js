// 1. 쿼리스트링을 불러온다
const URLSearch = new URLSearchParams(document.location.search);

// 2. 쿼리스트링에서 무비아이디값을 가져온다 (변수에 담는다)
const byKey = "movieId";
const movieId = URLSearch.get(byKey);

const API_KEY = "6058bbe97cc057987d5101e107d2daa2";
const detailUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR&page=1`;

// 3. 변수에 담은 무비아이디 값으로 fetch 를 해온다
function fetchMovies() {
  fetch(detailUrl)
    .then((response) => response.json())
    .then((data) => {
      const title = data.title;
      const id = data.id;
      const overview = data.overview;
      const release_date = data.release_date;
      const runtime = data.runtime;
      const vote_average = data.vote_average;
      const poster_path = data.poster_path;
      console.log(data);
      console.log(title);
      console.log(id);
      console.log(overview);
      console.log(release_date);
      console.log(runtime);
      console.log(vote_average);
      console.log(poster_path);

      // 4. fetch를 해온 데이터를 document에 그려준다
      const movieDetiles = `
            <div class='infor'>
                <img src='https://image.tmdb.org/t/p/w500${poster_path}'>
                <div class='movieTitle'>${title}</div>
                <div class='movieOverview'>${overview}</div>
                <div class='RunVote'>
                    <div class='movieVote'><p>평점</p>${vote_average}</div>
                    <div class='movieRuntime'><p>러닝타임</p>${runtime}</div>
                </div>
            </div>
            `;

      const movieContainer = document.getElementById("movie-container");
      movieContainer.innerHTML = movieDetiles;
    })
    .catch((err) => console.error(err));
}

fetchMovies(movieId);

// function result(a, b) {
//     a + b
// }
// const movieInfo = document.getElementById('movie-info');
// const titleElement = document.getElementById('title');
// const releaseDateElement = document.getElementById('release-date');
// const voteAverageElement = document.getElementById('vote-average');

// titleElement.textContent = data.title;
// releaseDateElement.textContent = data.release_date;
// voteAverageElement.textContent = data.vote_average;

// .catch (err => console.error(err));

// 1. 상세 페이지 html 파일을 만든다
// 2. alert id 값을 가져온다 (a태그(혹은 location객체를 사용해서)와 쿼리파라미터를 이용해서)
// 3. 가져온 id 값으로 api 호출을 하여 상세 페이지에 해당 내요을 띄워준다
