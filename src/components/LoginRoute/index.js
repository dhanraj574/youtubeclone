import {Component} from 'react'
import './index.css'
import Context from '../../Context'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    isLoginFailure: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  showPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  loginSuccess = jwtToken => {
    this.setState({errorMsg: ''})
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  loginFailure = err => {
    this.setState({errorMsg: err, isLoginFailure: true})
  }

  validateUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    if (response.ok) {
      this.loginSuccess(fetchedData.jwt_token)
    } else {
      this.loginFailure(fetchedData.error_msg)
    }
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <Context.Consumer>
        {value => {
          const {themeLight} = value
          const {username, password, showPassword, errorMsg, isLoginFailure} =
            this.state

          const inputType = showPassword ? 'text' : 'password'

          const loginLogoUrl = themeLight
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

          const labelStyling = themeLight ? 'label' : 'label-dark'

          const showPasswordLabelStyling = themeLight
            ? 'showpassword-label'
            : 'showpassword-label-dark'

          const loginSectionStyling = themeLight
            ? 'login-section'
            : 'login-section-dark'

          const loginCardStyling = themeLight ? 'login-card' : 'login-card-dark'

          const inputStyling = themeLight ? 'input' : 'input-dark'
          return (
            <div className={loginSectionStyling}>
              <form
                className={loginCardStyling}
                onSubmit={this.validateUserDetails}
              >
                <img
                  className="login-logo"
                  src={loginLogoUrl}
                  alt="website logo"
                />
                <div className="input-cont">
                  <label className={labelStyling} htmlFor="username">
                    USERNAME
                  </label>
                  <input
                    id="username"
                    className={inputStyling}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={this.onChangeUsername}
                  />
                </div>
                <div className="input-cont">
                  <label className={labelStyling} htmlFor="password">
                    PASSWORD
                  </label>
                  <input
                    id="password"
                    className={inputStyling}
                    type={inputType}
                    placeholder="Password"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                  <div className="passwordcheckbox-cont">
                    <input
                      id="checkbox"
                      className="show-password"
                      type="checkbox"
                      onChange={this.showPassword}
                    />
                    <label
                      htmlFor="checkbox"
                      className={showPasswordLabelStyling}
                    >
                      Show Password
                    </label>
                  </div>
                </div>
                <div className="loginbtn-cont">
                  <button type="submit" className="login-btn">
                    Login
                  </button>
                  {isLoginFailure ? <p className="err-msg">{errorMsg}</p> : ''}
                </div>
              </form>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default LoginRoute
