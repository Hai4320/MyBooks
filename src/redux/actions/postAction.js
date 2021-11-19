import {getAllPosts_URL, getPostHistory_URL, viewPost_URL, likePost_URL, getUserPost_URL, getComments_URL, createComments_URL} from '../api'
import { GET_POSTS,VIEW_POSTS, GET_MY_POSTS, GET_COMMENTS_POST} from '../types'
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
        const result2 = await fetch(getPostHistory_URL, 
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID: user.id
                })
            }
        );
        const data2 = await result2.json();
        dispatch({
            type: GET_POSTS,
            payload: {
                posts: data,
                history: data2,
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

export const viewPost= (postID) => async (dispatch) => {
    try {
        const user = await userData();
        const result = await fetch(viewPost_URL, 
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID: user.id,
                    postID: postID,
                })
               
            }
        );
        const data = await result.json();
        dispatch({
            type: VIEW_POSTS,
            payload: data
        });
    } catch (error) {
        
    }

}
export const likePost= (postID) => async (dispatch) => {
    try {
        const user = await userData();
        const result = await fetch(likePost_URL, 
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID: user.id,
                    postID: postID,
                })
               
            }
        );
        const data = await result.json();
        dispatch({
            type: VIEW_POSTS,
            payload: data
        });
    } catch (error) {
        
    }

}
export const getMyPost= () => async (dispatch) => {
    try {
        const user = await userData();
        const result = await fetch(getUserPost_URL, 
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID: user.id
                })
               
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
            type: GET_MY_POSTS,
            payload: data
        });
    } catch (error) {
        
    }

}
export const getComments = (postID,setLoading) => async (dispatch) =>{
    try {
        setLoading(true);
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
                    focusID: postID,
                    type: 2,
                })

            }
        );

        const {commentList} = await result.json();
        if (result.status===200){
            for (var i= 0; i < commentList.length; i++)
            if(commentList[i].userAvatar!=="")
            {
                const url= await LoadImageUrl(commentList[i].userAvatar);
                commentList[i].avatarURL = url;
            }
            dispatch({
                type: GET_COMMENTS_POST,
                payload: commentList
            });
        }
        setLoading(false);
    } catch (error) {
        console.error(error);
        setLoading(false);
    }
}
export const createComments = (postID, text) => async (dispatch) =>{
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
                    focusID: postID,
                    type: 2,
                    details: text
                })

            }
        );
        const {commentList} = await result.json();
        if (result.status===200){
            for (var i= 0; i < commentList.length; i++)
            if(commentList[i].userAvatar!=="")
            {
                const url= await LoadImageUrl(commentList[i].userAvatar);
                commentList[i].avatarURL = url;
            }
            dispatch({
                type: GET_COMMENTS_POST,
                payload: commentList
            });
        }
       
    } catch (error) {
        console.error(err);
    }
}