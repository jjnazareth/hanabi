import React, { Component, Dispatch } from 'react'
import { connect } from 'react-redux'
import { IGlobalState } from '../reducers'
import { IPackState } from '../reducers/pack/pack.reducer'


class Pack extends Component<IProps> {
    public render(): JSX.Element {
   
        return (
            <React.Fragment>
                <ul>
                    {this.props.pack.pack.map(card => (
                        <li key={card.idx}>
                            {card.colour} {card.rank}
                        </li>
                    ))}
                </ul>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: IGlobalState) => ({
    pack: state.pack
})


interface IProps {
    pack: IPackState
}

export default connect(mapStateToProps, null)(Pack)
