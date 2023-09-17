import { getCustomer, updateCustomer } from '../components/api/api';
import { Customer } from './interface';
import { showModal, hideModal } from './modal';

export default async function deleteAddress(event: Event) {
  const deleteButton = event.target as HTMLElement;
  const currentId = localStorage.getItem('customerID') as string;
  const currentUser: Customer = await getCustomer(currentId).then((responce) => responce.data);
  const id = deleteButton.dataset.deleteid;
  const addressWrapper = document.getElementById(`${id}`);
  const addButton = document.querySelector('.addresses__addButton');

  if (addressWrapper && addButton) {
    addressWrapper.remove();
    if (id !== 'newAddress' && currentUser) {
      updateCustomer(currentUser.id, {
        version: Number(currentUser.version),
        actions: [{ action: 'removeAddress', addressId: id }],
      })
        .then((resp) => {
          showModal('Address deleted', resp.status);
          setTimeout(hideModal, 3000);
        })
        .catch((error) => {
          showModal(`${error.message}`, error.code);
          setTimeout(hideModal, 3000);
        });
    } else {
      addButton.removeAttribute('disabled');
    }
  }
}
