import {LOGIN, LOGOUT} from "../types"
import {register_URL} from "../api"

export const registerUser = async (user, setLoading) => async (dispatch) => {
      setLoading(true);
      try {
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
      }
  };