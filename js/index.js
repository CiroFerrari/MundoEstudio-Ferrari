/**
 * Declaración de funciones
 */

// Saludo inicial
Toastify({
  text: "¡Bienvenido a Mundo Estudio!",
  duration: 3000,
  gravity: "top",
  position: "center",
  stopOnFocus: true,
  style: {
    background: "linear-gradient(to right, #00b09b, #0ca5e9)",
  },
}).showToast()
setTimeout(() => {
  Toastify({
    text: "¡Esperamos que lo disfrutes!",
    duration: 3000,
    gravity: "bottom",
    position: "left",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #0ca5e9)",
    },
  }).showToast()
}, 3000);

// Calcular resultado
function calcResult() {
  let countrySelected = localStorage.getItem("country");
  let monthsSelected = localStorage.getItem("month");

  if (!countrySelected || countrySelected === "none") {
    Swal.fire({
      title: 'Faltan datos',
      text: 'Por favor, ingrese un país',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
    return "Por favor, ingrese un país";
  }

  if (!monthsSelected) {
    Swal.fire({
      title: 'Faltan datos',
      text: 'Por favor, ingrese cantidad de meses',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
    return "Por favor, ingrese cantidad de meses";
  }

  if (monthsSelected <= 0) {
    Swal.fire({
      title: 'Datos incorrectos',
      text: 'Por favor, ingrese cantidad de meses mayor a 0',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
    return "Por favor, ingrese cantidad de meses mayor a 0";
  }

  let dataSelected = data.find(country => country.country.toLowerCase() === countrySelected.toLowerCase());

  const { monthlyCost, currency } = dataSelected;

  let result = monthlyCost * monthsSelected; // Calcula el total
  result = Intl.NumberFormat('en-US').format(result); // Agrega el separador de miles al número
  result = `${result} ${currency}`; // Agrega el símbolo de la moneda al resultado

  return result;
};

// Obtener conversión de monedas desde una API externa
let convertCurrency = {};
const getConversionCurrency = async () => {
  const response = await fetch('https://api.freecurrencyapi.com/v1/latest?apikey=MyCZlH7MtOEdO2WDqkU54qdHAknPPRRukNEemjRp');
  convertCurrency = await response.json();
}
getConversionCurrency();

// Convertir el resultado a USD - uso de API externa para conversión en tiempo real
function convertToUSD(totalResult) {
  // Obtener el número del resultado
  let spaceIndex = Array.from(totalResult).indexOf(" ");
  let resultNumber = Array.from(totalResult).slice(0, spaceIndex).join('');

  // Eliminar la coma del número
  resultNumber = Array.from(resultNumber).filter(item => item !== ",").join('');

  // Obtener la moneda local que se quiere convertir a USD
  let currentCurrency = data.find(element => element.country.toLowerCase() === (localStorage.getItem("country"))).currencyData;

  // Obtener la relación entre la moneda y el USD
  let convertRatio = convertCurrency.data[currentCurrency];

  let convertedResult = (Number(resultNumber) / convertRatio).toFixed(0);
  convertedResult = Intl.NumberFormat('en-US').format(convertedResult); // Agrega el separador de miles al número

  return convertedResult;
}
