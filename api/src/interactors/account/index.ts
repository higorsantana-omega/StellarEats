import BaseInteractor from '../BaseInteractor'
import Account from './Account'
import Login, { LoginDTO, ShowAccountDTO } from './useCases/Login'
import Signup, { SignupDTO } from './useCases/Signup'

export default class AccountInteractor extends BaseInteractor<Account> {
  signup (data: SignupDTO): Promise<Account> {
    const signup = new Signup(this.repository)
    return signup.execute(data)
  }

  login (data: LoginDTO): Promise<ShowAccountDTO> {
    const login = new Login(this.repository)
    return login.execute(data)
  }
}
