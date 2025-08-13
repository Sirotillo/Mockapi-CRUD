export interface IProduct {
  id: number
  title:string
  price: number
  thumbnail:string
}

export interface IResponse {
  products: IProduct[],
  limit: number,
  total: number,
  skip:number
}