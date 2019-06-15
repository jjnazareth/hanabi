
export type Game = {
    drawDeck : Card[]
    discards : Card[]
    buildPile : Card[]
    currentTurnIdx : number
    dealerIdx : number
}


export enum CardRank {
    Rank0 = "", // dummy card
    Rank1 = "1",
    Rank2 = "2",
    Rank3 = "3",
    Rank4 = "4",
    Rank5 = "5",
} 
export type CardColour = 
{   name : string, code : string}


let arrC = [
    {name: "White", code: "#FFFFFF"},
    {name: "Yellow", code: "#FFCC66"},
    {name: "Green", code: "#00CC00"},
    {name: "Blue", code: "#0066CC"},
    {name: "Red", code: "#CC0033"},
    {name: "Multi",  code: ""}, // code:"#9900FF"} 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
]

export type Card = {
    idx : number | string,
    colour: CardColour, 
    rank: CardRank
}
export type Player = {
    playerId : number 
    name : string
    turnIdx : number
    hand : Card[]
}

export type DiscardPile = 
    { colour : string, cards: Card[] } 
    

