import React from 'react';
import Layout from '../../components/layouts/Layout'
import fs from "fs";
import dynamic from 'next/dynamic'
// import Ejercicio from '../../public/juegos/series/components/Ejercicio'
import Link from 'next/link';
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

import _Main from '../../components/games/_Main';

import { Row, Col } from 'react-bootstrap';
// import { PacientContext } from '../../store/PacientProvider'

import withAuthentication from '../../lib/withAuthentication';
import { connect } from 'react-redux';

function Home({data, pacient, user}) {

  let content;
  if(pacient){
    const Main = dynamic(() => 
        import('../../public/juegos/'+data.filename+"/Main"),
        {
          loading: () => <p>Cargando...</p>
        }
      );

    content = (<_Main pacient={pacient} user={user} metadata={data}>
                <Main />
              </_Main>)
  }else{
    content = <p>Usted no puede jugar sin antes haber seleccionado un paciente.</p>
  }


  return (
    <Layout title="Home">
      <Row className="my-4">
        <Col sm="12" className="text-center">
          <h1>{data.nombre}</h1>
        </Col>
      </Row>
      <Row className="my-4">
        {content}
      </Row>
    </Layout>
  );
}

// This gets called on every request
export async function getStaticProps({params}) {
  // const router = useRouter();
  // const { folder, filename } = router.query;
  let data = JSON.parse(fs.readFileSync("public/juegos/"+params.juego+"/meta.json", 'utf8'));
  let config = {}
  try {
    if (fs.existsSync("public/juegos/"+params.juego+"/data/config.json")) {
      config = JSON.parse(fs.readFileSync("public/juegos/"+params.juego+"/data/config.json", 'utf8'));
    }
  } catch(err) {
    console.error(err)
  }
  data.filename = params.juego;
  data.config = config;
  // let data = params.juego;
  return {
    props: {data}
  }
  // Fetch necessary data for the blog post using params.id
}

export async function getStaticPaths(){
  const fileNames = fs.readdirSync('public/juegos/');
  const paths = fileNames.map(filename => (
      {
        params: {juego: filename}
      }
    ));

  return {
    paths,
    fallback: false
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     selectPacient: bindActionCreators(selectPacient, dispatch),
//   }
// }

const mapStateToProps = state => ({
    pacient: state.pacients.pacient,
    user: state.users.user
});

const mapDispatchToProps = {};

export default withAuthentication(connect(mapStateToProps, mapDispatchToProps)(Home));