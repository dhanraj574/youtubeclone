import './index.css'
import Context from '../../Context'
import {Link} from 'react-router-dom'

const GamingVideoItem = props => {
  const {gamingVideos} = props
  const {id, title, thumbnailUrl, viewCount} = gamingVideos
  return (
    <Context.Consumer>
      {value => {
        const {themeLight} = value
        const GamingVideoTitle = themeLight
          ? 'gamingvideo-title'
          : 'gamingvideo-title-dark'
        return (
          <Link to={`/videos/${id}`} className="gaming-list-item">
            <li>
              <img
                className="gamingvideo-thumbnail"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <div className="gamingvideo-textcont">
                <p className={GamingVideoTitle}>{title}</p>
                <p className="gamingvideo-watching">{`${viewCount} Watching Worldwide`}</p>
              </div>
            </li>
          </Link>
        )
      }}
    </Context.Consumer>
  )
}

export default GamingVideoItem
