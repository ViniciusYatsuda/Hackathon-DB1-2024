
import { Card, Col, Row, Select } from 'antd';
import { useState,useEffect } from 'react';
import axios from 'axios'
import { Button } from 'antd';
import {Input, Image} from 'antd';
import NetXoes from "../img/NetXoes.png";
import { SearchOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const { Meta } = Card;
const { Option } = Select;

function Fav() {
  const [Product, setProduct] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ query: '(max-width: 800px)' });

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    console.log('Valor do input:', searchValue);
    setShouldFetch(true);
    navigate(`/busca?search=${searchValue}`);
  };
  
useEffect(() => {
    const fetchData = async () => {
      try {
        let favoritos = JSON.parse(localStorage.getItem('Favoritos')) || [];
        favoritos = favoritos.map(favoritoId => Number(favoritoId));
        const response = await axios.get(`http://localhost:3000/produtos/favoritos?idsProduto=${favoritos}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Erro ao buscar itens do carrossel:', error);
      }
    };
    fetchData();
}, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/produtos/`, {
        params: { search: searchValue }
      });
      setProduct(response.data);
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
    } finally {
      setShouldFetch(false);
    }
  };
  if (shouldFetch) {
    fetchData();
  }
}, [shouldFetch, searchValue]);

const handleChange = (value) => {
  console.log('Selected:', value);
}
  
  
  return (
    <>
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
      <div  style={{ padding: '30px' }}>
      <Row gutter={[16, 16]}>
                {Product.map(product => (
                  <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                    <Link to={`/produto/${product.id}`}>
                    </Link>
                      <Card
                          cover={<img alt={product.img} src={product.img} />}
                          actions={[
                          ]}
                        >
                        <Meta title={product.produto} description={product.price} />
                      </Card>
                  </Col>
                ))}
              </Row>
      </div>
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
    </>
  )
}

export default Fav
