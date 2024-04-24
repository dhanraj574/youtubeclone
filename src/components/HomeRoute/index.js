import {Component} from 'react'
import './index.css'

import TopNavbar from '../TopNavbar'
import SideNavbar from '../SideNavbar'
import BannerCard from '../BannerCard'
import Cookies from 'js-cookie'
import HomeVideoItem from '../HomeVideoItem'
import {IoMdSearch} from 'react-icons/io'
import Context from '../../Context'
import Loader from 'react-loader-spinner'

const apiStatusList = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomeRoute extends Component {
  state = {
    homeVideosApiStatus: apiStatusList.initial,
    searchValue: '',
    videosList: [],
  }

  componentDidMount() {
    this.getVideosList()
  }

  updateSearchValue = event => {
    this.setState({searchValue: event.target.value})
  }

  onClickEnter = event => {
    if (event.key === 'Enter') {
      this.getVideosList()
    }
  }
  onClickSearch = () => {
    this.getVideosList()
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

  getVideosList = async () => {
    const {searchValue} = this.state
    this.setState({homeVideosApiStatus: apiStatusList.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchValue}`
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
        homeVideosApiStatus: apiStatusList.success,
        videosList: updatedData,
      })
    } else {
      this.setState({homeVideosApiStatus: apiStatusList.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
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
      <div className="failureview-cont">
        <img className="failure-img" src={failureImg} alt="failure view" />
        <h1 className={failureViewHead}>Oops! Something Went Wrong</h1>
        <p className="failure-text">
          We are having some trouble to complete your request. Please try again.
        </p>
        <button className="retry-btn" onClick={() => this.getVideosList()}>
          Retry
        </button>
      </div>
    )
  }

  renderNoResultsFound = themeLight => {
    const failureViewHead = themeLight
      ? 'failureview-head'
      : 'failureview-head-dark'
    return (
      <div className="failureview-cont">
        <img
          className="failure-img"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
        />
        <h1 className={failureViewHead}>No Search Results Found</h1>
        <p className="failure-text">
          Try different key words or remove search filter
        </p>
        <button className="retry-btn" onClick={() => this.getVideosList()}>
          Retry
        </button>
      </div>
    )
  }

  renderSuccessView = () => {
    const {videosList} = this.state

    return (
      <Context.Consumer>
        {value => {
          const {themeLight} = value
          const homevideosContainer = themeLight
            ? 'homevideos-cont'
            : 'homevideos-cont-dark'

          if (videosList.length > 0) {
            return (
              <div className={homevideosContainer}>
                <ul className="videolist-cont">
                  {videosList.map(each => (
                    <HomeVideoItem key={each.id} videoItem={each} />
                  ))}
                </ul>
              </div>
            )
          } else if (videosList.length === 0) {
            return this.renderNoResultsFound(themeLight)
          }
        }}
      </Context.Consumer>
    )
  }

  renderAllVideos = themeLight => {
    const {homeVideosApiStatus} = this.state
    switch (homeVideosApiStatus) {
      case apiStatusList.success:
        return this.renderSuccessView()
      case apiStatusList.failure:
        return this.renderFailureView(themeLight)
      case apiStatusList.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {videosList, searchValue} = this.state

    return (
      <Context.Consumer>
        {value => {
          const {themeLight} = value
          const homeVideoSection = themeLight
            ? 'home-videossection'
            : 'home-videossection-dark'
          const homeSection = themeLight ? 'home-section' : 'home-section-dark'
          const searchInput = themeLight ? 'search-input' : 'search-input-dark'
          return (
            <div className={homeSection} data-testid="home">
              <TopNavbar />
              <div className="home-content">
                <SideNavbar />
                <div className={homeVideoSection}>
                  <BannerCard />
                  <div className="search-outer-cont">
                    <div className="search-cont">
                      <input
                        className={searchInput}
                        type="search"
                        placeholder="Search"
                        value={searchValue}
                        onChange={this.updateSearchValue}
                        onKeyDown={this.onClickEnter}
                      />
                      <button
                        className="search-btn"
                        data-testid="searchButton"
                        onClick={() => this.onClickSearch()}
                      >
                        <IoMdSearch className="search-icon" />
                      </button>
                    </div>
                  </div>
                  {this.renderAllVideos(themeLight)}
                </div>
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default HomeRoute
