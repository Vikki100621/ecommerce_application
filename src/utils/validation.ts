function validateEmailTemplate(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePasswordLength(password: string) {
  return password.length >= 8;
}

function validatePasswordUpperCase(password: string) {
  const regex = /[A-Z]/;
  return regex.test(password);
}

function validatePasswordLowerCase(password: string) {
  const regex = /[a-z]/;
  return regex.test(password);
}

function validatePasswordDigit(password: string) {
  const regex = /\d/;
  return regex.test(password);
}

function validatePasswordSpecialChar(password: string) {
  const regex = /[!@#$%^&*]/;
  return regex.test(password);
}

function validateNoWhiteSpace(input: string) {
  const regex = /^\S+$/;
  return regex.test(input);
}

export function validateEmail() {
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  if (emailInput instanceof HTMLInputElement && emailError) {
    if (!validateNoWhiteSpace(emailInput.value)) {
      emailInput.classList.add('invalid');
      emailError.innerHTML = 'Email address must not contain leading or trailing whitespace.';
    } else if (!validateEmailTemplate(emailInput!.value)) {
      emailInput.classList.add('invalid');
      emailError.innerHTML = 'Email address must be properly formatted (e.g., user@example.com.';
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
    if (!validatePasswordLength(passwordInput.value)) {
      passwordInput.classList.add('invalid');
      passwordError.innerHTML = 'Password must be at least 8 characters long.';
    } else if (!validatePasswordUpperCase(passwordInput.value)) {
      passwordInput.classList.add('invalid');
      passwordError.innerHTML = 'Password must contain at least one uppercase letter (A-Z).';
    } else if (!validatePasswordLowerCase(passwordInput.value)) {
      passwordInput.classList.add('invalid');
      passwordError.innerHTML = 'Password must contain at least one lowercase letter (a-z).';
    } else if (!validatePasswordDigit(passwordInput.value)) {
      passwordInput.classList.add('invalid');
      passwordError.innerHTML = 'Password must contain at least one digit (0-9).';
    } else if (!validateNoWhiteSpace(passwordInput.value)) {
      passwordInput.classList.add('invalid');
      passwordError.innerHTML = 'Password must not contain leading or trailing whitespace.';
    } else if (!validatePasswordSpecialChar(passwordInput.value)) {
      passwordInput.classList.add('invalid');
      passwordError.innerHTML = 'Password must contain at least one special character (e.g., !@#$%^&*).';
    } else {
      passwordInput.classList.remove('invalid');
      passwordError.innerHTML = '';
    }
  }
}
