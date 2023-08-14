export function togglePassword() {
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

export function validateEmail() {
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  if (emailInput instanceof HTMLInputElement && emailError) {
    const emailValue = emailInput.value;
    const emailExample = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === '') {
      emailInput.classList.add('invalid');
      emailError.innerHTML = 'Пожалуйста, введите email.';
    } else if (!emailExample.test(emailValue)) {
      emailInput.classList.add('invalid');
      emailError.innerHTML = 'Пожалуйста, введите правильный email.';
    } else {
      emailInput.classList.remove('invalid');
      emailError.innerHTML = '';
    }
  }
}

export function validatePassword() {
  const passwordInput = document.getElementById('password');
  const passwordError = document.getElementById('passwordError');
  if (passwordInput instanceof HTMLInputElement && passwordError) {
    const passwordlValue = passwordInput.value;
    const emailExample = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]{8,}$/;
    if (passwordlValue === '') {
      passwordInput.classList.add('invalid');
      passwordError.innerHTML = 'Пожалуйста, введите password.';
    } else if (!emailExample.test(passwordlValue)) {
      passwordInput.classList.add('invalid');
      passwordError.innerHTML = 'Пожалуйста, введите правильный password.';
    } else {
      passwordInput.classList.remove('invalid');
      passwordError.innerHTML = '';
    }
  }
}
