import { Input, Button } from "antd"; 
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Image, Col, Row, Select} from 'antd';
import { useState, useEffect } from "react";
import axios from "axios";
import ParcelamentoSelect from './Parcelas/parcelasSelect'
import NetXoes from "../img/NetXoes.png"
import { SearchOutlined } from '@ant-design/icons';
import './css/lojaGeral.css';
import Tamanho from "./Tamanho/tamanho";
import { useMediaQuery } from 'react-responsive';

function Item() {
  const productId = location.pathname.split('/').pop(); 
  const { Title } = Typography;
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { Option } = Select;
  const isSmallScreen = useMediaQuery({ query: '(max-width: 800px)' });
  const isSmallScreen2 = useMediaQuery({ query: '(max-width: 1150px)' });
  
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    console.log('Valor do input:', searchValue);
    navigate(`/busca?search=${searchValue}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/produtos/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Erro ao buscar o produto:', error);
      }
    };
    fetchData();
  }, [productId]);

  const handleChange = (value) => {
    console.log('Selected:', value);
  }

  
  return (
    <div>
      {isSmallScreen ? (
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#3d3d3d', padding: '10px 0px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <Select defaultValue="home" style={{ width: '120px' }} onChange={handleChange}>
                <Option value="home">
                  <Link to="/lojaGeral">
                   <Button type='text' preview={false} height={'100px'}>Home</Button>
                  </Link>
                </Option>
                <Option value="store">
                  <Button type='text' style={{ marginRight: '10px' }}>Loja</Button>
                </Option>
                <Option value="favorites">
                  <Link to="/Fav">
                    <Button type="text">Favoritos</Button>
                  </Link>
                </Option>
              </Select>
            </div>
            <div style={{ flex: '1', padding: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Input onChange={handleInputChange} value={searchValue} placeholder="Pesquisar..." style={{ marginRight: '10px', flex: '1' }} />
                <Button onClick={handleSearchClick} icon={<SearchOutlined />} type="primary" style={{ flex: 'none' }}></Button>
              </div>
            </div>
          </header>
                    ) : (
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#3d3d3d', padding: '10px 0px 10px 50px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Link to='/lojaGeral'>
                <Image src={NetXoes} preview={false} height={'100px'} />
              </Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Input onChange={handleInputChange} value={searchValue} placeholder="Pesquisar..." style={{ marginRight: '10px', width: '100%' }} />
              <Button onClick={handleSearchClick} icon={<SearchOutlined />}></Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button type="default" style={{ marginRight: '10px' }}>Loja</Button>
              <Link to="/Fav">
                <Button type="default" style={{ marginRight: '10px' }}>Favoritos</Button>
              </Link>
            </div>
          </header>
                    )}
      <body>
        <div style={{ padding: '20px 12px'}}>
        {product && isSmallScreen2 ? (
          <Row gutter={[16, 16]}>
          <Col span={24} style={{ marginTop: '16px', display: 'flex', justifyContent: 'center'}}>
            <div style={{borderRadius:'10rem', backgroundColor:'pink',display: 'flex', justifyContent: 'center'}}>
              <Image
                preview={false}
                style={{borderRadius:'10rem', height: '100%', padding:'25px 0'}}
                src={product.img}
              />
            </div>
          </Col>
          <Col span={24}>
            <div style={{ height: '450px', borderStyle: 'solid', borderRadius: '10rem', backgroundColor: 'lightpink', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Title style={{padding:'30px 0 0 0',fontSize:'40px',fontFamily: "Roboto",fontWeight: '300',fontStyle: 'normal'}}>R$ {product.price},00</Title>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Title level={2} style={{padding:'10px 20px 0px 20px', fontFamily: "Roboto", fontWeight: '150', fontStyle: 'italic', textAlign: 'center' }}>Selecione o parcelamento</Title>
                <ParcelamentoSelect valor={product.price} style={{ width: '350px' }} />
                <Title level={2} style={{padding:'30px 20px 0px 20px', fontFamily: "Roboto", fontWeight: '150', fontStyle: 'italic', textAlign: 'center' }}>Selecione o tamanho</Title> 
                <Tamanho id={Number(product.categoria)} />
              </div>
             </div>
          </Col>
        </Row>
        
            ) : (
            product && (
              <Row gutter={[16, 16]}>
                <Col span={16}>
                  <div style={{ height: '100%', borderStyle: 'solid', borderRadius: '10rem', backgroundColor: 'pink', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Title style={{padding:'30px 0 0 0',fontSize:'40px',fontFamily: "Roboto",fontWeight: '300',fontStyle: 'normal'}}>R$ {product.price},00</Title>
                    <div>
                      <Title level={2} style={{padding:'20px',fontFamily: "Roboto",fontWeight: '300',fontStyle: 'italic'}}>Selecione o parcelamento</Title>
                      <ParcelamentoSelect valor={product.price}/>
                      <Title level={2} style={{padding:'30px 20px 0px 20px',fontFamily: "Roboto",fontWeight: '300',fontStyle: 'italic'}}>Selecione o tamanho</Title> 
                      <Tamanho id={Number(product.categoria)} />
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div style={{borderRadius:'10rem', backgroundColor:'pink',display: 'flex', justifyContent: 'center'}}>
                    <Image
                      preview={false}
                      style={{borderRadius:'10rem', height: '100%', padding:'25px 0'}}
                      src={product.img} // Passa o valor de product.img para o src da tag Image
                    />
                  </div>
                </Col>
              </Row>
            ))
            }
        </div>
      </body>
      <footer style={{ display: 'flex', justifyContent: 'space-between', padding: '60px 50px', backgroundColor: '#3d3d3d', color: '#fff' }}>
        <div className='titulo-lancamento'>
            Desenvolvido por Vinicius Yatsuda
            <br/>
            <br/>
            como projeto de Hackathon 
            <br/>
            <br/>
            para o BootCamp DB1 2024
          </div>
          <div className='titulo-lancamento'>
            NetXoes@sac.br
            <br/>
            <br/> 
            (55)+44 12345-6789
          </div>
      </footer>
    </div>
  );
}

export default Item;
