    const reviewForm = document.getElementById('reviewForm');
    const nameInput = document.getElementById('nameInput');
    const passwordInput = document.getElementById('passwordInput');
    const reviewInput = document.getElementById('reviewInput');
    const reviews = document.getElementById('reviews');

    console.log(reviewForm);
    console.log(nameInput);
    console.log(passwordInput);
    console.log(reviewInput);
    console.log(reviews);

    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();

   // 사용자 입력 가져오기
  const reviewerName = nameInput.value;
  const password = passwordInput.value;
  const review = reviewInput.value;


  // 리뷰 생성 지향님 코드 참고 예정
  const reviewElement = document.createElement('div');
  reviewElement.innerHTML = `<p>${review}</p><p>작성자: ${reviewerName}</p><p>비밀번호: ${password}</p>`;
  reviews.appendChild(reviewElement);

  //입력 필드 초기화
  nameInput.value = '';
  passwordInput.value = '';
  review.value = '';
});
