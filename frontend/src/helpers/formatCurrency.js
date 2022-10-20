export const formatCurrency = (numero) => {
  const options = { style: "currency", currency: "ARS" };
  const numberFormat = new Intl.NumberFormat("es-AR", options);
  return numberFormat.format(numero);
};
