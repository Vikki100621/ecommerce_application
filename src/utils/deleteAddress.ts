import { updateCustomer } from "../components/api/api";
import State from "../components/state";
import { showModal, hideModal } from "./modal";

export default function deleteAddress(event: Event) {
  const deleteButton = event.target as HTMLElement;
  const customer = State.getCustomer();
  const id = deleteButton.dataset.deleteid;
  const addressWrapper = document.getElementById(`${id}`);
  const addButton = document.querySelector('.addresses__addButton')

  

  if (addressWrapper && addButton) {
    addressWrapper.remove();
    if (id !== 'newAddress' && customer) {
      updateCustomer(customer.id, {
        version: Number(customer.version),
        actions: [{ action: 'removeAddress', addressId: id }],
      })
        .then((resp) => {
          State.setCustomer(resp.data);
          showModal('Address deleted', resp.status);
          setTimeout(hideModal, 3000);
        })
        .catch((error) => {
          showModal(`${error.message}`, error.code);
          setTimeout(hideModal, 3000);
        });
    }
    else {
        addButton.removeAttribute('disabled')
    }
  }
}