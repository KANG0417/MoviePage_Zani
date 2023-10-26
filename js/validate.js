// 2. 작성자,비밀번호 최종 유효성 검사
function validate() {
  const regName = /^[가-힣]{2,5}$/;
  const regPassword = /^[0-9]{4}$/;

  if (!regName.test(nameInput.value)) {
    alert("작성자 형식이 올바르지 않습니다.");
    return false;
  }
  if (!regPassword.test(passwordInput.value)) {
    alert("비밀번호 형식이 올바르지 않습니다.");
    return false;
  }
  if (reviewInput === null || reviewInput.value.trim() === "") {
    alert("내용을 입력해주세요!");
    return false;
  }
  return true;
}
