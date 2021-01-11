import { userServices } from '../../lib/user-helpers';
import { userConstants } from '../_constants/userConstants';
import { alertActions } from './alertActions';

export const userActions = {
	login,
	logout
}

function login(username, password){
	return dispatch => {
		dispatch(request({username}));

		userServices.login(username, password).then( (user) => {
			if(user){
		      	dispatch(success(user));
			}else{
				let error = "Usuario o clave incorrecta.";
		      	dispatch(alertActions.error(error));
		      	dispatch(failure(error));
			}
		});

	}

	function request(user) { return { type: userConstants.LOGIN_REQUEST, user: user} };
	function success(user) { return { type: userConstants.LOGIN_SUCCESS, user: user } };
	function failure(error) { return { type: userConstants.LOGIN_FAILURE, error: error } };
}

function logout(){
	// Borrar la cookie
	return { type: userConstants.LOGOUT };
}