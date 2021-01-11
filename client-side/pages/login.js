import React, { useEffect, useRef } from 'react'

import _Header from '../components/layouts/Header'
import {api} from '../lib/api';

import { ToastContext } from '../components/toastr/ToastProvider'

import { Row, Col, Container, Form, Button } from 'react-bootstrap';

import { useRouter } from 'next/router';

import { connect } from 'react-redux';
import { userActions } from '../store/_actions/userActions';
import { alertActions } from '../store/_actions/alertActions';

function Login({ user, login, loggingIn, message, clearAlerts }) {

  const router = useRouter();
  const _context = React.useContext(ToastContext);

  const username = useRef();
  const password = useRef();

  if(message){
    _context.addToast(message);
    clearAlerts();
  }


  const handleForm = async (e) => {
    e.preventDefault();

    if(!loggingIn){
      login(username.current.value, password.current.value)
    }

  }

  useEffect(()=>{
    if(user){
      router.push("/");
    }
  }, [user]);


  if(user){
    return(<div>Cargando...</div>)
  }


  return (
    <div>
    <_Header title="Login" />

    <main className="bg-cardhead" style={{height: "100vh"}}>
      <Container> 
        <Row style={{height: "100vh"}}> 
          <Col className="my-auto" sm="12">
            <div style={{borderRadius: "18px"}} className="card bg-card">

              <div className="card-body">
                <h3 className="text-accent" 
                  style={{textAlign: "center", fontSize: "40px"}}>
                  Iniciar Sesión</h3>
                    <Row>
                      <div className="text-accent text-center col d-none d-lg-block" >   
                        <img 
                          src="img/logo.png"  
                          alt="logo" 
                          style={{margin: "auto", 'maxWidth': "100%"}} />
                      </div>

                      <Col className="my-auto">
                        <Form onSubmit={handleForm}>

                          <Form.Group controlId="username">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control name="username" type="text" 
                                style={{height: "50px", borderRadius: "30px", fontSize: "24px"}}
                                className="bg-input input-brdr" ref={username} />
                            <Form.Text className="text-muted">
                              Si usted es un paciente, el usuario es su Número de Expediente.
                            </Form.Text>
                          </Form.Group>

                          <Form.Group controlId="password">
                            <Form.Label>Clave</Form.Label>
                            <Form.Control ref={password} name="password" type="password" 
                                style={{height: "50px", borderRadius: "30px", fontSize: "24px"}}
                                className="bg-input input-brdr" />
                          </Form.Group>
            
                          <Form.Group controlId="submit" style={{textAlign: 'center'}}>
                            <Button type="submit" className="btn-principal" style={{borderRadius: "25px", backgroundColor: "#7ed872"}}><h5>Iniciar sesión</h5></Button>
                          </Form.Group>
                        </Form>  
                      </Col>
                  </Row>
              </div>

            </div>
          </Col>
        </Row>
      </Container>
    </main>
  </div>
  );
}


const mapStateToProps = state => ({
    user: state.users.user,
    loggingIn: state.users.loggingIn,
    message: state.alerts.message
});

const mapDispatchToProps = {
    login: userActions.login,
    clearAlerts: alertActions.clear
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);