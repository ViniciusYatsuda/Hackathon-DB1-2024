
import { Card, Col, Row } from 'antd';
import { useState,useEffect } from 'react';
import axios from 'axios'
import { Button } from 'antd';
import {Input, Image} from 'antd';
import NetXoes from "../img/NetXoes.png";
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;

function Search() {
  const [Product, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    console.log('Valor do input:', searchValue);
    setShouldFetch(true); // Define shouldFetch como true para disparar o useEffect
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/`, {
          params: { search: searchValue } // Passa o valor da busca como parâmetro
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar itens:', error);
      } finally {
        setShouldFetch(false); // Define shouldFetch como false para evitar novas buscas
      }
    };
    
    if (shouldFetch) {
      fetchData();
    }
  }, [shouldFetch, searchValue]);


  return (
    <>
       <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#3d3d3d', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image src={NetXoes}  preview={false} height={'100px'}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'space-center' }}>
              <Input onChange={handleInputChange} value={searchValue} placeholder="Pesquisar..." style={{ marginRight: '10px', width: '100%' }} />
              <Button onClick={handleSearchClick} icon={<SearchOutlined />}>Search</Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button type="default" style={{ marginRight: '10px' }}>Favoritos</Button>
              <Link to="/teste">
                <Button type="default" style={{ marginRight: '10px' }}>Loja</Button>
              </Link>
              <Button type="default">AA</Button>
            </div>
      </header>
      <div  style={{ padding: '30px' }}>
      <Row gutter={[16, 16]}>
                {Product.map(product => (
                  <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
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
    </>
  )
}

export default Search
