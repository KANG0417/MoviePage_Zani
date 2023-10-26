const reviewForm = document.getElementById("reviewForm");
const reviewInput = document.getElementById("reviewInput");
const reviews = document.getElementById("reviews");
const passwordInput = document.getElementById("passwordInput");
const nameInput = document.getElementById("nameInput");
const nameResult = document.getElementById("nameResult");

reviewForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!validate()) return;
  if (!filterText()) return;

  // 사용자 입력 가져오기
  const reviewerName = nameInput.value;
  const password = passwordInput.value;
  const review = reviewInput.value;

  // 리뷰 생성 지향님 코드 참고 예정
  const reviewElement = document.createElement("div");
  reviewElement.innerHTML = `<p>${review}</p><p>작성자: ${reviewerName}</p><p>비밀번호: ${password}</p>`;
  reviews.appendChild(reviewElement);
});

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

// 2. 비밀번호(숫자갯수) 유효성 검사
const passwordResult = document.getElementById("passwordResult");
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
  const nameInput = document.getElementById("nameInput");
  const regName = /^[가-힣]{2,5}$/;
  if (!regName.test(nameInput.value)) {
    alert("작성자 형식이 올바르지 않습니다.");
    return false;
  }
  const passwordInput = document.getElementById("passwordInput");
  const regPassword = /^[0-9]{4}$/;
  if (!regPassword.test(passwordInput.value)) {
    alert("비밀번호 형식이 올바르지 않습니다.");
    return false;
  }
  return true;
}

// 비속어 필터링 함수
function filterText() {
  const inputText = document.getElementById("reviewInput").value;

  // 비속어
  const badWords = ["바보", "멍청이", "ㅅㅂ"];

  // 내용란 비속어 유효성 검사
  for (const word of badWords) {
    const regex = new RegExp(word, "gi");
    if (regex.test(inputText)) {
      alert("비속어가 감지되었습니다!");
      return;
    }
  }

  // 작성자란 비속어 유효성 검사
  const nameInput = document.getElementById("nameInput");
  const nameText = nameInput.value;

  for (const word of badWords) {
    const regex = new RegExp(word, "gi");
    if (regex.test(nameText)) {
      alert("작성자란에 비속어가 감지되었습니다!");
      return;
    }
  }

  document.getElementById("filteredText").textContent = inputText;
}
