import { Image } from './image.model';

export interface Track {
    id: string;
    name: string;
    popularity: number;
    albumImages: Image[];
}