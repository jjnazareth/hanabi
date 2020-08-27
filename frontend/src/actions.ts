import { Dispatch } from "redux"
import { IGlobalState } from "./reducers"
import { Card, CardRank, Player, PlayerHint, Member } from "./globalTypes"
import {
  RoomActionNames,
  // LoginPlayer,
  RemoveAllPlayers,
  SeatMembers,
  AddPlayer,
  SeatPlayers,
  InitHand,
  RemoveCardFromHand,
  AddCardToHand
} from "./reducers/room/room.actions.type"

import {
  GameActionNames,
  SetCurrentTurnIdx,
  SetNextTurnIdx,
  SetDealerIdx,
  InitDeck,
  AddCardToDiscardPile,
  AddCardToBuildPile,
  RemoveCardFromDeck,
  GiveHint,
  DestructCardGame
} from "./reducers/game/game.actions.type"

import {
  LoginMember,
  AddMember,
  RegisterActionNames,
  SetMembers
} from "./reducers/register/register.actions.type"

export const seatMembers = (members: Member[]) => (
  dispatch: Dispatch<SeatMembers>
) => {
  dispatch({
    type: RoomActionNames.SEAT_MEMBERS,
    members: members
  })
}

export const setMembers = (members: Member[]) => (
  dispatch: Dispatch<SetMembers>
) => {
  dispatch({
    type: RegisterActionNames.SET_MEMBERS,
    members: members
  })
}

export const addMember = (
  playerId: number,
  userName: string,
  password: string
) => (dispatch: Dispatch<AddMember>) => {
  dispatch({
    type: RegisterActionNames.ADD_MEMBER,
    playerId: playerId,
    userName: userName,
    password: password
  })
}

export const flushCardGame = () => (dispatch: Dispatch<DestructCardGame>) => {
  dispatch({
    type: GameActionNames.DESTRUCT_CARD_GAME
  })
}

export const flushPlayers = () => (dispatch: Dispatch<RemoveAllPlayers>) => {
  dispatch({
    type: RoomActionNames.REMOVE_ALL_PLAYERS
  })
}

export const setNextTurn = () => (
  dispatch: Dispatch<SetNextTurnIdx>,
  getState: () => IGlobalState
) => {
  const { room } = getState()
  dispatch({
    type: GameActionNames.SET_NEXT_TURN,
    numPlayers: room.players.length
  })
}

export const discard = (card: Card, player: Player, deck: Card[]) => (
  dispatch: Dispatch<
    | RemoveCardFromHand
    | AddCardToDiscardPile
    | RemoveCardFromDeck
    | AddCardToHand
  >
) => {
  // discard`
  dispatch({
    type: RoomActionNames.REMOVE_CARD_FROM_HAND,
    player: player,
    card: card
  })
  dispatch({
    type: GameActionNames.ADD_CARD_TO_DISCARD_PILE,
    card: card
  })
  // draw
  dispatch({
    type: RoomActionNames.ADD_CARD_TO_HAND,
    player: player,
    card: deck[0]
  })
  dispatch({
    type: GameActionNames.REMOVE_CARD_FROM_DECK,
    deck: deck
  })
}

export const build = (card: Card, player: Player, deck: Card[]) => (
  dispatch: Dispatch<
    RemoveCardFromHand | AddCardToBuildPile | RemoveCardFromDeck | AddCardToHand
  >
) => {
  // build
  dispatch({
    type: RoomActionNames.REMOVE_CARD_FROM_HAND,
    player: player,
    card: card
  })
  dispatch({
    type: GameActionNames.ADD_CARD_TO_BUILD_PILE,
    card: card
  })
  // draw
  dispatch({
    type: RoomActionNames.ADD_CARD_TO_HAND,
    player: player,
    card: deck[0]
  })

  dispatch({
    type: GameActionNames.REMOVE_CARD_FROM_DECK,
    deck: deck
  })
}
export const initDeck = (cards: Card[]) => (dispatch: Dispatch<InitDeck>) => {
  dispatch({
    type: GameActionNames.INIT_DECK,
    cards: cards
  })
}

