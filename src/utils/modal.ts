export function showModal(text: string, status: number) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  const firstline = document.createElement('p');
  const secondline = document.createElement('p');
  modal.append(firstline, secondline);
  if (status === 200) {
    firstline.innerText = `✔️Successfully`;
    secondline.innerText = `${text}`;
  } else {
    firstline.innerText = `❌Failure`;
    secondline.innerText = `${text}`;
  }
  document.body.appendChild(modal);
}

export function hideModal() {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.remove();
  }
}
