const reviewForm = document.getElementById("reviewForm");
const reviewInput = document.getElementById("reviewInput");
const reviews = document.getElementById("reviews");

const nameInput = document.getElementById("nameInput");
const passwordInput = document.getElementById("passwordInput");
const nameResult = document.getElementById("nameResult");

// 현재 시간을 만드는 함수
// ex) 23.05.20 13:24:55
const getDate = () => {
  let today = new Date();

  let year = String(today.getFullYear()); // 년도
  let month = String(today.getMonth() + 1).padStart(2, "0"); // 월
  let date = String(today.getDate()).padStart(2, "0"); // 일
  const hours = String(today.getHours()).padStart(2, "0"); // 시
  const minutes = String(today.getMinutes()).padStart(2, "0"); // 분
  const seconds = String(today.getSeconds()).padStart(2, "0"); // 초
  return `${year}.${month}.${date} ${hours}:${minutes}:${seconds}`;
};

const getReviewData = () => {
  // 로컬스토리지에 담은 객체 가져오기
  const userArr = JSON.parse(localStorage.getItem("user"));

  // 조회 데이터 초기화
  reviews.innerHTML = "";

  // 배열안에 값이 없다면 리턴
  if (null == userArr) {
    return false;
  }

  for (let i = 0; i < userArr.length; i++) {
    // 리뷰 생성
    let reviewHTML = `
    <p>작성자: ${userArr[i].userName}</p>
    <p>날짜: ${userArr[i].date}</p>
    <p>${userArr[i].content}</p>
    `;

    reviews.innerHTML += reviewHTML;
  }
};

getReviewData();

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
