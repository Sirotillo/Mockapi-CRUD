import { memo } from 'react';
import ProductView from '../../components/product-view/ProductView';
import { useFetch } from '../../hooks/useFetch';
import type { IResponse } from '../../types';

const Home = () => {
  const {data, loading} = useFetch<IResponse>("/products", {limit: 10, skip: 0})
  return (
    <div className="">
      {loading && <p className='text-center'>Loading...</p>}
      <ProductView data={data?.products} title='New products'/>
    </div>
  );
};

export default memo(Home);