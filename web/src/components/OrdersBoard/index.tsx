import { Order } from "../../types/Order";
import { Board, OrdersContainer } from "./styles";

export type OrdersBoardProps = {
  title: string
  quantity: number

  orders?: Order[]
}

export default function OrdersBoard (props: OrdersBoardProps) {
  return (
    <Board>
      <header>
        <strong>{props.title}</strong>
        <span>({props.quantity})</span>
      </header>

      <OrdersContainer>
        <button type='button'>
          <strong>Mesa 1</strong>
          <span>2 itens</span>
        </button>
        <button type='button'>
          <strong>Mesa 1</strong>
          <span>2 itens</span>
        </button>
      </OrdersContainer>
    </Board>
  )
}
