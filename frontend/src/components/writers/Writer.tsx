import React, { FC } from 'react'
import { Fragment } from 'react'

export interface IWriter {
  id: string
  name: string
  born: string
  deceased: string
  description: string
}

export const Writer: FC<IWriter> = ({ id, name, description }) => {

  return (
    <Fragment>
      {id} {name}

      {description}
    </Fragment>
  )
}