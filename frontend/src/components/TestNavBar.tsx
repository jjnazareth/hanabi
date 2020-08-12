import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import { Home } from "../components/Home"
import { About } from "../components/About"
import { Contact } from "../components/Contact"
import { Error } from "../components/Error"
import { Navigation } from "../components/Navigation"

export const TestNavBar: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={Error} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
