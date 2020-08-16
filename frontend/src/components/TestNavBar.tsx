import React, { useState, useEffect } from "react"
import { BrowserRouter, Route, Switch, Link } from "react-router-dom"
import { Error } from "../components/Error"
import { Writers } from './writers/Writers'
import { ImageRemoveRedEye, ImageMonochromePhotos } from "material-ui/svg-icons"

export const TestNavBar: React.FC = () => {
  const [state, setState] = useState({ writers: [], isLoading: false })
  useEffect(() => {
    setState({ ...state, isLoading: true })
    const fetchData = async () => {
      await fetch("http://localhost:3004/writers?_embed=texts")
        .then(res => res.json())
        .then(data => setState({ writers: data, isLoading: false }))
    }
    fetchData()
    // return () => {
    // }
  }, [])

  const { writers } = state
  return (
    <BrowserRouter>
      <ul>
        <li><Link to="/writers">Writers</Link></li>
      </ul>
      <hr />
      <Switch>
        <Route path="/writers" render={props => {
          const { match } = props
          return <Writers match={match} writers={writers} />
        }} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  )
}



