import React, { FC } from 'react'
import { Fragment } from 'react'
import { Link, Route, RouteComponentProps, match } from 'react-router-dom'
import { Writer, IWriter } from './Writer'

interface IWriters {
  writers: IWriter[]
}

interface IProps extends IWriters {
  match: match
}

export const Writers: FC<IProps> = ({ match, writers }) => {
  return (
    <Fragment>
      <ul>
        {writers.map(({ name, id }) => (
          <li key={id}><Link to={`${match.url}/${id}`}> {name} {id}</Link></li>
        ))}
      </ul>
      <Route path={`${match.url}/:writerId`} render={
        ({ match }: RouteComponentProps<{ writerId: string }>) => {
          const writer = writers.find(writer => writer.id === match.params.writerId)
          return writer !== undefined ? <Writer match={match} {...writer} /> : <Fragment></Fragment>
        }
      }>
      </Route>
    </Fragment>
  )
}
