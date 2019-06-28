import {HomeAvailabilityEnum} from "../enums/HomeEnums";

export interface IHome {
    id?: number;
    title: string;
    description: string;
    available: HomeAvailabilityEnum;
    rent: number;
    totalRooms: number;
    totalArea: number;
    address: string;
    latitude: number;
    longitude: number;
    userId: number;
}
