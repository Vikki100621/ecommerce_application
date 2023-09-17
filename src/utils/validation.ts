function checkErrors(infoWrapper: HTMLElement, button: Element) {
  const errors = infoWrapper.querySelectorAll('.errorSpan');
  const errorsArr = Array.from(errors) as HTMLElement[];
  const hasText = errorsArr.some((el) => el.textContent !== '');

  if (hasText) {
    button.setAttribute('disabled', 'true');
  } else {
    button.removeAttribute('disabled');
  }
}

export function validateEmail() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const input = document.getElementById('email') || document.getElementById('userEmail');
  const error = document.getElementById('emailError') || document.getElementById('userEmailError');

  if (input instanceof HTMLInputElement && error) {
    const saveButton = document.querySelector('.profile__saveButton');
    if (!regex.test(input.value)) {
      input.classList.add('invalid');
      error.innerHTML = 'Email address must be properly formatted (e.g., user@example.com.';
    } else {
      input.classList.remove('invalid');
      error.innerHTML = '';
    }
    if (saveButton) {
      const infoWrapper = document.querySelector('.profile__infoWrapper') as HTMLElement;
      checkErrors(infoWrapper, saveButton);
    }
  }
}

export function validatePassword(event: Event) {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*\s).{8,}$/;
  const input = event.target as HTMLInputElement;
  const { id } = input;
  const error = document.getElementById(`${id}Error`);
  if (input instanceof HTMLInputElement && error) {
    const saveButton = document.querySelector(`.password__saveButton`);
    if (!regex.test(input.value)) {
      input.classList.add('invalid');
      error.innerHTML =
        'Password must contain at least 8 characters, at least one uppercase letter (A-Z) and one lowercase letter (a-z), one digit (0-9) and must not contain leading or trailing whitespace.';
    } else {
      input.classList.remove('invalid');
      error.innerHTML = '';
    }
    if (saveButton) {
      const infoWrapper = document.querySelector('.password__infoWrapper') as HTMLElement;
      checkErrors(infoWrapper, saveButton);
    }
  }
}

export function checkFirstName() {
  const regex = /[a-z]/i;
  const input = document.getElementById('userFirstName');
  const error = document.getElementById('userFirstNameError');
  const infoWrapper = document.querySelector('.profile__infoWrapper') as HTMLElement;

  if (input instanceof HTMLInputElement && error) {
    const saveButton = document.querySelector('.profile__saveButton');

    if (saveButton) {
      if (!(regex.test(input.value) || input.value.length)) {
        input.classList.add('invalid');
        error.innerHTML = 'First name must contain at least one character and no special characters or numbers.';
      } else {
        input.classList.remove('invalid');
        error.innerHTML = '';
      }
      checkErrors(infoWrapper, saveButton);
    }
  }
}

export function checkLastName() {
  const regex = /[a-z]/i;
  const input = document.getElementById('userLastName');
  const error = document.getElementById('userLastNameError');
  const infoWrapper = document.querySelector('.profile__infoWrapper') as HTMLElement;
  if (input instanceof HTMLInputElement && error) {
    const saveButton = document.querySelector('.profile__saveButton');

    if (saveButton) {
      if (!(regex.test(input.value) || input.value.length)) {
        input.classList.add('invalid');
        error.innerHTML = 'Last name must contain at least one character and no special characters or numbers.';
      } else {
        input.classList.remove('invalid');
        error.innerHTML = '';
      }
      checkErrors(infoWrapper, saveButton);
    }
  }
}

export function checkAge(): void {
  const input = document.getElementById('userDate');
  const error = document.getElementById('userDateOfBirthError');
  const infoWrapper = document.querySelector('.profile__infoWrapper') as HTMLElement;
  if (input instanceof HTMLInputElement && error) {
    const currentParseValue = Date.parse(input.value);
    const nowDate = new Date();
    const minBDate = Date.parse(`${nowDate.getFullYear() - 13}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`);
    const saveButton = document.querySelector('.profile__saveButton');

    if (saveButton) {
      if (minBDate - currentParseValue < 0 || !currentParseValue) {
        input.classList.add('invalid');
        error.innerHTML = 'You have not reached the minimum age to use the site.';
      } else {
        input.classList.remove('invalid');
        error.innerHTML = '';
      }
      checkErrors(infoWrapper, saveButton);
    }
  }
}

