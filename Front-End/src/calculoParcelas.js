// function calcularParcelas(valor) {
//     // Verifica se o valor é suficiente para ser parcelado
//     if (valor < 10) {
//       return "O valor é muito baixo para ser parcelado.";
//     }
  
//     // Calcula o número máximo de parcelas possíveis
//     let maxParcelas = Math.floor(valor / 10);
  
//     // Limita o número de parcelas ao máximo permitido (12)
//     if (maxParcelas > 12) {
//       maxParcelas = 12;
//     }
  
//     return `O valor pode ser parcelado em até ${maxParcelas} parcelas de ${valor/maxParcelas}.`;
//   }
  
//   // Exemplos de uso:
//   console.log(calcularParcelas(50)); // "O valor pode ser parcelado em até 5 parcelas."
//   console.log(calcularParcelas(150)); // "O valor pode ser parcelado em até 12 parcelas."
//   console.log(calcularParcelas(20)); // "O valor é muito baixo para ser parcelado."

 // parcelas.js
export default function calcularParcelas(valor) {
  // Verifica se o valor é suficiente para ser parcelado
  if (valor < 10) {
    return [];
  }

  // Calcula o número máximo de parcelas possíveis
  let maxParcelas = Math.floor(valor / 10);

  // Limita o número de parcelas ao máximo permitido (12)
  if (maxParcelas > 12) {
    maxParcelas = 12;
  }

  // Cria um array com o número de parcelas possíveis
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
