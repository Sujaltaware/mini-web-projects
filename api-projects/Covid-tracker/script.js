const API_BASE = 'https://disease.sh/v3/covid-19';
const dropdown = document.getElementById('countryDropdown');
let chart; // to update Chart.js later

// Animate numbers
function animateCounter(id, value) {
  const el = document.getElementById(id);
  let count = 0;
  const step = Math.ceil(value / 100);

  const update = () => {
    count += step;
    if (count >= value) {
      el.textContent = value.toLocaleString();
    } else {
      el.textContent = count.toLocaleString();
      requestAnimationFrame(update);
    }
  };
  update();
}

// Display global or country stats
function displayStats(data) {
  animateCounter("totalCases", data.cases);
  animateCounter("recovered", data.recovered);
  animateCounter("deaths", data.deaths);
}

// Fetch API data
async function fetchData(endpoint) {
  const res = await fetch(`${API_BASE}/${endpoint}`);
  return await res.json();
}

// Load countries
async function loadCountries() {
  const countries = await fetchData('countries');
  countries.forEach(country => {
    const opt = document.createElement('option');
    opt.value = country.countryInfo.iso2;
    opt.textContent = country.country;
    dropdown.appendChild(opt);
  });
}

// Dropdown listener
dropdown.addEventListener('change', async () => {
  const val = dropdown.value;
  const data = val === 'global' ? await fetchData('all') : await fetchData(`countries/${val}`);
  displayStats(data);
});

// Render line chart
async function renderChart() {
  const res = await fetch(`${API_BASE}/historical/all?lastdays=30`);
  const data = await res.json();

  const labels = Object.keys(data.cases);
  const cases = Object.values(data.cases);
  const deaths = Object.values(data.deaths);
  const recovered = Object.values(data.recovered);

  const ctx = document.getElementById('casesChart').getContext('2d');
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Cases',
          data: cases,
          borderColor: '#f39c12',
          fill: false,
        },
        {
          label: 'Recovered',
          data: recovered,
          borderColor: '#27ae60',
          fill: false,
        },
        {
          label: 'Deaths',
          data: deaths,
          borderColor: '#c0392b',
          fill: false,
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

// Dark mode
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Init
(async () => {
  const global = await fetchData('all');
  displayStats(global);
  await loadCountries();
  await renderChart();
})();
