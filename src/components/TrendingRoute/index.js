import './index.css'
import {Component} from 'react'
import TopNavbar from '../TopNavbar'
import SideNavbar from '../SideNavbar'
import Context from '../../Context'
import Cookies from 'js-cookie'
import {FaFire} from 'react-icons/fa'
import TrendingVideoItem from '../TrendingVideoItem'
import Loader from 'react-loader-spinner'

const apiStatusList = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TrendingRoute extends Component {
  state = {
    trendingApiStatus: apiStatusList.initial,
    trendingVideosList: [],
  }

  componentDidMount() {
    this.getTrendingVideosList()
  }

  updateCase = data => ({
    id: data.id,
    title: data.title,
    thumbnailUrl: data.thumbnail_url,
    channelName: data.channel.name,
    channelProfileImgUrl: data.channel.profile_image_url,
    viewCount: data.view_count,
    publishedAt: data.published_at,
  })

  getTrendingVideosList = async () => {
    this.setState({trendingApiStatus: apiStatusList.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
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
        trendingApiStatus: apiStatusList.success,
        trendingVideosList: updatedData,
      })
    } else {
      this.setState({trendingApiStatus: apiStatusList.failure})
    }
  }

  renderSuccessView = themeLight => {
    const {trendingVideosList} = this.state
    console.log(trendingVideosList)
    const trendingTopCont = themeLight
      ? 'trending-topcont'
      : 'trending-topcont-dark'
    const trendingHead = themeLight
      ? 'trending-heading'
      : 'trending-heading-dark'
    const trendingLogoCont = themeLight
      ? 'trending-logocont'
      : 'trending-logocont-dark'

    return (
      <div className="trending-cont">
        <div className={trendingTopCont}>
          <div className={trendingLogoCont}>
            <FaFire className="trendingfire-logo" />
          </div>
          <h1 className={trendingHead}>Trending</h1>
        </div>
        <ul className="trendingvideo-listcont">
          {trendingVideosList.map(each => (
            <TrendingVideoItem key={each.id} videoItem={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = themeLight => {
    const failureImg = themeLight
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
    const failureViewHead = themeLight
      ? 'failureview-head'
      : 'failureview-head-dark'
    return (
      <div className="trending-failureview-cont">
        <img className="failure-img" src={failureImg} alt="failure view" />
        <h1 className={failureViewHead}>Oops! Something Went Wrong</h1>
        <p className="failure-text">
          We are having some trouble to complete your request. Please try again.
        </p>
        <button
          className="retry-btn"
          onClick={() => this.getTrendingVideosList()}
        >
          Retry
        </button>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="trending-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  renderAll = themeLight => {
    const {trendingApiStatus} = this.state
    switch (trendingApiStatus) {
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
            <div className={trendingSection} data-testid="trending">
              <TopNavbar />
              <div className="trending-main-cont">
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

export default TrendingRoute
