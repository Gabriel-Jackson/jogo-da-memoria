function openModal(modalId) {
  document.querySelector(`#${modalId}`).
    classList.add("showing")
  document.querySelector("body").
    classList.add("modal-open")
}

function closeModal(modalId) {
  document.querySelector(`#${modalId}`).
    classList.remove("showing")
  document.querySelector("body").
    classList.remove("modal-open")
}