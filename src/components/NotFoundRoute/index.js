import './index.css'

import TopNavbar from '../TopNavbar'
import SideNavbar from '../SideNavbar'
import Context from '../../Context'

const NotRoute = () => {
  const renderNotFound = () => {
    return (
      <Context.Consumer>
        {value => {
          const {themeLight} = value

          const notfound = themeLight
            ? 'notfound-section'
            : 'notfound-section-dark'
          const notfoundHead = themeLight
            ? 'notfound-heading'
            : 'notfound-heading-dark'
          const notfoundText = themeLight
            ? 'notfound-text'
            : 'notfound-text-dark'
          const notfoundImg = themeLight
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'

          return (
            <div className={notfound}>
              <img className="notfound-img" src={notfoundImg} alt="not found" />
              <h1 className={notfoundHead}>Page Not Found</h1>
              <p className={notfoundText}>
                We are sorry, the page you requested could not be found.
              </p>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
  return (
    <div>
      <TopNavbar />
      <div className="not-found">
        <SideNavbar />
        {renderNotFound()}
      </div>
    </div>
  )
}

export default NotRoute
