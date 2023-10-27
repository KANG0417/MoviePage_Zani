const card = document.querySelector("#card");
const searchForm = document.querySelector("#search-box");
const searchInput = document.querySelector("#search-box .search-txt");
const homeBtn = document.querySelector("#header h1");

// 이미지를 클릭하면 알림창에 아이디값 뿌려주기
const imgClick = (title, id) => {
  window.location.href = `second.html?movieId=${id}`;
};

// API 가져오기
const API_KEY = "6058bbe97cc057987d5101e107d2daa2";
const topRateUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko&page=1`;

// 영화 조회 함수 생성
const getMovie = (url) => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const movies = data.results;
      movies.forEach((item) => {
        const { title, vote_average, poster_path, id } = item;

        let imgUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
        let cardHtml = `
        <div id="movie-card-wrap">
          <div class="img">
            <img src="${imgUrl}" alt="영화 이미지"
            onclick="imgClick('${title}', ${id})" class="movie-img"></img>
          </div>
          <p class="movie-title">${title}</p>
          <span class="movie-rating">🏆  ${Math.ceil(vote_average * 10) / 10}</span>
        </div>
        `;

        card.insertAdjacentHTML("beforeend", cardHtml);
      });
    })
    .catch((err) => console.error(err));
};

// 전체 목록 조회
getMovie(topRateUrl);

homeBtn.addEventListener("click", (e) => {
  e.preventDefault();

  card.innerHTML = "";
  getMovie(topRateUrl);
});

// 버튼을 클릭하거나 엔터를 치면 검색 기능
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputVal = document.querySelector("#search-box .search-txt").value.toLowerCase();
  const queryUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${inputVal}&include_adult=false&language=ko-KR&page=1`;

  if (inputVal.trim() === "" || inputVal === null) {
    alert("검색어를 입력해주세요!");
    return false;
  }
  if (queryUrl.includes(inputVal)) {
    // 영화 목록 초기화
    card.innerHTML = "";
    // 검색 목록 조회
    getMovie(queryUrl);
  }
});
