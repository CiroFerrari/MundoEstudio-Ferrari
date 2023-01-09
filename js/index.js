// Declaración inicial de variables
let monthAustralia = 1000;
let monthAlemania = 900;

let country = '';
let months = 0;
let total = 0;

// Ejecución de funciones
presentation();
country = selectCountry();
months = selectMonths();
total = calcResult(country, months);
showResults(country, months, total);

// Declaración de funciones
function presentation() {
  alert('¡Bienvenido! \n\nVamos a calcular la cantidad de dinero necesario para conseguir la visa de estudiante en el país de su elección')
}

function selectCountry() {
  let option = '';

  option = prompt('Elige un país: Australia ó Alemania').toLowerCase();

  while (option !== 'australia' && option !== 'alemania') {
    option = prompt('Por favor, elija una opción correcta.\n\nElige un país: Australia ó Alemania').toLowerCase();
  }
  console.log(option);
  return option;
}

function selectMonths() {
  let option = 0;

  option = parseInt(prompt('Elige la cantidad de meses que desea estudiar allí:'));

  while (!option) {
    option = parseInt(prompt('Por favor, elija una opción correcta.\n\nElige la cantidad de meses: '));
  }
  option = parseInt(option);
  console.log(option);
  return option;
}

function calcResult(country, months) {
  let result = 0;
  switch (country) {
    case 'australia':
      return result = monthAustralia * months;
    case 'alemania':
      return result = monthAlemania * months;
    default:
      return null;
  }
}

function showResults(country, months, total) {
  total = Intl.NumberFormat('en-US').format(total); // Agrega el separador de mil en el número
  alert(`Su país elegido es: ${country}\n\nLa cantidad de meses elegida es: ${months}\n\nEl total que debe ahorrar es: ${total} USD`);
}