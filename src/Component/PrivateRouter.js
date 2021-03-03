import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { MyContext } from '../App'

export default function PrivateRouter({ children, ...rest }) {
  const [logInUser, setlogInUser]=useContext(MyContext)
    return (
      <Route
      {...rest}
      render={({ location }) =>
      logInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    )
}
