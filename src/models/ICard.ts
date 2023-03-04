export interface ICard {
    id? : number;
    title: string;
    description: string;
    imgUri: string;
    dateCreated: Date;
    isStarred: boolean;
}