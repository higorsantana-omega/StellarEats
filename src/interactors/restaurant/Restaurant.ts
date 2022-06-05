export type Item = {
  itemID: string
  name: string
  description: string
  price: string
  type: 'FOOD' | 'DRINK'
}

export type Address = {
  postcode: string
  street: string
  number: string
  complement: string
  district: string
  city: string
  state: string
}

type Gastronomy = 'Brasileira' | 'Árabe' | 'Japonesa' | 'Frutos do mar' | 'Mexicana' | 'Chinesa' | 'Tailandesa'

type Restaurant = {
  restaurantID: string

  name: string
  gastronomy: Gastronomy
  menu: Item[]

  address: Address
  phone: string
}

export default Restaurant
