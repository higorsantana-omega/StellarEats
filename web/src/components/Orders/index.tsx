import OrdersBoard from "../OrdersBoard";
import { Container } from "./styles";

export default function Orders () {
  return (
    <Container>
      <OrdersBoard
        title="Fila de espera"
        quantity={1}
      />

      <OrdersBoard
        title="Em preparo"
        quantity={1}
      />

      <OrdersBoard
        title="Pronto"
        quantity={1}
      />
    </Container>
  )
}
