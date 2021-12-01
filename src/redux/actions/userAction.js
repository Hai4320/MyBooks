import {LOGIN, GET_NOTIFY} from "../types"
import {register_URL,login_URL, updateUser_URL, getNotify_URL} from "../api"
import { userData } from '../../component/AsyncStorage'


export const registerUser = (user, setLoading) => async (dispatch) => {
      try {
        setLoading(true);
        const result = await fetch(register_URL, 
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }
        );
        setLoading(false);
        return result;
      }
      catch(err){
        setLoading(false);
        return err;
      }
  };

export const loginUser = (user, setLoading) => async (dispatch) => {
  try{
    setLoading(true);
    const result = await fetch(login_URL,{
      method: 'POST',
      headers: 
      {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    const data = await result.json();
    if (result.status===200) {}
    dispatch({
      type: LOGIN,
      payload: data,
    });
    setLoading(false);
    return {status: result.status, data: data};
  }
  catch(err){
    setLoading(false);
    return err;
  }
}
export const updateUser = (data, setLoading) => async (dispatch) => {
  try{
    setLoading(true);
    const user = await userData();
    const result = await fetch(updateUser_URL,{
      method: 'POST',
      headers: 
      {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: user.id,
        name: data.name,
        avatar: data.avatar,
        password: data.password,
        new_password: data.new_password,
        change_password: data.change_password,
        change_avatar: data.change_avatar,
      })
    });
    const datax = await result.json();
    if (result.status===200)
    dispatch({
      type: LOGIN,
      payload: datax.data,
    });
    setLoading(false);
    return {status: result.status, data: datax};
  }
  catch(err){
    setLoading(false);
    return err;
  }
}

//
export const getNotification = () => async (dispatch) =>{
  try {
      const user = await userData();
      const result = await fetch(getNotify_URL, 
          {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },  
              body: JSON.stringify({
                  userID: user.id,
              })

          }
      );
      const data = await result.json();
      if (result.status===200){
        dispatch({
          type: GET_NOTIFY,
          payload: data
      });
      }
     
  } catch (error) {
      console.error(err);
  }
}
