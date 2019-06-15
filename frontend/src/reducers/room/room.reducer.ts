import { RoomAction, RoomActionNames } from './room.actions.type'
import { Card, DiscardPile, CardColour, CardRank, Player } from '../../globalTypes'

export type Card = {
    idx : number,
    colour: CardColour, 
    rank: CardRank
}

export interface IRoomState {
  
    players: Player[]
    lastDiscard: Card,
    discardPiles : DiscardPile[]
}



const initialState: IRoomState = {
    players: [],
    lastDiscard: { idx: "", colour : { name: "WHITE", code: "#FFFFFF" }, rank: CardRank.Rank0 },
    discardPiles : [
        { colour: "White", cards: [{ idx: "", colour : { name: "White", code: "#FFFFFF" }, rank: CardRank.Rank0 }] }, 
        { colour : "Yellow", cards: [{ idx: "", colour : { name: "Yellow", code: "#FFCC66" }, rank: CardRank.Rank0 }] },
        { colour : "Green",cards: [{ idx: "", colour : { name: "Green", code: "#00CC00" }, rank: CardRank.Rank0 }] },
        { colour : "Blue", cards: [{ idx: "", colour : { name: "Blue", code: "#0066CC" }, rank: CardRank.Rank0 }] },
        { colour: "Red",cards: [{ idx: "", colour : { name: "Red", code: "#CC0033" }, rank: CardRank.Rank0 }] },
        { colour : "Multi" ,cards: [{ idx: "", colour : { name: "Multi", code: "" }, rank: CardRank.Rank0 }] }
    ]
}

class inc {
    static count: number = 0;
    static inc(): number {
        return this.count++
    }
}

export default function (state = initialState, action: RoomAction) {
    switch (action.type) {
        case RoomActionNames.ADD_PLAYER:
            return {
                ...state,
                players: [...state.players, { name: action.name, playerId: inc.inc(), turnIdx: -1, hand: [] }]
            }
        case RoomActionNames.INIT_HAND:
           
            return {
                ...state, players: state.players.map(p => {
                    return { ...p, hand: p.turnIdx == action.turnIdx ? action.cards : p.hand }
                    // index of player with the required turn index
                })
            }
        case RoomActionNames.SEAT_PLAYERS:
            return {
                ...state,
                players:
                    state.players.map((p, i) => {
                        return {
                            ...p,
                            turnIdx: action.turnIdxs[i]
                        }
                    })
            }
        case RoomActionNames.DISCARD:
            let obj =  {
                ...state, 
                lastDiscard : action.card,
                players:
                    state.players.map(p => 
                         (
                            p.playerId == action.player.playerId? 
                                { ...action.player, 
                                    hand : action.player.hand.filter
                                        (card => card.idx !== action.card.idx)  }
                            : p     
                        )
                    )            
                  
            }
            
            return obj
        default:
            return state;
    }

}

