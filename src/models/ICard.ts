export interface ICard {
    id : number;
    title: string;
    description: string;
    imgUri: string;
    dateCreated: Date;
    isStarred: boolean;
    data? : [];
}

export interface GetCardResult {
    data : []
}

export interface ICardComponent {
    id : number;
    title: string;
    description: string;
    imgUri: string;
    dateCreated: Date;
    isStarred: boolean;
    onDeleteClick: any;
}
