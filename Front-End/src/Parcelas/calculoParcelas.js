export default function calcularParcelas(valor) {

  if (valor < 10) {
    return [];
  }

  let maxParcelas = Math.floor(valor / 10);

  if (maxParcelas > 12) {
    maxParcelas = 12;
  }

  const parcelas = [];
for (let i = 1; i <= maxParcelas; i++) {
  if (i === 1) {
    parcelas.push({ value: i, label: `Em ${i}x de R$ ${Math.round(valor / i)}` });
  } else {
    parcelas.push({ value: i, label: `Em ${i}x de R$ ${Math.round(((valor * Math.pow((1 + 0.0199), i) / i))*100)/100}` });
  }
}

return parcelas;

}
