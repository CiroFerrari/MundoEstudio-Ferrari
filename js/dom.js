/**
 * Array con la información 
 */
const data = [
  {
    country: 'Australia',
    monthlyCost: 1000,
    currency: 'AUD',
    currencyData: 'AUD',
  },
  {
    country: 'Alemania',
    monthlyCost: 900,
    currency: '€',
    currencyData: 'EUR',
  },
  {
    country: 'Irlanda',
    monthlyCost: 850,
    currency: '€',
    currencyData: 'EUR',
  },
  {
    country: 'España',
    monthlyCost: 700,
    currency: '€',
    currencyData: 'EUR',
  },
  {
    country: 'Portugal',
    monthlyCost: 600,
    currency: '€',
    currencyData: 'EUR',
  },
];

/**
 * Declaración inicial de variables
 */
let countrySelected = '';
let monthsSelected = 0;
let totalResult = 0;
let favorites = [];
const DateTime = luxon.DateTime;

/**
 * Manipulación del DOM 
 */
const countrySelect = document.getElementById("countrySelect");
const monthInput = document.getElementById("monthInput");
const resultP = document.getElementById("resultP");
const calcButton = document.getElementById("calcButton");
const favButton = document.getElementById("favButton");
const convertButton = document.getElementById("convertButton");
const favP = document.getElementById("favP");
const favUl = document.getElementById("favUl");
const favUpdateP = document.getElementById("favUpdateP");
const deleteFavButton = document.getElementById("deleteFavButton");

// Imprimir países como opciones
for (country of data) {
  countrySelect.innerHTML += `<option id="${country.country.toLowerCase()}" value="${country.country}">${country.country}</option>`;
};

// Si existe país en localStorage, imprimirlo como opción seleccionada
if (localStorage.getItem("country")) {
  let optionSelected = document.getElementById(localStorage.getItem("country"));
  optionSelected.selected = true;
};

// Si existen meses en localStorage, imprimirlo en el input de meses
if (localStorage.getItem("month")) {
  monthInput.value = localStorage.getItem("month");
};

// Si hay país y meses en localStorage, calcular e imprimir resultado
if ((localStorage.getItem("country")) && (localStorage.getItem("month"))) {
  totalResult = calcResult(countrySelected, monthsSelected);
  resultP.innerText = totalResult;
  resultP.classList.add("result-p");
};

// Si hay favoritos en localStorage, imprimirlos
if (localStorage.getItem("favorites")) {
  let favoritos = JSON.parse(localStorage.getItem("favorites"));
  for (favorito of favoritos) {
    const { country, month, total, id } = favorito;
    favUl.innerHTML += `<li>${country} ${month} meses: ${total} <button onclick="deleteOneFavorite(${id})">Eliminar</button></li>`;
  };
  let fecha = localStorage.getItem("lastUpdate");
  favUpdateP.innerHTML = `Última actualización: ${fecha}`;
};

// Función para eliminar un favorito, recibe el ID del favorito a eliminar, filtra el localStorage, y vuelve a imprimirlos
const deleteOneFavorite = (id) => {
  let favoritos = JSON.parse(localStorage.getItem("favorites"));

  favoritos = favoritos.filter(item => item.id !== id);

  localStorage.setItem("favorites", JSON.stringify(favoritos));

  favUl.innerHTML = '';
  for (favorito of favoritos) {
    const { country, month, total, id } = favorito;
    favUl.innerHTML += `<li>${country} ${month} meses: ${total} <button onclick="deleteOneFavorite(${id})">Eliminar</button></li>`;
  };
}

// Capturar el país elegido
countrySelect.addEventListener('change', () => {
  countrySelected = countrySelect.value;
  localStorage.setItem("country", countrySelected.toLowerCase());
});

// Capturar la cantidad de meses elegida
monthInput.addEventListener('change', () => {
  monthsSelected = monthInput.value;
  localStorage.setItem("month", monthsSelected);
});

// Evento 'click' en botón 'Calcular resultado'
calcButton.addEventListener('click', (event) => {
  event.preventDefault();
  totalResult = calcResult(countrySelected, monthsSelected);
  resultP.innerText = totalResult;
  resultP.classList.add("result-p");
});

// Evento 'click' en botón 'Convertir a USD'
convertButton.addEventListener('click', async () => {
  totalResult = calcResult(countrySelected, monthsSelected);

  let convertedResult = convertToUSD(totalResult);

  resultP.innerText = `${convertedResult} USD`;
  resultP.classList.add("result-p");
});

// Evento 'click' en botón 'Agregar a favoritos'
favButton.addEventListener('click', () => {

  let favoritos = JSON.parse(localStorage.getItem("favorites")) || [];

  let paisElegido = localStorage.getItem("country") || countrySelected || "";

  let mesesElegido = localStorage.getItem("month") || monthsSelected || 0;

  let resultado = calcResult(paisElegido, mesesElegido);
  resultP.innerText = resultado;

  let fecha = DateTime.now().setLocale('es').toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY).toUpperCase() + " a las " + DateTime.now().toLocaleString(DateTime.TIME_SIMPLE);

  // Agregar a favoritos sólo si los inputs tienen valores válidos, y no se encuentra ya en favoritos para evitar repeticiones
  (paisElegido !== "" && mesesElegido > 0)
    && (
      favoritos.push({
        country: paisElegido.toUpperCase(),
        month: mesesElegido,
        total: resultado,
        id: favoritos.length + 1
      })
    ) && (
      Toastify({
        text: `¡${paisElegido.toUpperCase()} agregado a Favoritos!`,
        duration: 3000,
        gravity: "bottom",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #0ca5e9)",
        },
      }).showToast()
      && (
        favUpdateP.innerHTML = `Última actualización: ${fecha}`
      )
    );

  favUl.innerHTML = '';
  for (favorito of favoritos) {
    const { country, month, total, id } = favorito;
    favUl.innerHTML += `<li>${country} ${month} meses: ${total} <button onclick="deleteOneFavorite(${id})">Eliminar</button></li>`;
  };

  if (favoritos.length > 0) {
    localStorage.setItem("favorites", JSON.stringify(favoritos));
    localStorage.setItem("lastUpdate", fecha);
  };
});

// Evento "click" en botón "Borrar favoritos"
deleteFavButton.addEventListener("click", () => {

  Swal.fire({
    title: '¿Seguro que desea eliminar los Favoritos?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Sí, seguro',
    denyButtonText: `No, no borrar`,
  }).then((result) => {

    if (result.isConfirmed) {

      // Se limpian los input y resultados en el DOM
      document.getElementById("none").selected = true;
      monthInput.value = 0;
      resultP.innerText = "";
      resultP.classList.remove("result-p");
      favUl.innerHTML = '';

      // Se reinician los valores de las variables
      favUpdateP.innerHTML = "";
      countrySelected = "";
      monthsSelected = "";

      // Se limpia el localStorage
      localStorage.clear();

      // Feedback al usuario
      Toastify({
        text: `¡Favoritos eliminados correctamente!`,
        duration: 3000,
        gravity: "bottom",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #0ca5e9)",
        },
      }).showToast();

    } else if (result.isDenied) {

      // Feedback al usuario
      Toastify({
        text: `¡No se han eliminado los Favoritos!`,
        duration: 3000,
        gravity: "bottom",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #0ca5e9)",
        },
      }).showToast();
    };
  });
});