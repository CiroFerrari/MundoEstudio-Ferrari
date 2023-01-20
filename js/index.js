// Declaración inicial de variables
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
]

const countryArray = data.map((country) => country.country);
let countryList = countryArray.join(', ');

let countrySelected = '';
let monthsSelected = 0;
let totalResult = 0;

// Ejecución de funciones
presentation();
countrySelected = selectCountry();
monthsSelected = selectMonths();
totalResult = calcResult(countrySelected, monthsSelected);
showResults(countrySelected, monthsSelected, totalResult);

// Declaración de funciones
function presentation() {
  alert('¡Bienvenido! \n\nVamos a calcular la cantidad de dinero necesario para conseguir la visa de estudiante en el país de su elección')
}

function selectCountry() {
  let option = '';
  let countryArrayLowerCase = countryArray.map(country => country.toLowerCase());

  option = prompt(`Elige un país:\n${countryList}`).toLowerCase();

  while (!(countryArrayLowerCase.includes(option))) {
    option = prompt(`Por favor, elija una opción correcta.\n\nElige un país:\n${countryList}`).toLowerCase();
  }

  option = option.charAt(0).toUpperCase() + option.slice(1); // Capitaliza la primera letra

  console.log("El país elegido es: ", option);
  return option;
}

function selectMonths() {
  let option = 0;

  option = parseInt(prompt('Elige la cantidad de meses que desea estudiar allí:'));

  while (!option) {
    option = parseInt(prompt('Por favor, elija una opción correcta.\n\nElige la cantidad de meses: '));
  }
  option = parseInt(option);
  console.log("La cantidad de meses elegida es: ", option);
  return option;
}

function calcResult(countrySelected, monthsSelected) {
  let dataSelected = data.filter(country => country.country.toLowerCase() === countrySelected.toLowerCase());

  let result = dataSelected[0].monthlyCost * monthsSelected; // Calcula el total
  result = Intl.NumberFormat('en-US').format(result); // Agrega el separador de miles al número
  result = `${result} ${dataSelected[0].currency}`; // Agrega el símbolo de la moneda al resultado

  return result;
}

function showResults(countrySelected, monthsSelected, totalResult) {
  alert(`Su país elegido es: ${countrySelected}\n\nLa cantidad de meses elegida es: ${monthsSelected}\n\nEl total que debe ahorrar es: ${totalResult}`);
}