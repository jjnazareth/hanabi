import { BrowserRouter as Router, Route, NavLink, Link, match, RouteComponentProps } from 'react-router-dom'
import React, { Fragment } from 'react'


export interface IText {
  id: string
  writerId: string
  title: string
  description: string
  published: number
}

interface IProps extends IText {

}

export const Text: React.FC<IProps> = ({ id, writerId, title, description, published }) => {
  return (
    <Fragment>
      {id} {writerId} {title} {published} <br></br>{description}
    </Fragment >
  )
}
