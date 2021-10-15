import { getBooks_URL } from "../api";
import {GET_BOOKS} from '../types';
import LoadImageUrl from "../../component/LoadImage"

export const getBooks =  (setLoading) => async (dispatch) => {
    try {
        setLoading(true);
        const result = await fetch(getBooks_URL, 
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = await result.json();
        for (var i= 0; i < data.length; i++) {
            const url= await LoadImageUrl(data[i].Image);
            data[i].ImageURL = url;
        }
        dispatch({
            type: GET_BOOKS,
            payload: data,
        })
        setLoading(false);
        return result.status;
    }
    catch (err) {
       console.error(err);
       setLoading(false);
    }
}