export function checkStreet(event: Event) {
  const regex = /^.{1,}$/;
  const currTarget = event.target as HTMLElement;
  const currWrapper = currTarget.closest('.addresses__wrapper') as HTMLElement;
  const { id } = currWrapper;
  const infoWrapper = document.querySelector(`[data-currwrapper = "${id}"]`) as HTMLElement;
  const input = infoWrapper.querySelector('.street') as HTMLInputElement;
  const saveButton = document.querySelector(`[data-saveid = "${id}"]`);
  const error = document.getElementById(`streetErr-${id}`);

  if (saveButton) {
    if (input instanceof HTMLInputElement && error) {
      if (!regex.test(input.value) || input.value.length === 0) {
        input.classList.add('invalid');
        error.innerHTML = 'Street field must contain at least one character';
      } else {
        input.classList.remove('invalid');
        error.innerHTML = '';
      }
      checkErrors(infoWrapper, saveButton);
    }
  }
}

export function checkCity(event: Event) {
  const regex = /[a-z]/i;
  const currTarget = event.target as HTMLElement;
  const currWrapper = currTarget.closest('.addresses__wrapper') as HTMLElement;
  const { id } = currWrapper;
  const infoWrapper = document.querySelector(`[data-currwrapper = "${id}"]`) as HTMLElement;
  const input = infoWrapper.querySelector('.city') as HTMLInputElement;
  const saveButton = document.querySelector(`[data-saveid = "${id}"]`);
  const error = document.getElementById(`cityErr-${id}`);

  if (saveButton) {
    if (input instanceof HTMLInputElement && error) {
      if (!regex.test(input.value) || input.value.length === 0) {
        input.classList.add('invalid');
        error.innerHTML = 'City field must contain at least one character and no special characters or numbers.';
      } else {
        input.classList.remove('invalid');
        error.innerHTML = '';
      }
      checkErrors(infoWrapper, saveButton);
    }
  }
}

export function checkPostalCode(event: Event) {
  const regex = /[0-9]/i;
  const currTarget = event.target as HTMLElement;
  const currWrapper = currTarget.closest('.addresses__wrapper') as HTMLElement;
  const { id } = currWrapper;
  const infoWrapper = document.querySelector(`[data-currwrapper = "${id}"]`) as HTMLElement;
  const input = infoWrapper.querySelector('.postal') as HTMLInputElement;
  const saveButton = document.querySelector(`[data-saveid = "${id}"]`);
  const error = document.getElementById(`postalErr-${id}`);

  if (saveButton) {
    if (input instanceof HTMLInputElement && error) {
      if (input.value.length < 5 || input.value.length > 5 || !regex.test(input.value)) {
        input.classList.add('invalid');
        error.innerHTML = 'Postal code field must follow the format for the country (e.g., 12345 for the U.S.).';
      } else {
        input.classList.remove('invalid');
        error.innerHTML = '';
      }
      checkErrors(infoWrapper, saveButton);
    }
  }
}

export function checkCountry(event: Event) {
  const currTarget = event.target as HTMLElement;
  const currWrapper = currTarget.closest('.addresses__wrapper') as HTMLElement;
  const { id } = currWrapper;
  const infoWrapper = document.querySelector(`[data-currwrapper = "${id}"]`) as HTMLElement;
  const input = infoWrapper.querySelector('.country') as HTMLInputElement;
  const saveButton = document.querySelector(`[data-saveid = "${id}"]`);
  const error = document.getElementById(`countryErr-${id}`);

  if (saveButton) {
    if (input instanceof HTMLInputElement && error) {
      if (input.value !== 'US') {
        input.classList.add('invalid');
        error.innerHTML = 'Sorry we only work in the US territory';
      } else {
        input.classList.remove('invalid');
        error.innerHTML = '';
      }
      checkErrors(infoWrapper, saveButton);
    }
  }
}
