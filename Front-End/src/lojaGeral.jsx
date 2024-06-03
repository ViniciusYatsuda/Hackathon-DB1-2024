import './css/lojaGeral.css';
import { Button, Input, Carousel, Image, Card, Col, Row, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ShoppingCartOutlined, HeartOutlined, SearchOutlined, HeartTwoTone } from '@ant-design/icons';
import NetXoes from "../img/NetXoes.png";
import { useMediaQuery } from 'react-responsive';

const { Meta } = Card;
const { Option } = Select;

const contentStyle = {
  height: '100%',
};

function About() {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [activeSearch] = useState('');
  var [favoritos, setFavoritos] = useState([]);
  const isSmallScreen = useMediaQuery({ query: '(max-width: 800px)' });

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
    if (!searchValue.trim()) {
      return;
    }
    console.log('Valor do input:', searchValue);
    navigate(`/busca?search=${searchValue}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFavoritos(JSON.parse(localStorage.getItem('Favoritos')) || [])
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        <HeartTwoTone  twoToneColor='red' onClick={() => handleActionClick(product.id)} key="heart" />
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
  );
}

export default About;
