import { Input, Button } from "antd"; 
import { Link } from 'react-router-dom';
import { Typography, Image, Col, Row } from 'antd';
import { useState, useEffect } from "react";
import axios from "axios";
import ParcelamentoSelect from './Parcelas/parcelasSelect'
import NetXoes from "../img/NetXoes.png"
import { SearchOutlined } from '@ant-design/icons';
import './css/lojaGeral.css';
import Tamanho from "./Tamanho/tamanho";

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
        const response = await axios.get(`http://localhost:3000/produtos/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Erro ao buscar o produto:', error);
      }
    };
    fetchData();
  }, [productId]); // Adicione productId como dependência para que useEffect seja chamado sempre que ele mudar

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#3d3d3d', padding: '10px 50px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image src={NetXoes}  preview={false} height={'100px'}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'space-center' }}>
              <Input placeholder="Pesquisar..." style={{ marginRight: '10px', width: '100%' }} />
              <Button icon={<SearchOutlined />}>Search</Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button type="default" style={{ marginRight: '10px' }}>Loja</Button>
              <Link to="/teste">
                <Button type="default" style={{ marginRight: '10px' }}>Favoritos</Button>
              </Link>
            </div>
      </header>
      <body>
        <div style={{ padding: '20px 12px'}}>
          {product && (
            <Row gutter={[16, 16]}>
              <Col span={16}>
                <div style={{ height: '100%', borderStyle: 'solid', borderRadius: '10rem', backgroundColor: 'lightpink', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Title style={{padding:'30px 0 0 0',fontSize:'40px',fontFamily: "Roboto",fontWeight: '300',fontStyle: 'normal'}}>R$ {product.price},00</Title>
                  <div>
                    <Title level={2} style={{padding:'20px',fontFamily: "Roboto",fontWeight: '300',fontStyle: 'italic'}}>Selecione o parcelamento</Title>
                    <ParcelamentoSelect valor={product.price} />
                    <Tamanho id={Number(product.categoria)} />
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
