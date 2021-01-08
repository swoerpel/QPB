import { Image } from './image.model';

export interface Artist {
    id: string;
    name: string;
}

export interface ArtistRobust extends Artist {
    images: Image[];
    popularity: number;
    genres: string[];
    followers: number;
}

