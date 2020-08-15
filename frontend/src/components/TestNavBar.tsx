import React, { useState, Fragment } from "react"
import { BrowserRouter, Route, Switch, Link } from "react-router-dom"
import { Error } from "../components/Error"
import { useEffect } from "react"
import { Writers } from './writers/Writers'

export const TestNavBar: React.FC = () => {
  const [state, setState] = useState({ writers: [], isLoading: false })
  useEffect(() => {
    setState({ ...state, isLoading: true })
    const fetchData = async () => {
      await fetch("http://localhost:3004/writers")
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
      <Fragment>
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
      </Fragment>
    </BrowserRouter>
  )
}
