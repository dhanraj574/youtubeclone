import React from 'react'

const Context = React.createContext({
  themeLight: true,
  savedVideos: [],
  addSavedVideos: () => {},
  changeTheme: () => {},
})
export default Context
