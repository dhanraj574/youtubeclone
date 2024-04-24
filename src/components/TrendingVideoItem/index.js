import './index.css'
import Context from '../../Context'
import {formatDistanceToNow} from 'date-fns'
import {parse, getDate, getYear, getMonth} from 'date-fns'
import {Link} from 'react-router-dom'

const TrendingVideoItem = props => {
  const {videoItem} = props
  const {
    id,
    title,
    channelName,
    thumbnailUrl,
    viewCount,
    publishedAt,
    channelProfileImgUrl,
  } = videoItem
  return (
    <Context.Consumer>
      {value => {
        const {themeLight} = value
        console.log(channelProfileImgUrl)
        const videoItem = themeLight
          ? 'trendingVideoItem'
          : 'trendingVideoItem-dark'
        const videoTitle = themeLight
          ? 'trendingvideo-title'
          : 'trendingvideo-title-dark'
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
          <Link to={`/videos/${id}`} className="trendingvideo-routelink">
            <li className={videoItem}>
              <img
                className="home-thumbnail"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <div className="video-details">
                <img
                  className="trendingchannel-profileimg"
                  src={channelProfileImgUrl}
                  alt="channel logo"
                />
                <div className="profile-details">
                  <p className={videoTitle}>{title}</p>
                  <div className="channel-details">
                    <p className="trendingchannel-name">{channelName}</p>
                    <div className="like-dateposted-cont">
                      <p className="trendingvideo-likes">{`${viewCount} Views`}</p>
                      <p className="trendingvideo-dateposted">{`${updatedDistance} ago`}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </Context.Consumer>
  )
}

export default TrendingVideoItem
