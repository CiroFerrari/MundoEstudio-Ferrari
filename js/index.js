/**
 * JSON 
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
  countrySelect.innerHTML += `<option value="${country.country}">${country.country}</option>`;
}

// Capturar el país elegido
countrySelect.addEventListener('change', () => {
  countrySelected = countrySelect.value;
});

// Capturar la cantidad de meses elegida
monthInput.addEventListener('change', () => {
  monthsSelected = monthInput.value;
});

// Evento 'click' en botón 'Calcular resultado'
calcButton.addEventListener('click', (event) => {
  event.preventDefault();
  totalResult = calcResult(countrySelected, monthsSelected);
  resultP.innerText = totalResult;
  resultP.classList.add("result-p");
});

/**
 * Declaración de funciones
 */

// Calcular resultado
function calcResult(countrySelected, monthsSelected) {
  if (!countrySelected) {
    return "Por favor, ingrese un país";
  }

  if (!monthsSelected) {
    return "Por favor, ingrese cantidad de meses";
  }

  let dataSelected = data.find(country => country.country.toLowerCase() === countrySelected.toLowerCase());

  let result = dataSelected.monthlyCost * monthsSelected; // Calcula el total
  result = Intl.NumberFormat('en-US').format(result); // Agrega el separador de miles al número
  result = `${result} ${dataSelected.currency}`; // Agrega el símbolo de la moneda al resultado

  return result;
};