const initPlayers = (
  names: string[],
  turnIdxs: number[],
  currentTurnIdx: number,
  dealerIdx: number
) => {
  return (
    dispatch: Dispatch<
      | AddPlayer
      | SeatPlayers
      | SetCurrentTurnIdx
      | SetDealerIdx /* | LoginPlayer */
    >
  ) => {
    names.forEach((n) => {
      dispatch({
        type: RoomActionNames.ADD_PLAYER,
        name: n
      })
      dispatch({
        type: RoomActionNames.SEAT_PLAYERS,
        turnIdxs: turnIdxs
      })
      dispatch({
        type: GameActionNames.SET_CURRENT_TURN,
        currentTurnIdx: currentTurnIdx
      })
      dispatch({
        type: GameActionNames.SET_DEALER,
        dealerIdx: dealerIdx
      })
    })
  }
}

export const initHand = (turnIdx: number, cards: Card[]) => (
  dispatch: Dispatch<InitHand>
) =>
  dispatch({
    type: RoomActionNames.INIT_HAND,
    turnIdx: turnIdx,
    cards: cards
  })

const initPack = (): Card[] => {
  let arrC = [
    { name: "White", code: "#FFFFFF" },
    { name: "Yellow", code: "#FFCC66" },
    { name: "Green", code: "#00CC00" },
    { name: "Blue", code: "#0066CC" },
    { name: "Red", code: "#CC0033" },
    { name: "Multi", code: "" } // code:"#9900FF"} 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  ]

  let arrR = [
    CardRank.Rank1,
    CardRank.Rank2,
    CardRank.Rank3,
    CardRank.Rank4,
    CardRank.Rank5
  ]
  let pack: Card[] = []
  let ctr = 0
  arrR.forEach((r) =>
    arrC.forEach((c) => {
      if (r == CardRank.Rank1) {
        pack.push({ idx: ctr++, colour: c, rank: r })
        pack.push({ idx: ctr++, colour: c, rank: r })
        pack.push({ idx: ctr++, colour: c, rank: r })
      }
      if (r == CardRank.Rank2 || r == CardRank.Rank3 || r == CardRank.Rank4) {
        pack.push({ idx: ctr++, colour: c, rank: r })
        pack.push({ idx: ctr++, colour: c, rank: r })
      }
      if (r == CardRank.Rank5) {
        pack.push({ idx: ctr++, colour: c, rank: r })
      }
    })
  )
  return pack
}

const deal = (players: Player[], dealerIdx: number) => {
  return (dispatch: Dispatch<InitHand | InitDeck>) => {
    const numCardsInHand = (numPlayers: number) => (numPlayers < 4 ? 5 : 4)
    let pack = initPack()
    let numPlayers = players.length
    const CARDS_IN_HAND = numCardsInHand(numPlayers)
    let arr = Array.from(Array(CARDS_IN_HAND).keys()).map((i) => i * numPlayers) // 0,5,10,15,20 etc
    players.forEach((p) => {
      let handIdx = (p.turnIdx - dealerIdx - 1 + numPlayers) % numPlayers
      // dealer deals last to himself
      let cards = arr.map((i) => pack[i + handIdx])
      dispatch({
        type: RoomActionNames.INIT_HAND,
        turnIdx: p.turnIdx,
        cards: cards
      })
      let cardsDealt = players.length * numCardsInHand(players.length)
      dispatch({
        type: GameActionNames.INIT_DECK,
        cards: pack.slice(cardsDealt)
      })
    })
  }
}

export const initGame = (
  names: string[],
  turnIdxs: number[],
  currentTurnIdx: number,
  dealerIdx: number
) => (
  dispatch: Dispatch<
    | AddPlayer
    // | LoginPlayer
    | SeatPlayers
    | SetCurrentTurnIdx
    | SetDealerIdx
    | InitDeck
    | InitHand
  >,
  getState: () => IGlobalState
) => {
  initPlayers(names, turnIdxs, currentTurnIdx, dealerIdx)(dispatch)
  const { room, game } = getState()
  deal(room.players, game.dealerIdx)(dispatch)
}

export const loginMember = (userName: string, password: string) => (
  dispatch: Dispatch<LoginMember>
) =>
  dispatch({
    type: RegisterActionNames.LOGIN_MEMBER,
    userName: userName,
    password: password
  })

export const giveHint = (playerHint: PlayerHint) => (
  dispatch: Dispatch<GiveHint>
) =>
  dispatch({
    type: GameActionNames.GIVE_HINT,
    playerHint: playerHint
  })
