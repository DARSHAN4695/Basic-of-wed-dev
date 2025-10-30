// index.js
document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-row');
  const table = document.getElementById('courses');
  if (!addBtn || !table) {
    console.warn('Required DOM elements missing: add-row or courses table.');
    return;
  }

  const tbody = table.querySelector('tbody');
  if (!tbody) {
    console.error('<tbody> missing in table');
    return;
  }

  // sensible default data and incrementing counter
  let counter = 1;
  const defaultSemester = 'Autumn 2025';
  const defaultInstructor = 'Staff';

  addBtn.addEventListener('click', () => {
    const tr = document.createElement('tr');

    const codeTd = document.createElement('td');
    codeTd.textContent = `CS${100 + counter}`;

    const nameTd = document.createElement('td');
    nameTd.textContent = `Introduction to Web ${counter}`;

    const creditsTd = document.createElement('td');
    creditsTd.textContent = '5';

    const semTd = document.createElement('td');
    semTd.textContent = defaultSemester;

    const instTd = document.createElement('td');
    instTd.textContent = defaultInstructor;

    const actionsTd = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'btn-remove';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      tr.remove();
    });
    actionsTd.appendChild(removeBtn);

    tr.append(codeTd, nameTd, creditsTd, semTd, instTd, actionsTd);
    tbody.appendChild(tr);

    counter += 1;
  });
});
