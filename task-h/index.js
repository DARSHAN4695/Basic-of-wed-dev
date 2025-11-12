// index.js
const form = document.getElementById("registrationForm");
const dataTable = document.getElementById("dataTable").querySelector("tbody");

function showError(id, message) {
  const el = document.getElementById(id);
  el.textContent = message;
  el.classList.remove("hidden");
}

function clearError(id) {
  const el = document.getElementById(id);
  el.textContent = "";
  el.classList.add("hidden");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;

  const fullName = form.fullName.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const birthDate = form.birthDate.value;
  const terms = form.terms.checked;

  if (!fullName) {
    showError("nameError", "Full name is required.");
    valid = false;
  } else clearError("nameError");

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    showError("emailError", "Enter a valid email.");
    valid = false;
  } else clearError("emailError");

  const phonePattern = /^\+358\d{7,}$/;
  if (!phone.match(phonePattern)) {
    showError("phoneError", "Enter a valid phone number starting with +358.");
    valid = false;
  } else clearError("phoneError");

  if (!birthDate) {
    showError("birthError", "Birth date is required.");
    valid = false;
  } else clearError("birthError");

  if (!terms) {
    showError("termsError", "You must accept the terms.");
    valid = false;
  } else clearError("termsError");

  if (valid) {
    const timestamp = new Date().toLocaleString();
    const row = `<tr>
      <td class="border px-4 py-2">${timestamp}</td>
      <td class="border px-4 py-2">${fullName}</td>
      <td class="border px-4 py-2">${email}</td>
      <td class="border px-4 py-2">${phone}</td>
      <td class="border px-4 py-2">${birthDate}</td>
    </tr>`;
    dataTable.insertAdjacentHTML("beforeend", row);
    form.reset();
  }
});
