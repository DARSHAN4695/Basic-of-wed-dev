// Task G - Custom Form Validation and Table Append

const form = document.getElementById("userForm");
const tbody = document.getElementById("table-body");
const timestamp = document.getElementById("timestamp");

// Fill timestamp automatically
function fillTimestamp() {
  timestamp.value = new Date().toISOString();
}

// Validation functions
function validateFullName(name) {
  if (!name.trim()) return "Please enter your full name (first and last).";
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) return "Enter both first and last name.";
  if (parts.some((p) => p.length < 2))
    return "Each name part must be at least 2 characters long.";
  return "";
}

function validateEmail(email) {
  if (!email.trim()) return "Please enter your email address.";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; // ✅ fixed regex
  if (!re.test(email))
    return "Please enter a valid email (e.g., you@example.com).";
  return "";
}

function validatePhone(phone) {
  if (!phone.trim()) return "Please enter your phone number.";
  const cleaned = phone.replace(/[\s-]/g, "");
  const re = /^(?:\+358|0)\d{7,12}$/; // ✅ fixed regex
  if (!re.test(cleaned))
    return "Phone must start with +358 or 0 and contain 7–12 digits.";
  return "";
}

function validateBirthdate(birthdate) {
  if (!birthdate) return "Please select your birth date.";
  const b = new Date(birthdate);
  const now = new Date();
  if (b > now) return "Birth date cannot be in the future.";

  const age =
    now.getFullYear() -
    b.getFullYear() -
    (now.getMonth() < b.getMonth() ||
    (now.getMonth() === b.getMonth() && now.getDate() < b.getDate())
      ? 1
      : 0);

  if (age < 13) return "You must be at least 13 years old to submit.";
  return "";
}

function validateTerms(checked) {
  return checked ? "" : "You must accept the terms.";
}

// Display error messages near fields
function showError(id, msg) {
  document.getElementById(id).textContent = msg;
}

// Clear all previous errors
function clearErrors() {
  ["fullname", "email", "phone", "birthdate", "terms"].forEach((field) =>
    showError(`error-${field}`, "")
  );
}

// Prevent XSS injection when displaying text
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Add new row to the table
function addRow(data) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${escapeHtml(data.timestamp)}</td>
    <td>${escapeHtml(data.fullname)}</td>
    <td>${escapeHtml(data.email)}</td>
    <td>${escapeHtml(data.phone)}</td>
    <td>${escapeHtml(data.birthdate)}</td>
    <td>${data.terms ? "Yes" : "No"}</td>
  `;
  tbody.appendChild(row);
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  fillTimestamp();
  clearErrors();

  const data = {
    fullname: document.getElementById("fullname").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    birthdate: document.getElementById("birthdate").value,
    terms: document.getElementById("terms").checked,
    timestamp: timestamp.value,
  };

  const errors = {
    fullname: validateFullName(data.fullname),
    email: validateEmail(data.email),
    phone: validatePhone(data.phone),
    birthdate: validateBirthdate(data.birthdate),
    terms: validateTerms(data.terms),
  };

  let hasError = false;
  for (const field in errors) {
    if (errors[field]) {
      showError(`error-${field}`, errors[field]);
      hasError = true;
    }
  }

  if (hasError) return;

  addRow(data);
  form.reset();
  timestamp.value = "";
});
