// FILE: js/successModal.js
// PURPOSE: accessible local-demo acknowledgement, without extra audio or network.
// BEGIN showSuccess
export function showSuccess(text) {
  const element = document.getElementById('successModal');
  document.getElementById('successModalText').textContent = text;
  bootstrap.Modal.getOrCreateInstance(element).show();
}
// END showSuccess
