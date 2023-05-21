import logo from '../../assets/images/logo.png'

import { Container, Content } from './styles'

export default function Header () {
  return (
    <Container>
      <Content>
        <div className="page-details">
          <h1>Pedidos</h1>
          <h2>Acompanhe os pedidos</h2>
        </div>

        <img src={logo} alt="STELLAREATS"/>
      </Content>
    </Container>
  )
}
