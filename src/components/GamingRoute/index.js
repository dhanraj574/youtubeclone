import {Component} from 'react'
import './index.css'
import TopNavbar from '../TopNavbar'
import SideNavbar from '../SideNavbar'
import Context from '../../Context'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import GamingVideoItem from '../GamingVideoItem'

const apiStatusList = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GamingRoute extends Component {
  state = {
    gamingApiStatus: apiStatusList.initial,
    gamingVideosList: [],
  }

  componentDidMount() {
    this.getGamingVideosList()
  }

  updateCase = data => ({
    id: data.id,
    title: data.title,
    thumbnailUrl: data.thumbnail_url,
    viewCount: data.view_count,
  })

  getGamingVideosList = async () => {
    this.setState({gamingApiStatus: apiStatusList.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(each => this.updateCase(each))
      this.setState({
        gamingApiStatus: apiStatusList.success,
        gamingVideosList: updatedData,
      })
    } else {
      this.setState({gamingApiStatus: apiStatusList.failure})
    }
  }

  renderSuccessView = themeLight => {
    const {gamingVideosList} = this.state

    const gamingTopCont = themeLight ? 'gaming-topcont' : 'gaming-topcont-dark'
    const gamingHead = themeLight ? 'gaming-heading' : 'gaming-heading-dark'
    const gamingLogoCont = themeLight
      ? 'gaming-logocont'
      : 'gaming-logocont-dark'

    return (
      <div className="gaming-cont">
        <div className={gamingTopCont}>
          <div className={gamingLogoCont}>
            <SiYoutubegaming className="gamingfire-logo" />
          </div>
          <h1 className={gamingHead}>Gaming</h1>
        </div>
        <ul className="gamingvideo-listcont">
          {gamingVideosList.map(each => (
            <GamingVideoItem key={each.id} gamingVideos={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="gaming-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  renderFailureView = themeLight => {
    const failureImg = themeLight
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
    const failureViewHead = themeLight
      ? 'failureview-head'
      : 'failureview-head-dark'
    return (
      <div className="gaming-failureview-cont">
        <img className="failure-img" src={failureImg} alt="failure view" />
        <h1 className={failureViewHead}>Oops! Something Went Wrong</h1>
        <p className="failure-text">
          We are having some trouble to complete your request. Please try again.
        </p>
        <button
          className="retry-btn"
          onClick={() => this.getGamingVideosList()}
        >
          Retry
        </button>
      </div>
    )
  }

  renderAll = themeLight => {
    const {gamingApiStatus} = this.state
    switch (gamingApiStatus) {
      case apiStatusList.success:
        return this.renderSuccessView(themeLight)
      case apiStatusList.failure:
        return this.renderFailureView(themeLight)
      case apiStatusList.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <Context.Consumer>
        {value => {
          const {themeLight} = value
          const trendingSection = themeLight
            ? 'trending-section'
            : 'trending-section-dark'
          return (
            <div className={trendingSection} data-testid="gaming">
              <TopNavbar />
              <div className="gaming-main-cont">
                <SideNavbar />
                {this.renderAll(themeLight)}
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default GamingRoute
