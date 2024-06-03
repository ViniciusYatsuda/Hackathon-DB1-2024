import './css/lojaGeral.css';
import { Button, Input, Carousel, Image, Card, Col, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ShoppingCartOutlined, HeartOutlined, SearchOutlined,HeartFilled } from '@ant-design/icons';
import NetXoes from "../img/NetXoes.png";

const { Meta } = Card;

const contentStyle = {
  height: '100%',
};

function About() {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [activeSearch] = useState('');
  var [favoritos, setFavoritos] = useState([]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const limitArray = (array, limit) => {
    return array.slice(0, limit);
  };

  const handleActionClick = (id) => {
    let updatedFavoritos;
    if (favoritos.includes(id)) {
      updatedFavoritos = favoritos.filter(favoritoId => favoritoId !== id);
    } else {
      updatedFavoritos = [...favoritos, id];
    }
    setFavoritos(updatedFavoritos);
    localStorage.setItem('Favoritos', JSON.stringify(updatedFavoritos));
};

  const navigate = useNavigate();

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
        setFavoritos(JSON.parse(localStorage.getItem('Favoritos')) || [])
        setFavoritos = favoritos.map(favoritoId => Number(favoritoId))
        console.log(favoritos)
        const response = await axios.get('http://localhost:3000/produtos/home');
        const shuffledProducts = shuffleArray(response.data);
        const limitedProducts = limitArray(shuffledProducts, 8);
        setProducts(limitedProducts);
      } catch (error) {
        console.error('Erro ao buscar itens do carrossel:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#3d3d3d', padding: '10px 0px 10px 50px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image src={NetXoes} preview={false} height={'100px'} />
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
      <div className="slide-up">
          <>
            <div className="titulo-lancamento">
              LANÇAMENTOS
            </div>
            <Carousel arrows infinite={false}>
              <div>
                <h3 style={contentStyle}>
                  <Image preview={false} src='https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_1920,w_1920/br_horizontal_ss24_dia_dos_namorados_mh_hp_large_d_a5a0faa0a7.jpg' />
                </h3>
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
          </>
        <div>
          <h2 className="titulo-lancamento">{activeSearch === '' ? 'EM DESTAQUE' : activeSearch}</h2>
          <div style={{ padding: '20px' }}>
            <Row gutter={[16, 16]}>
              {products.map(product => (
                <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    actions={[
                      favoritos.includes(product.id) ? (
                        <HeartFilled onClick={() => handleActionClick(product.id)} key="heart" />
                      ) : (
                        <HeartOutlined onClick={() => handleActionClick(product.id)} key="heart" />
                      ),
                      <ShoppingCartOutlined key="cart" />,
                    ]}
                  >
                    <Link to={`/produto/${product.id}`}>
                      <Image src={product.img} />
                    </Link>
                    <Meta title={product.produto} description={product.price} style={{padding: '10px'}} />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;

