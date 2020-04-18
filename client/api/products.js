import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useProductSearch(query, pageNumber) {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setProducts([]);
  }, [query])

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: 'GET',
      url: 'api/products/getProduct',
      params: { query, pageNumber },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then((res) => {
      setProducts(prevProducts => [...prevProducts, ...res.data.data]);
      setHasMore(res.data.data.length > 0)
      setLoading(false);
    }).catch((err) => {
      if (axios.isCancel(err)) return
      setError(true);
    });
    return () => cancel()
  }, [query, pageNumber]);

  return { loading, products, error, hasMore };
}