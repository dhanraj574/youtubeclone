import './index.css'
import Context from '../../Context'
import {formatDistanceToNow} from 'date-fns'
import {parse, getDate, getYear, getMonth} from 'date-fns'
import {Link} from 'react-router-dom'

const SavedVideoItem = props => {
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
        const videoItem = themeLight ? 'savedVideoItem' : 'savedVideoItem-dark'
        const videoTitle = themeLight
          ? 'savedvideo-title'
          : 'savedvideo-title-dark'
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
                className="saved-home-thumbnail"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <div className="savedvideo-details">
                <img
                  className="savedchannel-profileimg"
                  src={channelProfileImgUrl}
                  alt="channel logo"
                />
                <div className="savedprofile-details">
                  <p className={videoTitle}>{title}</p>
                  <div className="savedchannel-details">
                    <p className="savedchannel-name">{channelName}</p>
                    <div className="savedlike-dateposted-cont">
                      <p className="savedvideo-likes">{`${viewCount} Views`}</p>
                      <p className="savedvideo-dateposted">{`${updatedDistance} ago`}</p>
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

export default SavedVideoItem
