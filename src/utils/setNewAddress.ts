import { updateCustomer } from '../components/api/api';
import State from '../components/state';
import drawAddress from './drawAddress';
import { Addresses } from './interface';
import { showModal, hideModal } from './modal';
import { checkCountry, checkCity, checkStreet, checkPostalCode } from './validation';

export default function setNewAddress(event: Event) {
  const customer = State.getCustomer();
  const addButton = event.target as HTMLElement;
  const { saveid } = addButton.dataset;
  const infoWrapper = document.querySelector(`[data-currWrapper = "${saveid}"]`) as HTMLElement;
  const roster = document.querySelector('.addresses__roster') as HTMLElement;
  const newAddressButton = document.querySelector('.addresses__addButton') as HTMLElement;

  checkCountry(event);
  checkCity(event);
  checkStreet(event);
  checkPostalCode(event);

  if (infoWrapper && customer && roster && newAddressButton) {
    const country = <HTMLInputElement>infoWrapper.querySelector('.country');
    const city = <HTMLInputElement>infoWrapper.querySelector('.city');
    const street = <HTMLInputElement>infoWrapper.querySelector('.street');
    const postal = <HTMLInputElement>infoWrapper.querySelector('.postal');

    updateCustomer(customer.id, {
      version: Number(customer.version),
      actions: [
        {
          action: 'addAddress',
          address: {
            streetName: street.value,
            postalCode: postal.value,
            city: city.value,
            country: country.value,
          },
        },
      ],
    })
      .then((resp) => {
        State.setCustomer(resp.data);
        roster.innerHTML = '';
        const addressesArr = customer.addresses;
        addressesArr.forEach((address: Addresses) => {
          const container = drawAddress(address);
          roster.append(container.getElement());
        });
        newAddressButton.removeAttribute('disabled');

        showModal('Address added', resp.status);
        setTimeout(hideModal, 3000);
      })
      .catch((error) => {
        showModal(`${error.message}`, error.code);
        setTimeout(hideModal, 3000);
      });
  }
}
