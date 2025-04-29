const screens = {
  stack: ['main-menu']
};

function showScreen(id) {
  document.getElementById(screens.stack[screens.stack.length - 1]).classList.remove('active');
  document.getElementById(id).classList.add('active');
  screens.stack.push(id);
}

function back() {
  if (screens.stack.length <= 1) return;
  const current = screens.stack.pop();
  document.getElementById(current).classList.remove('active');
  document.getElementById(screens.stack[screens.stack.length - 1]).classList.add('active');

  if (current === 'warehouse-detail') {
    document.getElementById("warehouse-info").innerHTML = "";
  }
}

function generateWarehouseList() {
  const container = document.getElementById('warehouse-list');
  container.innerHTML = '';
  warehouses.forEach((w, i) => {
    const btn = document.createElement('button');
    btn.textContent = w.name;
    btn.onclick = () => showWarehouse(i);
    container.appendChild(btn);
  });
}

function showWarehouse(index) {
  const w = warehouses[index];

  let infoHTML = `
    <h3>${w.name}</h3>
    <p><strong>Адрес:</strong> ${w.address}</p>
  `;

  if (w.additional_inf && w.additional_inf.trim()) {
    infoHTML += `<p style="color:#555; margin-top:10px;"><i>${w.additional_inf}</i></p>`;
  }

  const cleanNumber = w.phone.replace(/\D/g, '');
  infoHTML += `
    <p><strong>Телефон:</strong> <a href="tel:+${cleanNumber}" class="tel-link">${w.phone}</a></p>
    <br />
    <a href="yandexnavi://build_route_on_map?lat_to=${w.latitude}&lon_to=${w.longitude}" target="_blank" class="map-button">
      🗺️ Построить маршрут (Яндекс)
    </a>
  `;

  document.getElementById('warehouse-info').innerHTML = infoHTML;
  showScreen('warehouse-detail');
}

const warehouses = [
  {
    name: "ОП Горелово",
    address: "Волхонское шоссе, 9/2...",
    phone: "+7(921)928-55-73",
    latitude: 59.788352,
    longitude: 30.219623,
    additional_inf: ""
  },
  // ... остальные склады
];

document.addEventListener('DOMContentLoaded', () => {
  generateWarehouseList();
});
