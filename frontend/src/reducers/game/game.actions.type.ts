import { Action } from 'redux';
import { Card } from '../pack/pack.actions.type'

export type InitGame = Action<GameActionNames.INIT_GAME> & {
    game : Game
}

export type AddPlayer = Action<GameActionNames.INIT_GAME> &  {
    player : Player
}

export type Game = {
    players : Player[],
    deck : Card[],
    discards : Card[]
}

export type Player = {
    name : string,
    turnIdx : number,
    hand : Card[]    
}

export enum GameActionNames {
    INIT_GAME = 'INIT_GAME'
}