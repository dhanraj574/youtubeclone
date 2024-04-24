import {Component} from 'react'
import './index.css'
import TopNavbar from '../TopNavbar'
import SideNavbar from '../SideNavbar'
import Context from '../../Context'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {FiThumbsUp} from 'react-icons/fi'
import {FiThumbsDown} from 'react-icons/fi'
import {GiSaveArrow} from 'react-icons/gi'
import {formatDistanceToNow} from 'date-fns'
import {parse, getDate, getYear, getMonth} from 'date-fns'

const apiStatusList = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetailsRoute extends Component {
  state = {
    videoItemDetailsApiStatus: apiStatusList.initial,
    videoItemDetails: {},
    likeBtnActive: false,
    dislikeBtnActive: false,
    saveBtnActive: false,
    playing: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  updateCase = data => ({
    id: data.id,
    title: data.title,
    thumbnailUrl: data.thumbnail_url,
    videoUrl: data.video_url,
    channelName: data.channel.name,
    channelProfileImgUrl: data.channel.profile_image_url,
    subscriberCount: data.channel.subscriber_count,
    description: data.description,
    viewCount: data.view_count,
    publishedAt: data.published_at,
  })

  getVideoDetails = async () => {
    this.setState({videoItemDetailsApiStatus: apiStatusList.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const id = this.props.match.params.id
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = this.updateCase(fetchedData.video_details)

      this.setState({
        videoItemDetailsApiStatus: apiStatusList.success,
        videoItemDetails: updatedData,
      })
    } else {
      this.setState({videoItemDetailsApiStatus: apiStatusList.failure})
    }
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
        <button className="retry-btn" onClick={() => this.getVideoDetails()}>
          Retry
        </button>
      </div>
    )
  }

  renderSuccessView = (themeLight, addSavedVideos) => {
    const {
      videoItemDetails,
      likeBtnActive,
      dislikeBtnActive,
      saveBtnActive,
      playing,
    } = this.state

    const onClickLikeBtn = () => {
      this.setState(prevState => ({
        likeBtnActive: !prevState.likeBtnActive,
        dislikeBtnActive: false,
      }))
    }

    const onClickDislikeBtn = () => {
      this.setState(prevState => ({
        dislikeBtnActive: !prevState.dislikeBtnActive,
        likeBtnActive: false,
      }))
    }

    const onClickSaveBtn = () => {
      addSavedVideos(videoItemDetails)
      this.setState(prevState => ({
        saveBtnActive: !prevState.saveBtnActive,
      }))
    }

    const onClickPlay = () => {
      this.setState(prevState => ({
        playing: !prevState.playing,
      }))
    }

    const {
      id,
      title,
      channelProfileImgUrl,
      thumbnailUrl,
      viewCount,
      publishedAt,
      channelName,
      videoUrl,
      description,
      subscriberCount,
    } = videoItemDetails

    const videoDetailsHeading = themeLight
      ? 'videodetails-videoname'
      : 'videodetails-videoname-dark'
    const videoDetailsChannelName = themeLight
      ? 'videodetails-channelname'
      : 'videodetails-channelname-dark'
    const videoDetailsLikekBtn = likeBtnActive
      ? 'videodetails-btn-active'
      : 'videodetails-btn'
    const videoDetailsDislikekBtn = dislikeBtnActive
      ? 'videodetails-btn-active'
      : 'videodetails-btn'
    const videoDetailsSavekBtn = saveBtnActive
      ? 'videodetails-btn-active'
      : 'videodetails-btn'

    const dateString = publishedAt
    const date = parse(dateString, 'MMM dd, yyyy', new Date())
    const year = getYear(date)
    const month = getMonth(date) + 1
    const day = getDate(date)
    const dateArray = [year, month, day]
    const newdate = parse(
      `${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`,
      'yyyy-MM-dd',
      new Date(),
    )
    const distance = formatDistanceToNow(newdate)
    const splitDistance = distance.split(' ')
    const updatedDistance = `${splitDistance[1]} ${splitDistance[2]}`

    return (
      <div key={id} className="videoitemdetails-cont">
        <div className="videodetails-video">
          <ReactPlayer
            className="videoplayer"
            url={videoUrl}
            controls
            playing={playing}
            light={thumbnailUrl}
            width="100%"
            height="100%"
            onClick={onClickPlay}
          />
          <p className={videoDetailsHeading}>{title}</p>
          <div className="videodetails-features">
            <div className="videodetails-details">
              <p className="videodetails-views">{`${viewCount} views`}</p>
              <p className="videodetails-postedtime">{`${updatedDistance} ago`}</p>
            </div>
            <div className="videodetails-interactions">
              <button
                type="button"
                className={videoDetailsLikekBtn}
                onClick={onClickLikeBtn}
              >
                <FiThumbsUp className="video-btnicon" />
                <p className="video-btntext">Like</p>
              </button>
              <button
                type="button"
                className={videoDetailsDislikekBtn}
                onClick={onClickDislikeBtn}
              >
                <FiThumbsDown className="video-btnicon" />
                <p className="video-btntext">Dislike</p>
              </button>
              <button
                type="button"
                className={videoDetailsSavekBtn}
                onClick={onClickSaveBtn}
              >
                <GiSaveArrow className="video-btnicon" />
                <p className="video-btntext">Save</p>
              </button>
            </div>
          </div>
        </div>
        <div className="videodetails-channel">
          <div className="videodetails-channelcont">
            <img
              className="videodetails-profilelogo"
              src={channelProfileImgUrl}
              alt="channel logo"
            />
            <div className="videodetails-channeldetails">
              <p className={videoDetailsChannelName}>{channelName}</p>
              <p className="videodetails-channelsubscribers">{`${subscriberCount} subscribers`}</p>
            </div>
          </div>
          <p className="videodetails-description">{description}</p>
        </div>
      </div>
    )
  }

  renderAll = (themeLight, addSavedVideos) => {
    const {videoItemDetailsApiStatus} = this.state
    switch (videoItemDetailsApiStatus) {
      case apiStatusList.success:
        return this.renderSuccessView(themeLight, addSavedVideos)
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
          const {themeLight, addSavedVideos} = value
          const videoItemDetailsSection = themeLight
            ? 'videoitem-detailssection'
            : 'videoitem-detailssection-dark'
          return (
            <div
              className={videoItemDetailsSection}
              data-textid="videoItemDetails"
            >
              <TopNavbar />
              <div className="videoitem-detailscontent">
                <SideNavbar />
                {this.renderAll(themeLight, addSavedVideos)}
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default VideoItemDetailsRoute
