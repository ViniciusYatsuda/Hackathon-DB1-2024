import './css/lojaGeral.css'
import { Button } from 'antd';
import {Input} from 'antd';
import { Carousel, Image } from 'antd';
import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useState,useEffect } from 'react';
import {ShoppingCartOutlined , HeartOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import NetXoes from "../img/NetXoes.png"

const contentStyle = {
  height: '100%',
};

const { Meta } = Card;

function About() {
  
  const handleActionClick = (id) => {
    // Recupera a lista de favoritos do localStorage
    let favoritos = JSON.parse(localStorage.getItem('Favoritos')) || [];
  
    // Verifica se o ID já está na lista
    if (favoritos.includes(id)) {
      // Se o ID já está na lista, remove-o
      favoritos = favoritos.filter(favoritoId => favoritoId !== id);
    } else {
      // Se o ID não está na lista, adiciona-o
      favoritos.push(id);
    }
  
    // Atualiza o localStorage com a nova lista de favoritos
    localStorage.setItem('Favoritos', JSON.stringify(favoritos));
  
    console.log('Favoritos atualizados:', favoritos);
  };

  const [Product, setProduct] = useState([]);
  
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/users/home');
          setProduct(response.data);
        } catch (error) {
          console.error('Erro ao buscar itens do carrossel:', error);
        }
      };
      fetchData();
  }, []);
  
  return (
    
     <>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#3d3d3d', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image src={NetXoes}  preview={false} height={'100px'}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'space-center' }}>
              <Input placeholder="Pesquisar..." style={{ marginRight: '10px', width: '100%' }} />
              <Button icon={<SearchOutlined />}>Search</Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button type="default" style={{ marginRight: '10px' }}>Favoritos</Button>
              <Link to="/teste">
                <Button type="default" style={{ marginRight: '10px' }}>Loja</Button>
              </Link>
              <Button type="default">AA</Button>
            </div>
      </header>
      <body> 
        <div className="slide-up">
        <div  className='titulo-lancamento'>
          LANÇAMENTOS
        </div>
        <Carousel arrows infinite={false}>
          <div>
            <h3 style={contentStyle}><Image preview={false} src='https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_1920,w_1920/br_horizontal_ss24_dia_dos_namorados_mh_hp_large_d_a5a0faa0a7.jpg' /></h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
        <div>
          <div>
            <h2>TENIS</h2>
            <div style={{ padding: '30px' }}>
              <Row gutter={[16, 16]}>
                {Product.map(product => (
                  <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                      <Card
                          actions={[ 
                            <HeartOutlined onClick={() => handleActionClick(product.id)} key="setting" />,
                            <ShoppingCartOutlined  key="edit" />,
                          ]}>
                        <Link to={`/produto/${product.id}`}>
                          <Image src={product.img}></Image>
                        </Link>
                        <Meta title={product.produto} description={product.price} />
                      </Card>
                  </Col>
                ))}
              </Row>
            </div>
        </div>
        <div>
          2
        </div>
      </div>
      </div>
      </body>
    </>
  );
}

export default About;