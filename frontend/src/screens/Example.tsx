import React from 'react'

import CardPlace from './CardPlace'
import { Card, CardColour, CardRank } from '../globalTypes'
import CardDisplay from './CardDisplay'

const rowStyle: React.CSSProperties = { overflow: 'hidden', clear: 'both' }

const Container: React.FC = () => (
 
    <div>
        <div style={rowStyle}>
            <CardPlace place= "1" />
            <CardPlace place= "2" /> 
            <CardPlace place= "3" />
            <CardPlace place= "4" />
        </div>
    </div>
)

export default Container
