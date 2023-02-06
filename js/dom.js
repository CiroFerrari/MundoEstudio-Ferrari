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

/**
 * Manipulación del DOM 
 */
const countrySelect = document.getElementById("countrySelect");
const monthInput = document.getElementById("monthInput");
const resultP = document.getElementById("resultP");
const calcButton = document.getElementById("calcButton");

// Imprimir países como opciones
for (country of data) {
  countrySelect.innerHTML += `<option id="${country.country.toLowerCase()}" value="${country.country}">${country.country}</option>`;
}

// Si existe país en localStorage, imprimirlo
if (localStorage.getItem("country")) {
  let optionSelected = document.getElementById(localStorage.getItem("country"));
  optionSelected.selected = true;
}

// Si existen meses en localStorage, imprimirlos
if (localStorage.getItem("month")) {
  monthInput.value = localStorage.getItem("month");
}

// Si hay país y meses en localStorage, imprimir resultado
if ((localStorage.getItem("country")) && (localStorage.getItem("month"))) {
  totalResult = calcResult(countrySelected, monthsSelected);
  resultP.innerText = totalResult;
  resultP.classList.add("result-p");
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
