export interface ICard {
    id : number;
    title: string;
    description: string;
    imgUri: string;
    dateCreated: Date;
    isStarred: boolean;
    data? : [];
}

export interface ICardEffect{
    id : number;
    title: string;
    description: string;
    imgUri: string;
    dateCreated: Date;
    isStarred: boolean;
    downloadedUri: string;
    data? : [];
}

export interface IGetCardById {
    id : number;
    title: string;
    description: string;
    imgUri: string;
    dateCreated: Date;
    isStarred: boolean;
}

export interface IGetCardById2 {
    type: string;
    data: IGetCardById[];
    message: string;
}

export interface GetCardResult {
    data : []
}

export interface ICardComponent {
    id : number;
    title: string;
    description: string;
    dateCreated: Date;
    isStarred: boolean;
    downloadedUri: string;
    onDeleteClick: any;
    onUpdateClick: any;
}
