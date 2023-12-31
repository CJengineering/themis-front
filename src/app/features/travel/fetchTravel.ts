import {UnknownAction, Dispatch, ThunkAction} from "@reduxjs/toolkit";
import { TravelGateway } from "@/interfaces";
import { AppState } from "../store";
import { travelFetched } from "./travelSlice";


type ThunkResult<D> = ThunkAction<void, AppState, D, UnknownAction>;

    export  const fetchTravels = (url:string, id?:number): ThunkResult<{travelGateway:TravelGateway}>=>{
        return async (dispatch:Dispatch<any>, getState, {travelGateway}) => {
            const travels = await travelGateway.fetchTravels(url, id);
            dispatch(travelFetched(travels));
    }
    
}