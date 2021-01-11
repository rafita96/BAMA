import React, { useEffect, useState } from 'react';

import Layout from '../../components/layouts/Layout'
import Profile from '../../components/Profile'

import { Row, Col, Form, Button } from 'react-bootstrap';

import Link from 'next/link';
// import { connect } from 'react-redux'
import withAuthentication from '../../lib/withAuthentication';
import { connect } from 'react-redux';

import { api } from '../../lib/api'

function Perfil({pacient, user}) {

	const [data, setData] = useState(null);

	let asked = false;

	useEffect(()=>{
		if(!data && !asked){
			asked = true;
			api.getProfile(pacient, user.token, (res)=>{
				if(res){
					setData(res.pacient);
				}
			});
		}
	}, [data]);

	let content;
	if(!data){
		content = <div>Cargando...</div>
	}else{
		content = <Profile pacient={data} />
	}

  return (
    <Layout title="Perfil" role={user.role}>
    	{content}
    </Layout>
  );
}

const mapStateToProps = state => ({
    user: state.users.user,
    pacient: state.pacients.pacient
});

const mapDispatchToProps = {
};

export default withAuthentication(connect(mapStateToProps, mapDispatchToProps)(Perfil));