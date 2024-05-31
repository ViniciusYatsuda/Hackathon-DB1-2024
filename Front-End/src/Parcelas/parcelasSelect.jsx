import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Importe PropTypes para fazer a validação das props
import { Select } from 'antd';
import calcularParcelas from './calculoParcelas'; // Certifique-se de que este caminho está correto

const ParcelamentoSelect = ({ valor }) => {
  // Define o estado das opções
  const [options, setOptions] = useState([]);

  // Usa o useEffect para calcular e definir as opções de parcelamento quando o valor mudar
  useEffect(() => {
    const parcelas = calcularParcelas(valor);
    setOptions(parcelas);
  }, [valor]);

  // Função para lidar com mudanças na seleção
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  // Renderiza o componente Select com as opções calculadas
  return (
    <Select
      defaultValue={options.length > 0 ? options[0].value : null}
      style={{ width: 600 }}
      onChange={handleChange}
      options={options}
    />
  );
};

// Defina a validação das propriedades (props validation) usando PropTypes
ParcelamentoSelect.propTypes = {
  valor: PropTypes.number.isRequired // Espera-se que a prop 'valor' seja um número e seja obrigatória
};

export default ParcelamentoSelect;
