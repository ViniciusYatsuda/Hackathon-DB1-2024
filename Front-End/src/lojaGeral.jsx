import './css/lojaGeral.css'
import { Button } from 'antd';
import { Input } from 'antd';
import {Switch} from 'antd';
import { Carousel } from 'antd';
import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

const contentStyle = {
  height: '200px',
  color: '#fff',
  lineHeight: '200px',
  textAlign: 'center',
  background: '#364d79',
};

const products = [
  {
    id: 1,
    name: 'Tênis Nike',
    description: 'Confortável e estiloso.',
    image: 'https://link-para-imagem-do-produto.com/tenis-nike.jpg',
  },
  {
    id: 2,
    name: 'Tênis Adidas',
    description: 'Design moderno e elegante.',
    image: 'https://link-para-imagem-do-produto.com/tenis-adidas.jpg',
  },
  {
    id: 3,
    name: 'Tênis Puma',
    description: 'Leve e confortável.',
    image: 'https://link-para-imagem-do-produto.com/tenis-puma.jpg',
  },
  {
    id: 4,
    name: 'Tênis Reebok',
    description: 'Ideal para corridas.',
    image: 'https://link-para-imagem-do-produto.com/tenis-reebok.jpg',
  },
  {
    id: 5,
    name: 'Tênis Asics',
    description: 'Alta performance e durabilidade.',
    image: 'https://link-para-imagem-do-produto.com/tenis-asics.jpg',
  },
  {
    id: 6,
    name: 'Tênis Mizuno',
    description: 'Conforto e estabilidade.',
    image: 'https://link-para-imagem-do-produto.com/tenis-mizuno.jpg',
  },
  {
    id: 7,
    name: 'Tênis New Balance',
    description: 'Estilo clássico e conforto.',
    image: 'https://link-para-imagem-do-produto.com/tenis-new-balance.jpg',
  },
  {
    id: 8,
    name: 'Tênis Under Armour',
    description: 'Tecnologia avançada para desempenho.',
    image: 'https://link-para-imagem-do-produto.com/tenis-under-armour.jpg',
  },
  {
    id: 9,
    name: 'Tênis Skechers',
    description: 'Conforto e estilo para o dia a dia.',
    image: 'https://link-para-imagem-do-produto.com/tenis-skechers.jpg',
  },
  {
    id: 10,
    name: 'Tênis Fila',
    description: 'Design moderno e esportivo.',
    image: 'https://link-para-imagem-do-produto.com/tenis-fila.jpg',
  },
  {
    id: 11,
    name: 'Tênis Oakley',
    description: 'Resistência e durabilidade.',
    image: 'https://link-para-imagem-do-produto.com/tenis-oakley.jpg',
  },
  {
    id: 12,
    name: 'Tênis Converse',
    description: 'Clássico e versátil.',
    image: 'https://link-para-imagem-do-produto.com/tenis-converse.jpg',
  },
  {
    id: 13,
    name: 'Tênis Vans',
    description: 'Estilo skatista e conforto.',
    image: 'https://link-para-imagem-do-produto.com/tenis-vans.jpg',
  },
  {
    id: 14,
    name: 'Tênis Hoka One One',
    description: 'Ideal para longas distâncias.',
    image: 'https://link-para-imagem-do-produto.com/tenis-hoka-one-one.jpg',
  },
  {
    id: 15,
    name: 'Tênis Brooks',
    description: 'Alta performance para corredores.',
    image: 'https://link-para-imagem-do-produto.com/tenis-brooks.jpg',
  },
  {
    id: 16,
    name: 'Tênis Salomon',
    description: 'Ideal para trilhas e aventuras.',
    image: 'https://link-para-imagem-do-produto.com/tenis-salomon.jpg',
  },
  {
    id: 17,
    name: 'Tênis Saucony',
    description: 'Estabilidade e conforto.',
    image: 'https://link-para-imagem-do-produto.com/tenis-saucony.jpg',
  },
  {
    id: 18,
    name: 'Tênis Merrell',
    description: 'Durabilidade e conforto para trilhas.',
    image: 'https://link-para-imagem-do-produto.com/tenis-merrell.jpg',
  },
  {
    id: 19,
    name: 'Tênis Altra',
    description: 'Design inovador e conforto.',
    image: 'https://link-para-imagem-do-produto.com/tenis-altra.jpg',
  },
  {
    id: 20,
    name: 'Tênis La Sportiva',
    description: 'Ideal para atividades ao ar livre.',
    image: 'https://link-para-imagem-do-produto.com/tenis-la-sportiva.jpg',
  }
];

const { Meta } = Card;

function About() {
  return (
    <div className="slide-up">
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
        <div  className='titulo-lancamento'>
          LANÇAMENTOS
        </div>
        <Carousel arrows infinite={false}>
          <div>
            <h3 style={contentStyle}>1</h3>
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
                {products.map(product => (
                  <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                    <Card
                        hoverable
                        cover={<img alt={product.name} src={product.image} />}
                      >
                      <Meta title={product.name} description={product.description} />
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
      </body>
    </div>
  );
}

export default About;