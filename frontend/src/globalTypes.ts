
export enum CardColour {
    RED = "RED",
    GREEN = "GREEN",
    BLUE = "BLUE",
    YELLOW = "YELLOW",
    WHITE = "WHITE",
    MULTI = "MULTI"
}
export enum CardRank {
    Rank1 = "R1",
    Rank2 = "R2",
    Rank3 = "R3",
    Rank4 = "R4",
    Rank5 = "R5",
}
export type Card = {
    idx : number,
    colour: CardColour, 
    rank: CardRank
}
export type Player = {
    playerId? : number 
    name : string
    turnIdx? : number
    hand? : Card[]
}
