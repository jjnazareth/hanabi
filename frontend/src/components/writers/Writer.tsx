import React, { FC } from 'react'
import { Fragment } from 'react'
import { IText, Text } from './Text'
import { match, Link, Route, RouteComponentProps } from 'react-router-dom'

export interface IWriter {
  id: string
  name: string
  born: string
  deceased: string
  description: string
  texts: IText[]

}

interface IProps extends IWriter {
  match: match
}

export const Writer: FC<IProps> = ({ match, id, name, description, texts }) => {
  return (

    <Fragment>
      <hr />
      {id} {name}
      <br />
      {description}
      <ul>
        {texts.map(({ id, title }) => (
          <li key={id}><Link to={`${match.url}/${id}`}> {title} </Link></li>
        ))}
      </ul>
      <Route path={`${match.url}/:textId`} render={
        ({ match }: RouteComponentProps<{ textId: string }>) => {
          const text = texts.find(text => text.id === match.params.textId)
          return text !== undefined ? <Text {...text} /> : <Fragment />
        }
      }>
      </Route>
    </Fragment>
  )
}