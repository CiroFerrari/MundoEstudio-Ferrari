/**
 * Declaración de funciones
 */

// Calcular resultado
function calcResult() {
  let countrySelected = localStorage.getItem("country");
  let monthsSelected = localStorage.getItem("month");
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
