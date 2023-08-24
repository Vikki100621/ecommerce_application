import userEvent from '@testing-library/user-event';
import { fireEvent, waitFor } from '@testing-library/dom';
import App from '../src/components/app';

describe('App', () => {
  let app: App;

  beforeEach(() => {
    document.body.innerHTML = '';
    app = new App();
  });

  it('should create header', () => {
    const header = document.querySelector('#header');
    expect(header).not.toBeNull();
  });

  it('should create main', () => {
    const main = document.querySelector('#main');
    expect(main).not.toBeNull();
  });

  it('should create footer', () => {
    const footer = document.querySelector('#footer');
    expect(footer).not.toBeNull();
  });

  it('should show home page', () => {
    app.showHomePage();
    const welcomeSection = document.querySelector('.welcome__section');
    expect(welcomeSection).not.toBeNull();
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach((menuItem) => {
      fireEvent.click(menuItem);

      const sectionBlock = document.querySelector('.section');
      expect(sectionBlock).not.toBeNull();
    });
  });
});

describe('Registration class', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div id="main">
    <section class="registration">
      <h2 class="registration__title">Registration</h2>
      <form class="registration__form reg-form">
        <fieldset class="reg-form__user fieldset">
          <legend class="fieldset__legend">User</legend>
          <label class="reg-form__label" for="email">E-mail</label>
          <input class="reg-form__input" type="email" name="email" id="email">
          <p class="error"></p>
          <label class="reg-form__label" for="pass">Password</label>
          <input class="reg-form__input" type="password" name="pass" id="pass">
          <p class="error"></p>
        </fieldset>
        <fieldset class="reg-form__person fieldset">
          <legend class="fieldset__legend">Person</legend>
          <label class="reg-form__label" for="fname">First name</label>
          <input type="text" name="fname" id="fname">
          <p class="error"></p>
          <label class="reg-form__label" for="lname">Last name</label>
          <input type="text" name="lname" id="lname">
          <p class="error"></p>
          <label class="reg-form__label" for="bdate">Birthday</label>
          <input type="date" name="bdate" id="bdate">
          <p class="error"></p>
        </fieldset>
        <div class="reg-form__address-wrap">
        <fieldset id="address-0" class="reg-form__address fieldset">
        <legend class="fieldset__legend">Address</legend>
            <label class="reg-form__label" for="street-0">Street</label>
            <input type="text" name="street" id="street-0">
            <p class="error"></p>
            <label class="reg-form__label" for="city-0">City</label>
            <input type="text" name="city" id="city-0">
            <p class="error"></p>
            <label class="reg-form__label" for="pcode-0">Postal code</label>
            <input type="text" name="pcode" id="pcode-0">
            <p class="error"></p>
            <label class="reg-form__label" for="country-0">Country</label>
            <input type="text" name="country" id="country-0" value="US" disabled>
            <p class="error"></p>
            <div class="check-box">
            <label class="reg-form__label" for="baddress-0}">Billing Address</label>
            <input type="checkbox" name="baddress" id="baddress-0">
            <p class="error"></p>
            <label class="reg-form__label" for="saddress-0">Shipping Address</label>
            <input type="checkbox" name="saddress" id="saddress-0">
            <p class="error"></p>
            <label class="reg-form__label" id="defualt" for="dbaddress-0">Default Billing Address</label>
            <input type="checkbox" name="dbaddress" id="dbaddress-0">
            <p class="error"></p>
            <label class="reg-form__label" id="defualt" for="dsaddress-0">Default Shipping Address</label>
            <input type="checkbox" name="dsaddress" id="dsaddress-0}">
            <p class="error"></p>
        </fieldset>
        </div>
        <input class="reg-form__addAddrr" type="button" value="Add address">
        <input id="submit" type="submit" value="Submit">
        <p class="error"></p>
      </form>
      <a href="#/login" class="button-link">I already have a login</a>
    </section>
    </div>
    `;
  });

  const form = document.querySelector('.registration__form ');

  it('checkForm form inputs', async () => {
    if (form) {
      await waitFor(() => {
        expect(form).toBeTruthy();
      });
      const submitButton = form.querySelector('#submit') as HTMLInputElement;
      expect(submitButton).toBeTruthy();

      const emailInput = form.querySelector('#email') as HTMLInputElement;
      expect(emailInput).toBeTruthy();
      const passInput = form.querySelector('#pass') as HTMLInputElement;
      expect(passInput).toBeTruthy();
      const fnameInput = form.querySelector('#fname') as HTMLInputElement;
      expect(fnameInput).toBeTruthy();
      const lnameInput = form.querySelector('#lname') as HTMLInputElement;
      expect(lnameInput).toBeTruthy();
      const bdateInput = form.querySelector('#bdate') as HTMLInputElement;
      expect(bdateInput).toBeTruthy();
      const street = form.querySelector('#street-0') as HTMLInputElement;
      expect(street).toBeTruthy();
      const city = form.querySelector('#city-0') as HTMLInputElement;
      expect(city).toBeTruthy();
      const postcode = form.querySelector('#pcode-0') as HTMLInputElement;
      expect(postcode).toBeTruthy();
      const country = form.querySelector('#country-0') as HTMLInputElement;
      expect(country).toBeTruthy();

      userEvent.type(emailInput, 'test@riu.com');
      userEvent.type(passInput, 'Passw0rdfjf333jnnf');
      userEvent.type(fnameInput, 'John');
      userEvent.type(lnameInput, 'Doe');
      userEvent.type(bdateInput, '2000-01-01');
      userEvent.type(street, 'Billys');
      userEvent.type(city, 'New-York');
      userEvent.type(postcode, '12345');

      
      expect(emailInput.value).toBe('test@riu.com');
      expect(passInput.value).toBe('Passw0rdfjf333jnnf');
      expect(fnameInput.value).toBe('John');
      expect(lnameInput.value).toBe('Doe');
      expect(bdateInput.value).toBe('2000-01-01');
      expect(street.value).toBe('Billys');
      expect(city.value).toBe('New-York');
      expect(postcode.value).toBe('12345');

      userEvent.click(submitButton);

      const errorElements = form.querySelectorAll('.error_active');
      expect(errorElements.length).toBe(0);
    }
  });
});
