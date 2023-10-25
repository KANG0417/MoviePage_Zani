const reviewForm = document.getElementById("reviewForm");
const reviewInput = document.getElementById("reviewInput");
const reviews = document.getElementById("reviews");

reviewForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!validate()) return;

  // 사용자 입력 가져오기
  const reviewerName = nameInput.value;
  const password = passwordInput.value;
  const review = reviewInput.value;

  // 리뷰 생성 지향님 코드 참고 예정
  const reviewElement = document.createElement("div");
  reviewElement.innerHTML = `<p>${review}</p><p>작성자: ${reviewerName}</p><p>비밀번호: ${password}</p>`;
  reviews.appendChild(reviewElement);

  //입력 필드 초기화
  nameInput.value = "";
  passwordInput.value = "";
  review.value = "";
});

// 유효성 검사
// 1. 작성자(한글갯수) 유효성 검사
const nameInput = document.getElementById("nameInput");
const nameResult = document.getElementById("nameResult");
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

// 2. 작성자(한글) 유효성 검사
const passwordInput = document.getElementById("passwordInput");
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

// 3. 비밀번호(숫자갯수) 유효성 검사
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
