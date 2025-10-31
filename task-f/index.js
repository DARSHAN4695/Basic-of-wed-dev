// Author: Darshan Badal
// Date: 2025-10-30

document.addEventListener("DOMContentLoaded", () => {
  const CHECK = "✅";
  const CROSS = "❌";
  const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const form = document.getElementById("addCourseForm");
  const tableBody = document.getElementById("timetable").querySelector("tbody");
  const courseInput = document.getElementById("courseName");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const courseName = courseInput.value.trim();
    if (!courseName) return;

    // Collect selected days
    const checkedDays = new Set(
      Array.from(form.querySelectorAll('input[name="day"]:checked')).map((cb) => cb.value)
    );

    // Create new row
    const row = document.createElement("tr");

    // Course name cell
    const courseCell = document.createElement("td");
    courseCell.textContent = courseName;
    row.appendChild(courseCell);

    // Day cells
    dayOrder.forEach((day) => {
      const cell = document.createElement("td");
      cell.textContent = checkedDays.has(day) ? CHECK : CROSS;
      row.appendChild(cell);
    });

    tableBody.appendChild(row);

    // Reset form
    form.reset();
    courseInput.focus();
  });
});
