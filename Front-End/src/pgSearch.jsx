import { Card, Col, Row, Input, Image, Button, Typography, Pagination, Select } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NetXoes from "../img/NetXoes.png";
import { ShoppingCartOutlined, HeartOutlined, SearchOutlined, HeartTwoTone } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const { Meta } = Card;
const { Text } = Typography;
const { Option } = Select;

function Search() {
  const [Product, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4); // Set initial page size to 4
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  var [favoritos, setFavoritos] = useState([]);
  const isSmallScreen = useMediaQuery({ query: '(max-width: 800px)' });

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
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

  const handleSearchClick = () => {
    setPage(1); // Reset page number on new search
    setSearchAttempted(true);
    navigate(`/busca?search=${searchValue}`);
  };

  const handlePageChange = (newPage, newPageSize) => {
    setPage(newPage);
    setPageSize(newPageSize);
    setSearchAttempted(true);
    navigate(`/busca?search=${searchValue}&page=${newPage}&pageSize=${newPageSize}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search') || '';
    const pageQuery = parseInt(params.get('page')) || 1;
    const pageSizeQuery = parseInt(params.get('pageSize')) || 4; // Default page size is 4

    setSearchValue(searchQuery);
    setPage(pageQuery);
    setPageSize(pageSizeQuery);

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/produtos/`, {
          params: {
            search: searchQuery,
            page: pageQuery,
            pageSize: pageSizeQuery
          }
        });
        setProducts(response.data.data);
        setTotalItems(response.data.totalItems); 
      } catch (error) {
        console.error('Erro ao buscar itens:', error);
      }
    };

    fetchData();
  }, [location.search]);

  const renderMessage = () => {
    if (!searchAttempted) {
      return <Text>Explore nossa loja</Text>;
    } else if (Product.length === 0) {
      return <Text>Nenhum produto encontrado</Text>;
    }
    return null;
  };

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
      <div style={{ padding: '30px' }}>
        {Product.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px' }}>
            {renderMessage()}
          </div>
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {Product.map(product => (
                <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    actions={[
                      favoritos.includes(product.id) ? (
                        <HeartTwoTone  twoToneColor='red' onClick={() => handleActionClick(product.id)} key="heart" />
                      ) : (
                        <HeartOutlined onClick={() => handleActionClick(product.id)} key="heart" />
                      ),
                      <ShoppingCartOutlined key="cart" />,
                    ]}>
                    <Link to={`/produto/${product.id}`}>
                      <Image src={product.img} />
                    </Link>
                    <Meta title={product.produto} description={product.price} style={{padding: '10px'}} />
                  </Card>
                </Col>
              ))}
            </Row>
            <Pagination
              current={page}
              pageSize={pageSize}
              total={totalItems}
              onChange={handlePageChange}
              style={{padding:'20px 0 10px 0'}}
            />
          </>
        )}
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

export default Search;
