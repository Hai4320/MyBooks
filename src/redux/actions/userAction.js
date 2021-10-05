import {LOGIN, LOGOUT} from "../types"
import {register_URL,login_URL} from "../api"


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
    console.log(data);
    setLoading(false);
    return {status: result.status, data: data};
  }
  catch(err){
    setLoading(false);
    return err;
  }
}