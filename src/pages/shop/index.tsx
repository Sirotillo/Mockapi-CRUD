import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { api } from '../../api'
import ProductView from '../../components/product-view/ProductView'

const Shop = () => {
  const {data, isLoading, error, isError} = useQuery({
    queryKey: ["recipe"],
    queryFn: () => api.get("products", {params:{limit:10}}).then(res => res.data)
  })

  if(isError){
    return <p>{error.message}</p>
  }

  return (
    <div>
      <h2>Shop</h2>
      {isLoading && <p className='text-center'>Loading...</p>}
      <ProductView data={data?.products} title='Shop'/>
    </div>
  )
}

export default React.memo(Shop)