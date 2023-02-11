/**
 * Array con la información 
 */
const data = [
  {
    country: 'Australia',
    monthlyCost: 1000,
    currency: 'AUD',
  },
  {
    country: 'Alemania',
    monthlyCost: 900,
    currency: '€',
  },
  {
    country: 'Irlanda',
    monthlyCost: 850,
    currency: '€',
  },
  {
    country: 'España',
    monthlyCost: 700,
    currency: '€',
  },
  {
    country: 'Portugal',
    monthlyCost: 600,
    currency: '€',
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
const favP = document.getElementById("favP");
const favUl = document.getElementById("favUl");
const favUpdateP = document.getElementById("favUpdateP");
const deleteFavButton = document.getElementById("deleteFavButton");

// Imprimir países como opciones
for (country of data) {
  countrySelect.innerHTML += `<option id="${country.country.toLowerCase()}" value="${country.country}">${country.country}</option>`;
};

// Si existe país en localStorage, imprimirlo
if (localStorage.getItem("country")) {
  let optionSelected = document.getElementById(localStorage.getItem("country"));
  optionSelected.selected = true;
};

// Si existen meses en localStorage, imprimirlos
if (localStorage.getItem("month")) {
  monthInput.value = localStorage.getItem("month");
};

// Si hay país y meses en localStorage, imprimir resultado
if ((localStorage.getItem("country")) && (localStorage.getItem("month"))) {
  totalResult = calcResult(countrySelected, monthsSelected);
  resultP.innerText = totalResult;
  resultP.classList.add("result-p");
};

// Si hay favoritos en localStorage, imprimirlos
if (localStorage.getItem("favorites")) {
  let favoritos = JSON.parse(localStorage.getItem("favorites"));
  for (favorito of favoritos) {
    const { country, month, total, date } = favorito;
    favUl.innerHTML += `<li>${country} ${month} meses: ${total}</li>`;
  };
  let fecha = localStorage.getItem("lastUpdate");
  favUpdateP.innerHTML = `Última actualización: ${fecha}`;
};

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

// Evento 'click' en botón 'Agregar a favoritos'
favButton.addEventListener('click', () => {

  let favoritos = JSON.parse(localStorage.getItem("favorites")) || [];

  let paisElegido = localStorage.getItem("country") || countrySelected || "";

  let mesesElegido = localStorage.getItem("month") || monthsSelected || 0;

  let resultado = calcResult(paisElegido, mesesElegido);
  resultP.innerText = resultado;

  let fecha = DateTime.now().setLocale('es').toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY).toUpperCase() + " a las " + DateTime.now().toLocaleString(DateTime.TIME_SIMPLE);

  (paisElegido !== "" && mesesElegido > 0)
    && (
      favoritos.push({
        country: paisElegido.toUpperCase(),
        month: mesesElegido,
        total: resultado,
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
    const { country, month, total, date } = favorito;
    favUl.innerHTML += `<li>${country} ${month} meses: ${total}</li>`;
  };

  localStorage.setItem("favorites", JSON.stringify(favoritos));
  localStorage.setItem("lastUpdate", fecha)
});

// Evento "click" en botón "Borrar favoritos"
deleteFavButton.addEventListener("click", () => {
  localStorage.clear();
  favUl.innerHTML = '';
  location.reload();
});