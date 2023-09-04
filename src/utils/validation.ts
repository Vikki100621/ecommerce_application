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
      passwordError.innerHTML =
        'Password must contain at least 8 characters, at least one uppercase letter (A-Z) and one lowercase letter (a-z), one digit (0-9) and must not contain leading or trailing whitespace.';
    } else {
      passwordInput.classList.remove('invalid');
      passwordError.innerHTML = '';
    }
  }
}

export function checkFirstName () {
  const template = /[a-z]/
  const currentInput = document.getElementById('userFirstName')
  const currentError = document.getElementById('userFirstNameError')
  if (currentInput instanceof HTMLInputElement && currentError) {
    const saveButton = currentInput.closest('.profile__container')!.querySelector('.saveButton');
    console.log('saveButton: ', saveButton);

    if (saveButton) {
    if (!template.test(currentInput.value) || !currentInput.value.length) {
      currentInput.classList.add('invalid');
      currentError.innerHTML = 'First name must contain at least one character and no special characters or numbers.'
        saveButton.setAttribute('disabled', 'true')
        console.log("ERRRRRRRRRRRRRRRRRROFTT")
    }
    else {
      currentInput.classList.remove('invalid');
      currentError.innerHTML = '';
      saveButton.removeAttribute('disabled')
    }
    }
  }
}

export function checkLastName () {
  const template = /[a-z]/
  const currentInput = document.getElementById('userLastName')
  const currentError = document.getElementById('userLastNameError')
  if (currentInput instanceof HTMLInputElement && currentError) {
    if (!template.test(currentInput.value) || !currentInput.value.length) {
      currentInput.classList.add('invalid');
      currentError.innerHTML = 'Last name must contain at least one character and no special characters or numbers.'
    }
    else {
      currentInput.classList.remove('invalid');
      currentError.innerHTML = '';
    }
  }
}

export function checkAge(): void {
  const currentInput = document.getElementById('dateOfBirth')
  const currentError = document.getElementById('userDateOfBirthError')
  if (currentInput instanceof HTMLInputElement && currentError) {
    const currentParseValue = Date.parse(currentInput.value);
    const nowDate = new Date();
  const minBDate = Date.parse(`${nowDate.getFullYear() - 13}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`);
  if (minBDate - currentParseValue < 0 || !currentParseValue) {
    currentInput.classList.add('invalid');
    currentError.innerHTML = 'You have not reached the minimum age to use the site.'
  } else {
    currentInput.classList.remove('invalid');
    currentError.innerHTML = '';
  }
  }

}

export function checkEmail() {
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
