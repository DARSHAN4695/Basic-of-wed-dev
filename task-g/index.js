document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const tableBody = document.querySelector("#dataTable tbody");
  const timestampField = document.getElementById("timestamp");

  // Set timestamp initially
  timestampField.value = new Date().toLocaleString();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    // Update timestamp
    timestampField.value = new Date().toLocaleString();

    // Collect field values
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const birthDate = document.getElementById("birthDate").value;
    const terms = document.getElementById("terms").checked;

    let valid = true;

    // ✅ Validate Full Name
    const nameParts = fullName.split(" ");
    if (nameParts.length < 2 || nameParts.some(n => n.length < 2)) {
      showError("nameError", "Please enter your full name (first and last).");
      valid = false;
    }

    // ✅ Validate Email
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
      showError("emailError", "Please enter a valid email address (e.g., name@example.com).");
      valid = false;
    }

    // ✅ Validate Phone (Finnish +358 pattern)
    const phoneRegex = /^\+358\d{6,10}$/;
    if (!phoneRegex.test(phone)) {
      showError("phoneError", "Phone must start with +358 and have 6–10 digits.");
      valid = false;
    }

    // ✅ Validate Birth Date
    if (!birthDate) {
      showError("birthError", "Please select your birth date.");
      valid = false;
    } else {
      const dob = new Date(birthDate);
      const today = new Date();
      const age = (today - dob) / (365.25 * 24 * 60 * 60 * 1000);
      if (dob > today) {
        showError("birthError", "Birth date cannot be in the future.");
        valid = false;
      } else if (age < 13) {
        showError("birthError", "You must be at least 13 years old.");
        valid = false;
      }
    }

    // ✅ Validate Terms
    if (!terms) {
      showError("termsError", "You must accept the terms to continue.");
      valid = false;
    }

    // ✅ If valid, add new row
    if (valid) {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${timestampField.value}</td>
        <td>${fullName}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${birthDate}</td>
      `;
      tableBody.appendChild(newRow);

      // Reset form
      form.reset();
      timestampField.value = new Date().toLocaleString();
    }
  });

  function showError(id, message) {
    document.getElementById(id).textContent = message;
  }

  function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
  }
});
