import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IGlobalState } from '../reducers'
import { IPackState } from '../reducers/pack/pack.reducer'



interface IProps {
    pack: IPackState
}

class Pack extends Component<IProps> {
    public render(): JSX.Element {
        return (
            <React.Fragment>
                Card Pack
                {<ul>
                    {this.props.pack.pack.map(card => (
                        <li key={card.idx}>
                           {card.idx} {card.colour} {card.rank}
                        </li>
                    ))}
                </ul>}

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: IGlobalState) => ({
    pack: state.pack, 
})


export default connect(mapStateToProps, null)(Pack)
