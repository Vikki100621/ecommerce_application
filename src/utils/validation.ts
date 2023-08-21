export function validateEmail() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  if (emailInput instanceof HTMLInputElement && emailError) {
    if (!regex.test(emailInput.value)) {
      emailInput.classList.add('invalid');
      emailError.innerHTML = 'Email address must be properly formatted (e.g., user@example.com.';
    } else {
      emailInput.classList.remove('invalid');
      emailError.innerHTML = '';
    }
  }
}

export function validatePassword() {
  const template = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*\s).{8,}$/;
  const passwordInput = document.getElementById('password');
  const passwordError = document.getElementById('passwordError');
  if (passwordInput instanceof HTMLInputElement && passwordError) {
    if (!template.test(passwordInput.value)) {
      passwordInput.classList.add('invalid');
      passwordError.innerHTML = 'Password must contain at least 8 characters, at least one uppercase letter (A-Z) and one lowercase letter (a-z), one digit (0-9) and must not contain leading or trailing whitespace.';
    } else {
      passwordInput.classList.remove('invalid');
      passwordError.innerHTML = '';
    }
  }
}
