reviewForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // 유효성검사 함수
  if (!validate()) return;

  // 사용자 입력 가져오기
  const reviewerName = nameInput.value;
  const reviewPassword = passwordInput.value;
  const review = reviewInput.value;

  // 객체에 저장할 데이터 담아주기
  let reviewData = {
    userName: reviewerName,
    password: reviewPassword,
    content: review,
    date: getDate(),
  };

  // 전에 데이터 불러오고 배열에 저장
  let prevData = JSON.parse(localStorage.getItem("user"));

  // 조회한 값이 없다면(null) 배열로 만들어주기
  if (prevData === null) {
    prevData = [];
  }

  prevData.push(reviewData);

  // 로컬스토리지에 데이터 저장시키기
  localStorage.setItem("user", JSON.stringify(prevData));

  // // 로컬스토리지에 담은 데이터 조회
  getReviewData();

  //입력 필드 초기화
  nameInput.value = "";
  passwordInput.value = "";
  reviewInput.value = "";

  // 이름 유효성검사 메세지 초기화
  nameResult.innerHTML = "";
});
