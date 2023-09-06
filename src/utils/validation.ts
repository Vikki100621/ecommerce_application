function checkErrors(error: HTMLElement, button: Element) {
  let counter = 0;
  if (!error.innerText) counter += 1;
  if (!counter) {
    button.setAttribute('disabled', 'true');
  } else {
    button.removeAttribute('disabled');
  }
}

// Работает
export function validateEmail(event: Event) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const input = event.target as HTMLInputElement;
  const error = document.getElementById('emailError') || document.getElementById('userEmailError');

  if (input && error) {
    if (!regex.test(input.value)) {
      input.classList.add('invalid');
      error.innerHTML = 'Email address must be properly formatted (e.g., user@example.com.';
    } else {
      input.classList.remove('invalid');
      error.innerHTML = '';
    }
  }
}

// Работает
export function validatePassword() {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*\s).{8,}$/;
  const input = document.getElementById('password');
  const error = document.getElementById('passwordError');
  if (input instanceof HTMLInputElement && error) {
    const saveButton = document.querySelector(`password__saveButton`);
    if (saveButton) {
      
    if (!regex.test(input.value)) {
      input.classList.add('invalid');
      error.innerHTML =
        'Password must contain at least 8 characters, at least one uppercase letter (A-Z) and one lowercase letter (a-z), one digit (0-9) and must not contain leading or trailing whitespace.';
    } else {
      input.classList.remove('invalid');
      error.innerHTML = '';
    }
    checkErrors(error, saveButton);
    }
  }
}

export function checkUserPassword(event: Event) {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*\s).{8,}$/;
  const input = event.target as HTMLInputElement
  const error = document.getElementById('passwordError');
  if (input && error) {
    if (!regex.test(input.value)) {
      input.classList.add('invalid');
      error.innerHTML =
        'Password must contain at least 8 characters, at least one uppercase letter (A-Z) and one lowercase letter (a-z), one digit (0-9) and must not contain leading or trailing whitespace.';
    } else {
      input.classList.remove('invalid');
      error.innerHTML = '';
    }
  }
}

// Работает
export function checkFirstName() {
  const regex = /[a-z]/i;
  const input = document.getElementById('userFirstName');

  const error = document.getElementById('userFirstNameError');

  if (input instanceof HTMLInputElement && error) {
    const saveButton = input.closest('.profile__container')!.querySelector(`[data-saveid = "profile"]`);

    if (saveButton) {
      if (!(regex.test(input.value) || input.value.length)) {
        input.classList.add('invalid');
        error.innerHTML = 'First name must contain at least one character and no special characters or numbers.';
      } else {
        input.classList.remove('invalid');
        error.innerHTML = '';
      }
      checkErrors(error, saveButton);
    }
  }
}

// Работает
export function checkLastName() {
  const regex = /[a-z]/i;
  const input = document.getElementById('userLastName');
  const error = document.getElementById('userLastNameError');
  if (input instanceof HTMLInputElement && error) {
    const saveButton = input.closest('.profile__container')!.querySelector(`[data-saveid = "profile"]`);

    if (saveButton) {
      if (!(regex.test(input.value) || input.value.length)) {
        input.classList.add('invalid');
        error.innerHTML = 'Last name must contain at least one character and no special characters or numbers.';
      } else {
        input.classList.remove('invalid');
        error.innerHTML = '';
      }
      checkErrors(error, saveButton);
    }
  }
}

// Работает
export function checkAge(): void {
  const input = document.getElementById('userDate');
  const error = document.getElementById('userDateOfBirthError');
  if (input instanceof HTMLInputElement && error) {
    const currentParseValue = Date.parse(input.value);
    const nowDate = new Date();
    const minBDate = Date.parse(`${nowDate.getFullYear() - 13}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`);
    const saveButton = input.closest('.profile__container')!.querySelector(`[data-saveid = "profile"]`);

    if (saveButton) {
      if (minBDate - currentParseValue < 0 || !currentParseValue) {
        input.classList.add('invalid');
        error.innerHTML = 'You have not reached the minimum age to use the site.';
      } else {
        input.classList.remove('invalid');
        error.innerHTML = '';
      }
      checkErrors(error, saveButton);
    }
  }
}

