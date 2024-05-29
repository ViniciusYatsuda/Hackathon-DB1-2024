import { Input, Button, Switch } from "antd"; 
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'antd';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import { useState,useEffect } from "react";
import  axios from "axios";


const { Meta } = Card;


function Item() {
    const productId = location.pathname.split('/').pop(); // Extrai o ID do produto da URL
  
    const [product, setProduct] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/users/${productId}`);
          setProduct(response.data);
        } catch (error) {
          console.error('Erro ao buscar o produto:', error);
        }
      };
      fetchData();
    }, [productId]); // Adicione productId como dependência para que useEffect seja chamado sempre que ele mudar
  
    return (
      <div>
        <header>
          <div className="search-bar">
            <Input type="text" placeholder="Pesquisar..." />
            <Button>Pesquisar</Button>
          </div>
          <div className="header-buttons">
            <Button>Favoritos</Button>
            <Link to='/teste'><Button>Loja</Button></Link>
            <Switch>AA</Switch>
          </div>
        </header>
        <body>
          <div style={{ padding: '12px' }}>
            <Row gutter={[16, 16]}>
              <Col span={16}>
                <div style={{ height: '12rem', borderStyle: 'solid', borderRadius: '5px', backgroundColor: 'red' }}></div>
              </Col>
              <Col span={8}>
                <div style={{ height: '12rem', borderStyle: 'solid', borderRadius: '5px', backgroundColor: 'gray' }}>
                  {/* Verifica se há um produto carregado antes de tentar acessar suas propriedades */}
                  {product && (
                    <Card
                      cover={<img alt={product.img} src={product.img} />}
                      actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                      ]}
                    >
                      <Meta title={product.produto} description={product.price} />
                    </Card>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </body>
      </div>
    );
  }
  
  export default Item;