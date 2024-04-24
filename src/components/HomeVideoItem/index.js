import './index.css'
import Context from '../../Context'
import {formatDistanceToNow} from 'date-fns'
import {parse, getDate, getYear, getMonth} from 'date-fns'
import {Link} from 'react-router-dom'

const HomeVideoItem = props => {
  const {videoItem} = props
  const {
    id,
    title,
    channelProfileImgUrl,
    thumbnailUrl,
    viewCount,
    publishedAt,
    channelName,
  } = videoItem
  return (
    <Context.Consumer>
      {value => {
        const {themeLight} = value

        const videoItem = themeLight ? 'HomeVideoItem' : 'HomeVideoItem-dark'
        const videoTitle = themeLight ? 'video-title' : 'video-title-dark'
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
          <Link to={`/videos/${id}`} className={videoItem}>
            <li>
              <img
                className="home-thumbnail"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <div className="video-details">
                <img
                  className="channelprofile-img"
                  src={channelProfileImgUrl}
                  alt="channel logo"
                />
                <div className="profile-details">
                  <p className={videoTitle}>{title}</p>
                  <div className="channel-details">
                    <p className="channel-name">{channelName}</p>
                    <div className="like-dateposted-cont">
                      <p className="video-likes">{`${viewCount} Views`}</p>
                      <p className="video-dateposted">{`${updatedDistance} ago`}</p>
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

export default HomeVideoItem
