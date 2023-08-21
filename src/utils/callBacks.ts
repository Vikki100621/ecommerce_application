export default function togglePassword() {
  const passwordInput = document.getElementById('password');
  const showButton = document.querySelector('.closePassword');

  if (passwordInput instanceof HTMLInputElement && showButton) {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      showButton.classList.add('openPassword');
    } else {
      passwordInput.type = 'password';
      showButton.classList.remove('openPassword');
    }
  }
}
