


export type Game = {
    drawDeck : Card[]
    discards : Card[]
    buildPile : Card[]
    currentTurnIdx : number
    dealerIdx : number
}

/* export enum CardColour {
    WHITE = "White", //"WHITE",
    YELLOW = "#FFCC66",  //"YELLOW",
    GREEN = "#00CC00",  //""GREEN",
    BLUE = "#0066CC", //"BLUE",
    RED = "#CC0033", //"RED",
    MULTI = "#9900FF", //"MULTI"
} */

export enum CardRank {
    Rank1 = "1",
    Rank2 = "2",
    Rank3 = "3",
    Rank4 = "4",
    Rank5 = "5",
} 
export type CardColour = 
{   name : string, code : string}

export type Card = {
    idx : number,
    colour: CardColour, 
    rank: CardRank
}
export type Player = {
    playerId : number 
    name : string
    turnIdx : number
    hand : Card[]
}
