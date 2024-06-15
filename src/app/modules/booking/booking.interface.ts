import { Types } from "mongoose"


export type TBooking = {
    carId: Types.ObjectId;
    date: string;
    startTime: string;
    endTime?: string;
    user?: Types.ObjectId;
    car?: Types.ObjectId;
    totalCost?:number

}