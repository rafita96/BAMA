import axios from 'axios'
import Router from 'next/router';

const apiURL = process.env.SERVER_URL;

const getAccessConfig = (token) => ({ headers: {'access-token': token}})

const manageResponse = (res) => {
	if(res.data.status == 401){
		if(res.data.message === 'TokenExpiredError'){
			Router.push('/logout');
		}
		return true;
	}

	return false;
}

export const api = {
		addScore: (payload, token, callback=()=>{}) => {

			axios.post(apiURL+'/pacients/score', payload, getAccessConfig(token)).then((res)=>{
				let err = manageResponse(res);
				callback()
			});
		},

		addPacient: async (payload, token, callback=()=>{}) => {
			let res = await axios.post(apiURL+'/pacients', payload, getAccessConfig(token)).then((res)=>{
				
				let err = manageResponse(res);
				if(err){
					callback(null);
				}else{
					callback(res.data);
				}

			});
		},

		getProfile: (_id, token, callback=()=>{}) => {
			axios.get(apiURL+'/pacients/profile/'+_id, getAccessConfig(token)).then((res)=>{

				let err = manageResponse(res);
				if(err){
					callback(null);
				}else{
					callback(res.data);
				}
			});
		},

		getPacients: async (token) => {
			let res = await axios.get(apiURL+'/pacients', getAccessConfig(token));
			let err = manageResponse(res);
			if(err){
				return null;
			}
			return res;
		},

		login: (payload, callback=()=>{}) => {
			axios.post(apiURL+'/login', payload).then((res)=>{
				callback(res.data);
			});
		}
	}
