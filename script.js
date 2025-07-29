let coursesData = [];
let table;

// Load data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    coursesData = data;
    initDashboard();
  });

// Initialize dashboard
function initDashboard() {
  // Extract unique disciplines
  const disciplines = [...new Set(coursesData.map(c => c.Discipline))];

  // Populate dropdown
  const dropdown = document.getElementById('disciplineDropdown');
  disciplines.forEach(d => {
    const option = document.createElement('option');
    option.value = d;
    option.textContent = d;
    dropdown.appendChild(option);
  });

  // Event listener for dropdown
  dropdown.addEventListener('change', () => {
    const selected = dropdown.value;
    if (selected === 'all') {
      renderTable(coursesData);
    } else {
      const filtered = coursesData.filter(c => c.Discipline === selected);
      renderTable(filtered);
    }
  });

  // Initialize DataTable
  table = $('#coursesTable').DataTable({
    pageLength: 10,
    responsive: true,
    language: {
      search: "_INPUT_",
      searchPlaceholder: "Search courses..."
    }
  });

  // Default: Show all
  renderTable(coursesData);
}

// Render DataTable
function renderTable(data) {
  table.clear();
  data.forEach(row => {
    table.row.add([
      `<a href="${row['Course URL']}" target="_blank">${row['Course Name']}</a>`,
      row.Discipline,
      row.Enrolled,
      row.Registered,
      row.Gold,
      row.Silver,
      row.Elite,
      row.Success,
      row.Average
    ]);
  });
  table.draw();
}
