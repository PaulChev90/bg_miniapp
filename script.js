Telegram.WebApp.ready();

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

  // Если вернулись на главный экран, очищаем детали
  if (current === 'warehouse-detail') {
    document.getElementById("warehouse-info").innerHTML = "";
  }
}

function makeCall(phone) {
  const cleanNumber = phone.replace(/\D/g, '');
  window.location.href = `tel:+${cleanNumber}`;
}

// Генерируем список складов динамически
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

// Показываем информацию о конкретном складе вместо списка
function showWarehouse(index) {
  const w = warehouses[index];

  let infoHTML = `
    <h3>${w.name}</h3>
    <p><strong>Адрес:</strong> ${w.address}</p>
    <button onclick="makeCall('${w.phone}')">📞 Позвонить (${w.phone})</button>
    <br /><br />
    <a href="yandexnavi://build_route_on_map?lat_to=${w.latitude}&lon_to=${w.longitude}" target="_blank">🗺️ Построить маршрут (Яндекс)</a>
  `;

  document.getElementById('warehouse-info').innerHTML = infoHTML;
  showScreen('warehouse-detail');
}

// Данные о складах
const warehouses = [
  {
    name: "ОП Горелово",
    address: "Волхонское шоссе, 9/2, территория Северная часть производственной зоны Горелово...",
    phone: "+7(921)928-55-73",
    latitude: 59.788352,
    longitude: 30.219623
  },
  {
    name: "ОП Всеволожск",
    address: "Дизельная улица, 2А, Всеволожск, Ленинградская область",
    phone: "+7(921)589-87-82",
    latitude: 60.004874,
    longitude: 30.794392
  },
  {
    name: "ОП Бугры",
    address: "Шоссейная улица, 58к1, Бугры, Всеволожский район, Ленинградская область",
    phone: "+7(931)248-65-30",
    latitude: 60.082135,
    longitude: 30.391964
  },
  {
    name: "ОП Санкт-Петербург",
    address: "проспект Непокорённых, 63к36, Санкт-Петербург, 195067",
    phone: "+7(931)370-95-39",
    latitude: 59.990940,
    longitude: 30.417953
  },
  {
    name: "ОП Чехов",
    address: "промышленная зона Лешино, вл1с1, муниципальный округ Чехов, Московская область...",
    phone: "+7(495)733-95-85,2107",
    latitude: 55.146882,
    longitude: 37.583787
  },
  {
    name: "ОП Ворсино",
    address: "улица Лыскина, вл7, село Ворсино, Боровский район, Калужская область, 249020",
    phone: "+7(921)402-67-00",
    latitude: 55.227566,
    longitude: 36.678725
  },
  {
    name: "ОП Екатеринбург",
    address: "улица Черняховского, 86к19, подъезд 10, Екатеринбург, Свердловская область",
    phone: "+7(922)173-07-74",
    latitude: 56.760485,
    longitude: 60.745220
  },
  {
    name: "ОП Копейск",
    address: "проспект Победы, 75, Копейск, Челябинская область, 456620",
    phone: "+7(351)750-06-26",
    latitude: 55.114729,
    longitude: 61.541379
  },
  {
    name: "ОП Толмачёво",
    address: "улица 3307-й километр, 16/1, село Толмачёво, Новосибирский район",
    phone: "+7(923)115-12-99",
    latitude: 55.007251,
    longitude: 82.538376
  },
  {
    name: "ОП Ардон",
    address: "Привокзальная улица, 11, Ардон, Республика Северная Осетия — Алания",
    phone: "+7(928)068-52-17",
    latitude: 43.183164,
    longitude: 44.273424
  }
];

// Инициализация списка складов при первом открытии раздела
document.addEventListener('DOMContentLoaded', () => {
  generateWarehouseList();
});
