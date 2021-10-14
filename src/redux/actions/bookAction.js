import { getBooks_URL } from "../api";
import {GET_BOOKS} from '../types';

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