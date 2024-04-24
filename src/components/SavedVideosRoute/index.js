import './index.css'

import TopNavbar from '../TopNavbar'
import SideNavbar from '../SideNavbar'
import Context from '../../Context'

import {GiSaveArrow} from 'react-icons/gi'
import SavedVideoItem from '../SavedVideoItem'


const SavedVideosRoute = () => {

  const renderNoSavedVideos = themeLight => {
    const noSavedVideosHead = themeLight
      ? 'nosavedvideos-head'
      : 'nosavedvideos-head-dark'
    return (
      <div className="saved-failureview-cont">
        <img
          className="nosavedvideos-img"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
          alt="no saved videos"
        />
        <h1 className={noSavedVideosHead}>No Saved Videos Found</h1>
        <p className="nosavedvideos-text">
          You can save your videos while watching them
        </p>
      </div>
    )
  }

  const renderSuccessView = (themeLight, savedVideos) => {
    const savedTopCont = themeLight ? 'saved-topcont' : 'saved-topcont-dark'
    const savedHead = themeLight ? 'saved-heading' : 'saved-heading-dark'
    const savedLogoCont = themeLight ? 'saved-logocont' : 'saved-logocont-dark'

    return (
      <div className="saved-cont">
        <div className={savedTopCont}>
          <div className={savedLogoCont}>
            <GiSaveArrow className="saved-logo" />
          </div>
          <h1 className={savedHead}>Saved Videos</h1>
        </div>
        <ul className="savedvideo-listcont">
          {savedVideos.map(each => (
            <SavedVideoItem key={each.id} videoItem={each} />
          ))}
        </ul>
      </div>
    )
  }
  return (
    <Context.Consumer>
      {value => {
        const {themeLight, savedVideos} = value
        const savedSection = themeLight ? 'saved-section' : 'saved-section-dark'
        return (
          <div className={savedSection} data-testid="savedVideos">
            <TopNavbar />
            <div className="saved-main-cont">
              <SideNavbar />
              {savedVideos.length === 0
                ? renderNoSavedVideos(themeLight)
                : renderSuccessView(themeLight, savedVideos)}
            </div>
          </div>
        )
      }}
    </Context.Consumer>
  )
}

export default SavedVideosRoute
