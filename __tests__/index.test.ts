
import Registration from '../src/components/registration';

describe('Registration class', () => {
  let registration: Registration;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="main"></div>
    `;
    registration = new Registration();
    registration.draw();
    registration.addAddressListener();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('checkForm method should validate form inputs', () => {
    const form = registration.returnRegistrationForm();


    expect(form).toBeTruthy();
    const submitButton = form.querySelector('#submit') as HTMLInputElement;
    expect(submitButton).toBeTruthy();


    const emailInput = form.querySelector('#email') as HTMLInputElement;
    expect(emailInput).toBeTruthy();
    const passInput = form.querySelector('#pass') as HTMLInputElement;
    expect(passInput).toBeTruthy();
    const fnameInput = form.querySelector('#fname') as HTMLInputElement;
    expect(fnameInput).toBeTruthy();;
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
  });

  it('createUser method should successfully create a user', async () => {
    const form = registration.returnRegistrationForm();

    const emailInput = form.querySelector('#email') as HTMLInputElement;
    emailInput.value = 'test@example.com';
    const passInput = form.querySelector('#pass') as HTMLInputElement;
    passInput.value = 'Passw0rdfjf333jnnf';
    const fnameInput = form.querySelector('#fname') as HTMLInputElement;
    fnameInput.value = 'John';
    const lnameInput = form.querySelector('#lname') as HTMLInputElement;
    lnameInput.value = 'Doe';
    const bdateInput = form.querySelector('#bdate') as HTMLInputElement;
    bdateInput.value = '2000-01-01';
    const street = form.querySelector('#street-0') as HTMLInputElement;
    street.value = 'Billys'
    const city = form.querySelector('#city-0') as HTMLInputElement;
    city.value = 'New-York'
    const postcode = form.querySelector('#pcode-0') as HTMLInputElement;
    postcode.value = '12345'

    const submitButton = form.querySelector('#submit') as HTMLInputElement;
    const submitEvent = new Event('submit');
    submitButton.dispatchEvent(submitEvent);

  
  });
});