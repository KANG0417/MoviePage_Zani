import { movieData } from "./movieDetail.js";

const reviewForm = document.getElementById("reviewForm");
const reviewInput = document.getElementById("reviewInput");
const reviews = document.getElementById("reviews");
const passwordInput = document.getElementById("passwordInput");
const nameInput = document.getElementById("nameInput");
const nameResult = document.getElementById("nameResult");
const passwordResult = document.getElementById("passwordResult");
const starRating = document.getElementById("starRating");
const reviewCnt = document.querySelector("#reviewBox .reviewCnt");
console.log(reviewCnt);

// 리뷰마다 고유값 생성
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

// 현재 시간을 만드는 함수
// ex) 23.05.20 13:24
const getDate = () => {
  let today = new Date();

  let year = String(today.getFullYear()); // 년도
  let month = String(today.getMonth() + 1).padStart(2, "0"); // 월
  let date = String(today.getDate()).padStart(2, "0"); // 일
  const hours = String(today.getHours()).padStart(2, "0"); // 시
  const minutes = String(today.getMinutes()).padStart(2, "0"); // 분
  return `${year}.${month}.${date} ${hours}:${minutes}`;
};

const getReviewData = async () => {
  // 구조분해할당으로 모듈로 내보낸 객체데이터 가져오기
  const { title: movieTitle } = await movieData();

  // 로컬스토리지에 담은 객체 가져오기
  const userArr = JSON.parse(localStorage.getItem(movieTitle));

  reviews.innerHTML = "";

  // 값이 없다면 조회하지 않는다
  if (userArr === null) {
    return false;
  }

  for (let i = 0; i < userArr.length; i++) {
    // 리뷰 생성
    let reviewHTML = `
    <div id = "reviewText">
    <p class = "reviewName">작성자 : ${userArr[i].userName} </p>
    ${userArr[i].star === "1" ? "<p>⭐</p>" : ""}
    ${userArr[i].star === "2" ? "<p>⭐⭐</p>" : ""}     
    ${userArr[i].star === "3" ? "<p>⭐⭐⭐</p>" : ""}     
    ${userArr[i].star === "4" ? "<p>⭐⭐⭐⭐</p>" : ""}     
    ${userArr[i].star === "5" ? "<p>⭐⭐⭐⭐⭐</p>" : ""}     
    <p class = "reviewContent">${userArr[i].content}</p>
    <p class = "reviewEtc">${userArr[i].date}
    </div>
    `;
    // <button class="reviewDelbtn" value="${userArr[i].uid}">삭제</button></p>

    reviews.innerHTML += reviewHTML;
  }
};

// 리뷰 데이터 조회하는 함수 실행
getReviewData();

reviewForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  // 구조분해할당으로 모듈로 내보낸 객체데이터 가져오기
  const { title: movieTitle, id: movieId } = await movieData();

  // 유효성검사 함수
  if (!validate()) return;
  if (!filterWord()) return;

  // 사용자 입력 가져오기
  const reviewerName = nameInput.value;
  const reviewPassword = passwordInput.value;
  const review = reviewInput.value;
  const star = starRating.value;

  // 배열에 저장할 데이터 담아주기
  let reviewData = {
    userName: reviewerName,
    password: reviewPassword,
    content: review,
    date: getDate(),
    star,
    uid: uuidv4(),
    title: movieTitle,
    movieId: movieId
  };

  // 전에 데이터를 조회하고 전에 데이터가 null이라면 배열에 담아줌
  let prevData = JSON.parse(localStorage.getItem(movieTitle));

  if (prevData === null) {
    prevData = [];
  }

  // 마지막으로 쓴 리뷰가 맨 처음에 추가
  prevData.unshift(reviewData);

  // 객체를 JSON으로 변환하고 로컬스토리지에 저장
  localStorage.setItem(movieTitle, JSON.stringify(prevData));

  // 로컬스토리지에 담은 데이터 조회
  getReviewData();

  // //입력 필드 초기화
  nameInput.value = "";
  passwordInput.value = "";
  reviewInput.value = "";
  // 이름 유효성검사 메세지 초기화
  nameResult.innerHTML = "";
  passwordResult.innerHTML = "";
});

// 유효성 검사
// 1. 작성자(한글갯수) 유효성 검사
nameInput.addEventListener("keyup", function () {
  const regName = /^[가-힣]{2,5}$/;

  if (regName.test(nameInput.value)) {
    nameResult.innerHTML = "✔";
    nameResult.style.color = "lightseagreen";
  } else {
    nameResult.innerHTML = "2~5글자의 한글만 입력하세요.";
    nameResult.style.color = "lightcoral";
  }
});

// 2. 비밀번호(숫자갯수) 유효성 검사
passwordInput.addEventListener("keyup", function () {
  const regPassword = /^[0-9]{4}$/;

  if (regPassword.test(passwordInput.value)) {
    passwordResult.innerHTML = "✔";
    passwordResult.style.color = "lightseagreen";
  } else {
    passwordResult.innerHTML = "4개의 숫자만 입력하세요.";
    passwordResult.style.color = "lightcoral";
  }
});

// 3. 작성자, 비밀번호 최종 유효성 검사
function validate() {
  const regName = /^[가-힣]{2,5}$/;
  if (!regName.test(nameInput.value)) {
    alert("작성자 형식이 올바르지 않습니다.");
    return false;
  }
  const regPassword = /^[0-9]{4}$/;
  if (!regPassword.test(passwordInput.value)) {
    alert("비밀번호 형식이 올바르지 않습니다.");
    return false;
  }
  if (starRating.value === "별점선택") {
    alert("별점을 선택해주세요!");
    return false;
  }
  return true;
}

// 비속어 필터링 함수
function filterWord() {
  const inputText = reviewInput.value;

  // 비속어
  const badWords = ["바보", "멍청이", "ㅅㅂ"];

  // 내용란 비속어 유효성 검사
  for (const word of badWords) {
    const regex = new RegExp(word, "gi");
    if (regex.test(inputText)) {
      alert("비속어가 감지되었습니다!");
      return false;
    }
  }

  // 작성자란 비속어 유효성 검사
  const nameText = nameInput.value;

  for (const word of badWords) {
    const regex = new RegExp(word, "gi");
    if (regex.test(nameText)) {
      alert("작성자란에 비속어가 감지되었습니다!");
      return false;
    }
  }

  return true;
}
