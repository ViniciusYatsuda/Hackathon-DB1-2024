import { Card, Col, Row, Input, Image, Button, Typography, Pagination } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NetXoes from "../img/NetXoes.png";
import { SearchOutlined, HeartOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const { Meta } = Card;
const { Text } = Typography;

function Search() {
  const [Product, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4); // Set initial page size to 4
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
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

  const handleActionClick = (id) => {
    let favoritos = JSON.parse(localStorage.getItem('Favoritos')) || [];
    if (favoritos.includes(id)) {
      favoritos = favoritos.filter(favoritoId => favoritoId !== id);
    } else {
      favoritos.push(id);
    }
    localStorage.setItem('Favoritos', JSON.stringify(favoritos));
  };

  const renderMessage = () => {
    if (!searchAttempted) {
      return <Text>Explore nossa loja</Text>;
    } else if (Product.length === 0) {
      return <Text>Nenhum produto encontrado</Text>;
    }
    return null;
  };

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#3d3d3d', padding: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image src={NetXoes} preview={false} height={'100px'} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input onChange={handleInputChange} value={searchValue} placeholder="Pesquisar..." style={{ marginRight: '10px', width: '100%' }} />
          <Button onClick={handleSearchClick} icon={<SearchOutlined />}>Search</Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/Fav">
            <Button type="default" style={{ marginRight: '10px' }}>Favoritos</Button>
          </Link>
          <Button type="default" style={{ marginRight: '10px' }}>Loja</Button>
        </div>
      </header>
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
                    cover={<img alt={product.img} src={product.img} />}
                    actions={[
                      <HeartOutlined onClick={() => handleActionClick(product.id)} key="setting" />,
                    ]}
                  >
                    <Meta title={product.produto} description={product.price} />
                  </Card>
                </Col>
              ))}
            </Row>
            <Pagination
              current={page}
              pageSize={pageSize}
              total={totalItems}
              onChange={handlePageChange}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Search;
