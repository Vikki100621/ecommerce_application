import { AxiosError } from 'axios';
import { getCustomer, updateCustomer } from '../components/api/api';
import drawAddress from './drawAddress';
import { Addresses, Customer } from './interface';
import { showModal, hideModal } from './modal';
import { checkCountry, checkCity, checkStreet, checkPostalCode } from './validation';

export default async function setNewAddress(event: Event) {
  const currentId = localStorage.getItem('customerID') as string;
  const currentUser: Customer = await getCustomer(currentId).then((responce) => responce.data);
  const addButton = event.target as HTMLElement;
  const { saveid } = addButton.dataset;
  const infoWrapper = document.querySelector(`[data-currWrapper = "${saveid}"]`) as HTMLElement;
  const roster = document.querySelector('.addresses__roster') as HTMLElement;
  const newAddressButton = document.querySelector('.addresses__addButton') as HTMLElement;

  checkCountry(event);
  checkCity(event);
  checkStreet(event);
  checkPostalCode(event);

  if (infoWrapper && currentUser && roster && newAddressButton) {
    const country = <HTMLInputElement>infoWrapper.querySelector('.country');
    const city = <HTMLInputElement>infoWrapper.querySelector('.city');
    const street = <HTMLInputElement>infoWrapper.querySelector('.street');
    const postal = <HTMLInputElement>infoWrapper.querySelector('.postal');

    updateCustomer(currentUser.id, {
      version: Number(currentUser.version),
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
      .then(async (resp) => {
        const newUSer: Customer = await getCustomer(currentId).then((responce) => responce.data);
        roster.innerHTML = '';
        const addressesArr = newUSer.addresses;
        addressesArr.forEach((address: Addresses) => {
          const container = drawAddress(address);
          roster.append(container.getElement());
        });
        newAddressButton.removeAttribute('disabled');

        showModal('Address added', resp.status);
        setTimeout(hideModal, 3000);
      })
      .catch((error: AxiosError) => {
        const { response } = error;
        if (response) {
          const { status } = response;
          const errorData = response.data as Error;
          const { message } = errorData;

          showModal(message, status);
          setTimeout(hideModal, 3000);
        }
      });
  }
}
