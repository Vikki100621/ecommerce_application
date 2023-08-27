export default class View {
  main: HTMLElement;

  constructor() {
    this.main = <HTMLElement>document.getElementById('main');
  }

  // addAddress() {
  //   const addressWrap: HTMLDivElement = <HTMLDivElement>this.main.querySelector('.reg-form__address-wrap');
  //   const addressNum = this.main.querySelectorAll('.reg-form__address').length;
  //   const newAddress = returnElement({
  //     tag: 'fieldset',
  //     id: `address-${addressNum}`,
  //     classes: ['reg-form__address', 'fieldset'],
  //   });
  //   newAddress.innerHTML = `
  //   <legend class="fieldset__legend">Address</legend>
  //         <label class="reg-form__label" for="street-${addressNum}">Street</label>
  //         <input type="text" name="street" id="street-${addressNum}">
  //         <p class="error"></p>
  //         <label class="reg-form__label" for="city-${addressNum}">City</label>
  //         <input type="text" name="city" id="city-${addressNum}">
  //         <p class="error"></p>
  //         <label class="reg-form__label" for="pcode-${addressNum}">Postal code</label>
  //         <input type="text" name="pcode" id="pcode-${addressNum}">
  //         <p class="error"></p>
  //         <label class="reg-form__label" for="country-${addressNum}">Country</label>
  //         <input type="text" name="country" id="country-${addressNum}" value="US" disabled>
  //         <p class="error"></p>
  //         <div class="check-box">
  //         <label class="reg-form__label" for="baddress-${addressNum}">Billing Address</label>
  //         <input type="checkbox" name="baddress" id="baddress-${addressNum}">
  //         <p class="error"></p>
  //         <label class="reg-form__label" for="saddress-${addressNum}">Shipping Address</label>
  //         <input type="checkbox" name="saddress" id="saddress-${addressNum}">
  //         <p class="error"></p>
  //         <label class="reg-form__label" id="defualt" for="dbaddress-${addressNum}">Default Billing Address</label>
  //         <input type="checkbox" name="dbaddress" id="dbaddress-${addressNum}">
  //         <p class="error"></p>
  //         <label class="reg-form__label" id="defualt" for="dsaddress-${addressNum}">Default Shipping Address</label>
  //         <input type="checkbox" name="dsaddress" id="dsaddress-${addressNum}">
  //         <p class="error"></p>`;
  //   addressWrap.appendChild(newAddress);
  // }
}
