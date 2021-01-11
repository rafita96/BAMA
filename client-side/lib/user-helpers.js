import {api} from '../lib/api';

export const userServices = {
  login
}

function login(username, password){

  return new Promise( resolve => {

    let credentials = {username, password};

    api.login(credentials, (res) => {

        if(res.status == 200 && res.token != null){
          let user = {"token": res.token, "role": res.role};
          // window.localStorage.setItem('user', user);
          resolve(user);
        }else{
          resolve(null);
        }

      });
  } );

}