// Работает
export function checkEmail(event: Event) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const input = event.target as HTMLElement;
  const error = document.getElementById('emailError') || document.getElementById('userEmailError');

  if (input instanceof HTMLInputElement && error) {
    const saveButton = input.closest('.profile__container')!.querySelector(`[data-saveid = "profile"]`);

    if (saveButton) {
      if (!regex.test(input.value)) {
        input.classList.add('invalid');
        error.innerHTML = 'Email address must be properly formatted (e.g., user@example.com.';
      } else {
        input.classList.remove('invalid');
        error.innerHTML = '';
      }
      checkErrors(error, saveButton);
    }
  }
}

export function checkStreet(event: Event) {
  const regex = /[^a-zA-Z0-9-]/i;
  const input = event.target as HTMLElement;

  const infoWrapper = input.closest('.addresses__infoWrapper') as HTMLElement;
  const { currwrapper } = infoWrapper!.dataset;

  const saveButton = document.querySelector(`[data-saveid = "${currwrapper}"]`);

  const error = document.getElementById(`streetErr-${currwrapper}`);

  if (saveButton) {
    if (input instanceof HTMLInputElement && error) {
      if (!(regex.test(input.value) || input.value.length)) {
        input.classList.add('invalid');
        error.innerHTML = 'Street field must contain at least one character';
      } else {
        input.classList.remove('invalid');
        error.innerHTML = '';
      }
      checkErrors(error, saveButton);
    }
  }
}

export function checkCity(event: Event) {
  const regex = /[a-z]/i;
  const input = event.target as HTMLElement;

  const infoWrapper = input.closest('.addresses__infoWrapper') as HTMLElement;
  const { currwrapper } = infoWrapper!.dataset;

  const saveButton = document.querySelector(`[data-saveid = "${currwrapper}"]`);

  const error = document.getElementById(`cityErr-${currwrapper}`);

  if (saveButton) {
    if (input instanceof HTMLInputElement && error) {
      if (!(regex.test(input.value) || input.value.length)) {
        input.classList.add('invalid');
        error.innerHTML = 'City field must contain at least one character and no special characters or numbers.';
      } else {
        input.classList.remove('invalid');
        error.innerHTML = '';
      }
      checkErrors(error, saveButton);
    }
  }
}

export function checkPostalCode(event: Event) {
  const regex = /[0-9]/i;
  const input = event.target as HTMLElement;

  const infoWrapper = input.closest('.addresses__infoWrapper') as HTMLElement;
  const { currwrapper } = infoWrapper!.dataset;

  const saveButton = document.querySelector(`[data-saveid = "${currwrapper}"]`);

  const error = document.getElementById(`postalErr-${currwrapper}`);

  if (saveButton) {
    if (input instanceof HTMLInputElement && error) {
      if (input.value.length < 5 || !regex.test(input.value)) {
        input.classList.add('invalid');
        error.innerHTML = 'Postal code field must follow the format for the country (e.g., 12345 for the U.S.).';
      } else {
        input.classList.remove('invalid');
        error.innerHTML = '';
      }
      checkErrors(error, saveButton);
    }
  }
}

export function checkCountry(event: Event) {
  const input = event.target as HTMLElement;

  const infoWrapper = input.closest('.addresses__infoWrapper') as HTMLElement;
  const { currwrapper } = infoWrapper!.dataset;

  const saveButton = document.querySelector(`[data-saveid = "${currwrapper}"]`);

  const error = document.getElementById(`countryErr-${currwrapper}`);

  if (saveButton) {
    if (input instanceof HTMLInputElement && error) {
      if (input.value !== 'US') {
        input.classList.add('invalid');
        error.innerHTML = 'Sorry we only work in the US territory';
      } else {
        input.classList.remove('invalid');
        error.innerHTML = '';
      }
      checkErrors(error, saveButton);
    }
  }
}
