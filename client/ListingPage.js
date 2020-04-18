import React, { useEffect, useState, Fragment, useRef, useCallback } from 'react';
import styles from './ListingPage.module.scss';
import Navbar from './components/navbar';
import Searchbar from './components/searchbar';
import ProductCard from './components/productcard';
import useProductQuery from './api/products';

function App() {
  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const { loading, hasMore, products, error } = useProductQuery(query, pageNumber);
  console.log('products', products);

  const observer = useRef();
  const lastProductElementRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearch = e => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <Searchbar placeholder='Search' onChange={handleSearch} />
      <div className={styles.grid}>
        {products.map((p, index) => {
          if (products.length === index + 1) {
            return <ProductCard {...p} key={p.id} ref={lastProductElementRef} />;
          } else {
            return <ProductCard {...p} key={p.id} />;
          }
        })}
        {loading && <div>Loading ...</div>}
        {error && <div>Error</div>}
      </div>
      <span className={styles.scrollTop}>
        <span className={styles.scrollTopIcon}></span>
      </span>
    </div>
  );
}

export default App;
