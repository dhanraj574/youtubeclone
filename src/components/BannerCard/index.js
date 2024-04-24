import {Component} from 'react'
import './index.css'
import {IoMdClose} from 'react-icons/io'

class BannerCard extends Component {
  state = {
    isOpen: true,
  }

  onClickCloseBanner = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }))
  }

  renderBanner = () => {
    return (
      <div className="banner-card" data-testid="banner">
        <div className="banner-details">
          <img
            className="bannercard-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="nxt watch logo"
          />
          <p className="bannercard-text">
            Buy Nxt Watch Premium prepaid plans with UPI
          </p>
          <button className="bannercard-btn">GET IT NOW</button>
        </div>
        <button
          className="bannerclose-btn"
          onClick={this.onClickCloseBanner}
          data-testid="close"
        >
          <IoMdClose className="bannercard-close" />
        </button>
      </div>
    )
  }
  render() {
    const {isOpen} = this.state
    return isOpen ? this.renderBanner() : ''
  }
}

export default BannerCard
