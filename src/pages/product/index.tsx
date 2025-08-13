import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import type { IProduct } from '../../types'

const ProductDetail = () => {
  const {id} = useParams()
  const {data} = useFetch<IProduct>(`/products/${id}`)
  return (
    <div className='grid grid-cols-2 container mx-auto'>
      <div>
        <img src={data?.thumbnail} alt="" />
      </div>
      <div>
        <h1>{data?.title}</h1>
      </div>
    </div>
  )
}

export default React.memo(ProductDetail)