import { Image } from './image.model';

export interface Track {
    id: string;
    name: string;
    popularity: number;
    duration_ms: number;
    albumImages: Image[];
}