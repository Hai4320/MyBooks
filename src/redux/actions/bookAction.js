import { getBooks_URL, getBooksHistorys_URL, likeBook_URL, viewBook_URL,saveBook_URL, getComments_URL, createComments_URL} from "../api";
import {GET_BOOKS, LIKE_BOOK, GET_COMMENTS} from '../types';
import LoadImageUrl from "../../component/LoadImage"
import { userData } from '../../component/AsyncStorage'

export const getBooks =  (setLoading) => async (dispatch) => {
    try {
        setLoading(true);
        const user = await userData();
        const result = await fetch(getBooks_URL, 
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        const result2 = await fetch(getBooksHistorys_URL, 
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },  
                body: JSON.stringify({
                    id: user.id,
                })

            }
        );
        const data = await result.json();
        for (var i= 0; i < data.length; i++) {
            const url= await LoadImageUrl(data[i].Image);
            data[i].ImageURL = url;
        }
        const data2 = await result2.json();
        dispatch({
            type: GET_BOOKS,
            payload: {
                data1: data,
                data2: data2,
            }
        });
        setLoading(false);
        return result.status;
    }
    catch (err) {
       console.error(err);
       setLoading(false);
    }
}
export const likeBook = (bookID) => async (dispatch) =>{
    try {
        const user = await userData();
        const result = await fetch(likeBook_URL, 
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },  
                body: JSON.stringify({
                    userID: user.id,
                    bookID: bookID
                })

            }
        );
        console.log(result.status);
        const data = await result.json();
        dispatch({
            type: LIKE_BOOK,
            payload: data
        });
    } catch (error) {
        console.error(err);
    }
}
export const viewBook = (bookID) => async (dispatch) =>{
    try {
        const user = await userData();
        const result = await fetch(viewBook_URL, 
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },  
                body: JSON.stringify({
                    userID: user.id,
                    bookID: bookID
                })

            }
        );
        console.log(result.status);
        const data = await result.json();
        dispatch({
            type: LIKE_BOOK,
            payload: data
        });
    } catch (error) {
        console.error(err);
    }
}
export const saveBook = (bookID) => async (dispatch) =>{
    try {
        const user = await userData();
        const result = await fetch(saveBook_URL, 
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },  
                body: JSON.stringify({
                    userID: user.id,
                    bookID: bookID
                })

            }
        );
        console.log(result.status);
        const data = await result.json();
        dispatch({
            type: LIKE_BOOK,
            payload: data
        });
    } catch (error) {
        console.error(err);
    }
}
export const getComments = (bookID) => async (dispatch) =>{
    try {
        const user = await userData();
        const result = await fetch(getComments_URL, 
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },  
                body: JSON.stringify({
                    userID: user.id,
                    focusID: bookID,
                    type: 1,
                })

            }
        );

        const data = await result.json();
        dispatch({
            type: GET_COMMENTS,
            payload: data
        });
    } catch (error) {
        console.error(err);
    }
}
export const createComments = (bookID, text) => async (dispatch) =>{
    try {
        const user = await userData();
        const result = await fetch(createComments_URL, 
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },  
                body: JSON.stringify({
                    userID: user.id,
                    focusID: bookID,
                    type: 1,
                    details: text
                })

            }
        );
        const data = await result.json();
        dispatch({
            type: GET_COMMENTS,
            payload: data
        });
    } catch (error) {
        console.error(err);
    }
}