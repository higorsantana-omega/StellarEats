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

export type Gastronomy = 'Brasileira' | 'Árabe' | 'Japonesa' | 'Frutos do mar' | 'Mexicana' | 'Chinesa' | 'Tailandesa'

export type FilterRestaurantsQuery = {
  city?: string
  gastronomy?: Gastronomy
}

type Restaurant = {
  restaurantID: string
  ownerID: string

  name: string
  gastronomy: Gastronomy
  menu: Item[]

  address: Address
  phone: string
}

export default Restaurant
