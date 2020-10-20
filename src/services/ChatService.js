import axios from 'axios'
const url = process.env.REACT_APP_ENDPOINT


export const fetchFriendMessages = async (friend_id) => {
    let token = localStorage.token && JSON.parse(localStorage.token)
    try{
        const res = await axios.get(`${url}/api/user/chat/${friend_id}/get_messages`,{headers:{
            Authorization:`Bearer ${token}`
        }})
        return {
            data:res.data
        }

    }catch(err){
        console.log(err)
    }

}