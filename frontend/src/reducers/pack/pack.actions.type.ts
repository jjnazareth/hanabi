import { Action } from 'redux';
import { Card } from '../../globalTypes'

export type InitPack = Action<PackActionNames.INIT_PACK> & {
    pack : Card[]
}

export type PackAction = InitPack ;

export enum PackActionNames {
    INIT_PACK = 'INIT_PACK',
}


