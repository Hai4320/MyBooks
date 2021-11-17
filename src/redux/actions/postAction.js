import {getAllPosts_URL} from '../api'
import { GET_POSTS } from '../types'
import LoadImageUrl from "../../component/LoadImage"
import { userData } from '../../component/AsyncStorage'

export const getPosts= (setLoading) => async (dispatch) => {
    try {
        setLoading(true);
        const user = await userData();
        const result = await fetch(getAllPosts_URL, 
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = await result.json();
        for (var i= 0; i < data.length; i++)
        if(data[i].image!=="")
        {
            const url= await LoadImageUrl(data[i].image);
            data[i].imageURL = url;
        }

        dispatch({
            type: GET_POSTS,
            payload: {
                posts: data,
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