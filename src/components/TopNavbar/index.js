import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import Context from '../../Context'
import {IoMoon, IoSunnyOutline} from 'react-icons/io5'
import Popup from 'reactjs-popup'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdClose} from 'react-icons/io'
import {FiLogOut} from 'react-icons/fi'
import {MdHome} from 'react-icons/md'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {GiSaveArrow} from 'react-icons/gi'
import {Link} from 'react-router-dom'

const sideNavLinkList = [
  {id: 'HOME', displayText: 'Home', icon: MdHome, path: '/'},
  {id: 'TRENDING', displayText: 'Trending', icon: FaFire, path: '/trending'},
  {id: 'GAMING', displayText: 'Gaming', icon: SiYoutubegaming, path: '/gaming'},
  {
    id: 'SAVEDVIDEOS',
    displayText: 'Saved Videos',
    icon: GiSaveArrow,
    path: '/saved-videos',
  },
]

class TopNavbar extends Component {
  state = {
    activeLink: '',
  }

  componentDidMount() {
    const {pathname} = this.props.history.location
    this.setState({activeLink: pathname})
  }

  renderLogoutPopup = (value, close) => {
    const {themeLight} = value

    const logoutfunction = () => {
      const {history} = this.props
      Cookies.remove('jwt_token')
      history.replace('/login')
    }

    const logoutPopupBg = themeLight ? 'logout-popupbg' : 'logout-popupbg-dark'
    const logoutText = themeLight ? 'logout-text' : 'logout-text-dark'
    const cancelbtn = themeLight ? 'cancel-btn' : 'cancel-btn-dark'
    const confirmBtn = themeLight ? 'confirm-btn' : 'confirm-btn-dark'
    return (
      <div className="logoutpopup-cont">
        <div className={logoutPopupBg}>
          <p className={logoutText}>Are you sure, you want to logout</p>
          <div className="logoutpopup-btn">
            <button className={cancelbtn} onClick={() => close()}>
              Cancel
            </button>
            <button className={confirmBtn} onClick={logoutfunction}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  }
  renderSideNavLinkPopup = close => (
    <Context.Consumer>
      {value => {
        const {themeLight} = value
        const {activeLink} = this.state
        const {history} = this.props

        const onClickLink = path => {
          this.setState({activeLink: path})
        }

        const sidebarPopup = themeLight
          ? 'navsidebar-popup'
          : 'navsidebar-popup-dark'
        const linkIconStyling = themeLight
          ? 'sidebarlink-icon-popup'
          : 'sidebarlink-icon-popup-dark'
        const linkStyling = themeLight
          ? 'sidebarlink-popup'
          : 'sidebarlink-popup-dark'
        const activeLinkIcon = 'active-icon'
        const activelinkText = themeLight ? 'active-text' : 'active-text-dark'
        const activeItemBg = themeLight ? 'activeitem-bg' : 'activeitem-bg-dark'
        const closepopupbtn = themeLight ? 'close-btn' : 'close-btn-dark'
      
        return (
          <div className={sidebarPopup}>
            <div className="navlink-popup-close" onClick={() => close()}>
              <IoMdClose className={closepopupbtn} />
            </div>
            <ul className="sidebar-top-popup">
              {sideNavLinkList.map(each => (
                <Link to={each.path} className="route-link">
                  <li
                    className={`sidebar-link-popup ${
                      each.path === activeLink ? activeItemBg : ''
                    }`}
                    key={each.id}
                    onClick={() => onClickLink(history.location.pathname)}
                  >
                    <each.icon
                      className={`${linkIconStyling} ${
                        each.path === activeLink ? activeLinkIcon : ''
                      }`}
                    />
                    <p
                      className={`${linkStyling} ${
                        each.path === activeLink ? activelinkText : ''
                      }`}
                    >
                      {each.displayText}
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )
      }}
    </Context.Consumer>
  )

  renderNavbar = () => (
    <Context.Consumer>
      {value => {
        const {themeLight, changeTheme} = value

        const changeThemeFunction = () => {
          changeTheme()
        }

        const navbarSection = themeLight
          ? 'navbar-section'
          : 'navbar-section-dark'
        const navbarLogoUrl = themeLight
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        const NavbarThemeImg = themeLight ? IoMoon : IoSunnyOutline
        const navbarButtonStyling = themeLight
          ? 'logout-btn'
          : 'logout-btn-dark'
        const themeImg = themeLight ? 'navbar-themeimg' : 'navbar-themeimg-dark'
        const hamburger = themeLight ? 'hamburger-icon' : 'hamburger-icon-dark'
        const smLogout = themeLight ? 'smlogout-icon' : 'smlogout-icon-dark'

        return (
          <div className={navbarSection}>
            <div className="navbar-logo">
              <Link to="/" className="route-link">
                <img
                  className="logo-img"
                  src={navbarLogoUrl}
                  alt="website logo"
                />
              </Link>
            </div>
            <div className="navbar-items">
              <button
                className="theme-btn"
                onClick={changeThemeFunction}
                data-testid="theme"
              >
                <NavbarThemeImg className={themeImg} />
              </button>
              <div className="hamburger">
                <Popup
                  modal
                  trigger={
                    <button className="sm-hamburger-btn">
                      <GiHamburgerMenu className={hamburger} />
                    </button>
                  }
                >
                  {close => this.renderSideNavLinkPopup(close)}
                </Popup>
              </div>

              <img
                className="profile-img"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />
              <Popup
                modal
                trigger={
                  <button className="sm-logout">
                    <FiLogOut className={smLogout} />
                  </button>
                }
              >
                {close => this.renderLogoutPopup(value, close)}
              </Popup>

              <Popup
                modal
                trigger={
                  <button className={navbarButtonStyling} type="button">
                    Logout
                  </button>
                }
              >
                {close => this.renderLogoutPopup(value, close)}
              </Popup>
            </div>
          </div>
        )
      }}
    </Context.Consumer>
  )

  render() {
    return <div>{this.renderNavbar()}</div>
  }
}

export default withRouter(TopNavbar)
