
import { Select, Typography } from 'antd';
import PropTypes from 'prop-types';

const { Title } = Typography;

const { Option } = Select;

const Tamanho = ({ id }) => {
  const handleChange = (value) => {
    console.log('Selected:', value);
  };
  console.log(id)

  const getOptions = (id) => {
    switch (id) {
      case 1:
        return (
            <div>
            <Title level={2} style={{padding:'20px',fontFamily: "Roboto",fontWeight: '300',fontStyle: 'italic'}}>Selecione o tamanho</Title> 
            <Select
                defaultValue="Escolha o tamanho"
                style={{ width: 120 }}
                onChange={handleChange}
                >
                <Option value="33">33</Option>
                <Option value="34">34</Option>
                <Option value="35">35</Option>
                <Option value="36">36</Option>
                <Option value="37">37</Option>
                <Option value="38">38</Option>
                <Option value="39">39</Option>
                <Option value="40">40</Option>
                <Option value="41">41</Option>
                <Option value="42">42</Option>
                <Option value="43">43</Option>
                <Option value="44">44</Option>
                <Option value="45">45</Option>
            </Select>
            </div>
        );
        case 2:
        return (
            <div>
            <Title level={2} style={{padding:'20px',fontFamily: "Roboto",fontWeight: '300',fontStyle: 'italic'}}>Selecione o tamanho</Title> 
            <Select
                defaultValue="33"
                style={{ width: 120 }}
                onChange={handleChange}
                >
                <Option value="33">PP</Option>
                <Option value="34">P</Option>
                <Option value="35">M</Option>
                <Option value="36">G</Option>
                <Option value="36">GG</Option>
            </Select>
            </div>
        );
      // Adicione mais cases conforme necessário para outras categorias
      default:
        return null; // Retorna null se não houver opções correspondentes
    }
  };

  return getOptions(id);
};

Tamanho.propTypes = {
  id: PropTypes.number.isRequired
};

export default Tamanho;
