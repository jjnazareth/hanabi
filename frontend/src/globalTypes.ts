export type RankHint = {
  type: "Rank"
  rank: string
  position: number[]
}

export type ColourHint = {
  type: "Colour"
  colour: string
  position: number[]
}

export type RCHint = RankHint | ColourHint
export type HintChoices = {
  player: Player
  hints: RCHint[]
}

export type PlayerHint = {
  fromPlayerId: number
  toPlayerId: number
  hintToString: string
}

export type Game = {
  drawDeck: Card[]
  discards: Card[]
  buildPile: Card[]
  currentTurnIdx: number
  dealerIdx: number
}

export enum CardRank {
  Rank1 = "1",
  Rank2 = "2",
  Rank3 = "3",
  Rank4 = "4",
  Rank5 = "5"
}
export type CardColour = { name: string; code: string }

export type Card = {
  idx: number | string
  colour: CardColour
  rank: CardRank
}
export type Player = {
  isLoggedIn: boolean
  playerId: number
  name: string
  turnIdx: number
  hand: Card[]
}

export type CardPile = {
  colour: string
  cards: Card[]
}
