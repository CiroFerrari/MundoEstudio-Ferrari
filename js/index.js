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
