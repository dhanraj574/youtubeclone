import {Component} from 'react'
import './App.css'
import Context from './Context'
import {Route, Switch} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import GamingRoute from './components/GamingRoute'
import NotFoundRoute from './components/NotFoundRoute'
import ProtectedRoute from './components/ProtectedRoute'
import SavedVideosRoute from './components/SavedVideosRoute'
import TrendingRoute from './components/TrendingRoute'
import VideoItemDetailsRoute from './components/VideoItemDetailsRoute'

class App extends Component {
  state = {
    themeLight: true,
    savedVideos: [],
  }

  changeTheme = () => {
    this.setState(prevState => ({
      themeLight: !prevState.themeLight,
    }))
  }
  addSavedVideos = videodetails => {
    const {savedVideos} = this.state
    const existingItem = savedVideos.filter(each => each.id === videodetails.id)
    if (existingItem.length === 0) {
      this.setState(prevState => ({
        savedVideos: [...prevState.savedVideos, videodetails],
      }))
    }
  }

  render() {
    const {themeLight, savedVideos} = this.state
    console.log(savedVideos)
    return (
      <Context.Provider
        value={{
          themeLight,
          savedVideos,
          changeTheme: this.changeTheme,
          addSavedVideos: this.addSavedVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute
            exact
            path="/saved-videos"
            component={SavedVideosRoute}
          />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetailsRoute}
          />
          <ProtectedRoute component={NotFoundRoute} />
        </Switch>
      </Context.Provider>
    )
  }
}

export default App

