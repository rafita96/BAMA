import React, { useEffect } from 'react'

import { useRouter } from 'next/router';

import { connect } from 'react-redux';
import { userActions } from '../store/_actions/userActions';

function Logout({logout}) {

  const router = useRouter();

  useEffect(()=>{
    if(router){
  	  router.push('/login');
      logout();
    }
  }, [router]);

  return (
    <div>Cerrando sesión...</div>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
    logout: userActions.logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);