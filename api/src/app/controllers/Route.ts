import { Interactors } from '@/interactors'
import { BaseController } from './BaseController'

export default interface Route {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  Controller: new (interactors: Interactors) => BaseController
}
