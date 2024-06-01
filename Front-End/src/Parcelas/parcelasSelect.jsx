import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import calcularParcelas from './calculoParcelas';

const ParcelamentoSelect = ({ valor }) => {

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const parcelas = calcularParcelas(valor);
    setOptions(parcelas);
  }, [valor]);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Select
    defaultValue="Escolha quantas parcelas"
    style={{ width: '600px'}}
    onChange={handleChange}
    options={options}
  />
  );
};

ParcelamentoSelect.propTypes = {
  valor: PropTypes.number.isRequired // Espera-se que a prop 'valor' seja um número e seja obrigatória
};

export default ParcelamentoSelect;
