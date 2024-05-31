import { Input, Button, Switch } from "antd"; 
import { Link } from 'react-router-dom';
import { Typography, Image, Col, Row } from 'antd';
import { useState, useEffect } from "react";
import axios from "axios";
import ParcelamentoSelect from './Parcelas/parcelasSelect'

function Item() {
  const productId = location.pathname.split('/').pop(); // Extrai o ID do produto da URL
  // const handleChange = (value) => {
  //   console.log(`selected ${value}`);
  // };
  const { Title } = Typography;
  
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
        <div style={{ padding: '20px 12px'}}>
          {product && (
            <Row gutter={[16, 16]}>
              <Col span={16}>
                <div style={{ height: '100%', borderStyle: 'solid', borderRadius: '10rem', backgroundColor: 'lightpink', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Title style={{margin:'0',fontSize:'40px'}}>R$ {product.price},00</Title>
                  <div>
                    <Title level={2} style={{padding:'20px'}}>Selecione o parcelamento</Title>
                    <ParcelamentoSelect valor={product.price} />
                  </div>
                </div>
              </Col>
              <Col span={8} >
                <div style={{borderRadius:'10rem', backgroundColor:'pink',display: 'flex', justifyContent: 'center'}}>
                    <Image
                      preview={false}
                      style={{borderRadius:'10rem', height: '100%', padding:'25px 0'}}
                      src={product.img} // Passa o valor de product.img para o src da tag Image
                    />
                </div>
                {/* <div>
                  <h2 style={{fontSize:'20px',background:'white',textAlign:'center',borderBottomLeftRadius:'2rem',borderBottomRightRadius:'2rem',height:'20%', padding:'10px'}}>
                    {product.produto}
                  </h2>
                </div> */}
              </Col>
            </Row>
          )}
        </div>
      </body>
    </div>
  );
}

export default Item;
