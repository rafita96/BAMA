import React, { useEffect, useState } from 'react'
import Layout from '../components/layouts/Layout'
import Pacients from '../components/Pacients'

import {api} from '../lib/api';
import withAuthentication from '../lib/withAuthentication';

import { Row, Col } from 'react-bootstrap';

import { useRouter } from 'next/router'

import { connect } from 'react-redux';
import { pacientActions } from '../store/_actions/pacientActions';

function Home({pacient, select, user}) {

  const router = useRouter();
  const [pacients, setPacients] = useState(null);

  let asked = false;

  useEffect(()=>{
    console.log(user.role);
    if(user.role === 'ROLE_ADMIN'){
        const callPacients = async () => {
          asked = true;
          let res = await api.getPacients(user.token);
          if(res){
            setPacients(res.data['pacients']);
          }
        }
    
        if(!pacients && !asked){
          callPacients();
        }
    }else{
      router.push("/paciente/perfil");
    }

  }, [pacients]);

	const _selectPacient = (_id) => {
		select(_id);
    router.push("/paciente/perfil");
	};

	if (!pacients){
		return (
			<Layout title="Inicial">
			<div>Cargando...</div>
			</Layout>
		);
	}

  return (
    <Layout title="Inicial" role={user.role}>

    	<Row className="my-4">
    		<Col className="text-center">
		    	<h1>Pacientes</h1>
    		</Col>
    	</Row>

    	<Pacients pacient={pacient} pacients={pacients} selectPacient={_selectPacient} />
    	
    	
    </Layout>
  );
}

const mapStateToProps = state => ({
    pacient: state.pacients.pacient,
    user: state.users.user
});

const mapDispatchToProps = {
    select: pacientActions.select
};

export default withAuthentication(connect(mapStateToProps, mapDispatchToProps)(Home));