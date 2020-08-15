import React, { FC } from 'react'
import { Fragment } from 'react'
import { Link, Route, RouteComponentProps, match } from 'react-router-dom'
import { Writer, IWriter } from './Writer'


type TParams = { writerId: string }

interface IProps {
  writers: IWriter[]
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
      <Route path={`${match.url}/:writerId`} render=
        {
          (props: RouteComponentProps<TParams>) => {
            const writer = writers.find(writer => writer.id === props.match.params.writerId) as IWriter
            console.log(match.params)
            return writer !== undefined ? <Writer {...writer} /> : <Fragment></Fragment>
          }
        }>

      </Route>
      {/* <Writer {...props} : {...writers.find(writer => writer.id === props.match.params.id)} /> */}

    </Fragment>
  )
}
