/**
 * Declaración de funciones
 */

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
