import React, { createContext, useContext, useState } from 'react'

const ResetContext = createContext({
  screens: {
    home: false,
    favorite: false
  }
})

export const ResetProvider = ({ children }) => {
  const [home, setHome] = useState(false)
  const [favorite, setFavorite] = useState(false)

  const resetScreen = (screenName, reload) => {
    switch (screenName) {
      case 'home':
        setHome(reload)
        break
      case 'favorite':
        setFavorite(reload)
        break
    }
  }

  const screens = {
    home,
    favorite
  }

  return (
    <ResetContext.Provider value={{ screens, resetScreen }}>
      {children}
    </ResetContext.Provider>
  )
}

export function useReset() {
  return useContext(ResetContext)
}
