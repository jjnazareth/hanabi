import React from "react"
import { NavLink } from 'react-router-dom'

export const Navigation: React.FC<{}> = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </div>
  )
}
