import {Component} from 'react'
import './index.css'
import Context from '../../Context'
import {MdHome} from 'react-icons/md'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {GiSaveArrow} from 'react-icons/gi'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

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

class SideNavbar extends Component {
  state = {
    activeLink: sideNavLinkList[0].path,
  }

  componentDidMount() {
    const {pathname} = this.props.history.location
    this.setState({activeLink: pathname})
  }

  render() {
    return (
      <Context.Consumer>
        {value => {
          const {themeLight} = value
          const {activeLink} = this.state
          const {history} = this.props

          const onClickLink = id => {
            this.setState({activeLink: id})
          }

          const sidebarSection = themeLight
            ? 'sidebar-section'
            : 'sidebar-section-dark'
          const linkIconStyling = themeLight
            ? 'sidebarlink-icon'
            : 'sidebarlink-icon-dark'
          const linkStyling = themeLight ? 'sidebarlink' : 'sidebarlink-dark'
          const activeLinkIcon = 'active-icon'
          const activelinkText = themeLight ? 'active-text' : 'active-text-dark'
          const activeItemBg = themeLight
            ? 'activeitem-bg'
            : 'activeitem-bg-dark'
          const contactUsHead = themeLight
            ? 'sidebarbottom-head'
            : 'sidebarbottom-head-dark'
          const contactUsDescription = themeLight
            ? 'sidebarbottom-description'
            : 'sidebarbottom-description-dark'

          return (
            <div className={sidebarSection}>
              <ul className="sidebar-top">
                {sideNavLinkList.map(each => (
                  <Link to={each.path} className="route-link">
                    <li
                      className={`sidebar-link ${
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
              <div className="sidebar-bottom">
                <p className={contactUsHead}>CONTACT US</p>
                <div className="sidebar-bottom-links">
                  <img
                    className="socialmedia-img"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                  />
                  <img
                    className="socialmedia-img"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                  />
                  <img
                    className="socialmedia-img"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                  />
                </div>
                <p className={contactUsDescription}>
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default withRouter(SideNavbar)
