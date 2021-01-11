// import pacientServices from '../../services/pacientServices';
import {pacientConstants} from '../_constants/pacientConstants';

export const pacientActions = {
	select
}

function select(_id){
	return { 
		type: pacientConstants.SELECT, 
		pacient: _id 
	};
}