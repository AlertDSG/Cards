export enum sortPacks {
    INCR_UPDATE = '1updated',
    DESC_UPDATE = '0updated',
    INCR_CARDS_COUNT = '1cardsCount',
    DESC_CARDS_COUNT = '0cardsCount',
    INCR_NAME = '1name',
    DESC_NAME = '0name',
    INCR_CREATED = '1created',
    DESC_CREATED = '0created',
}

export type SortType = 'incr' | 'decr'

export type NameCellType = 'packName' | 'cards' | 'update' | 'created' | 'action'| 'updateCard' | 'Question' | 'Answer' | 'Grade' | 'Action'