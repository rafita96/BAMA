import React from 'react';

import Layout from '../../components/layouts/Layout'
import { Row, Col, Form, Button } from 'react-bootstrap';

import Link from 'next/link';
import { useRouter } from 'next/router'

import { api } from '../../lib/api'
import withAuthentication from '../../lib/withAuthentication';
import { connect } from 'react-redux';
import { ToastContext } from '../../components/toastr/ToastProvider'

function Agregar({user}) {
    const router = useRouter();

    const _context = React.useContext(ToastContext);

    const validate = (e) => {
        e.preventDefault();
        var userData = {};

        for (var i = 0; i < e.target.elements.length; i++) {
            let input = e.target.elements[i];
            if(input["id"] != ""){
                if(input.value === ""){
                    return false;
                }else{
                    userData[input["id"]] = input.value;
                }
            }
        }

        userData["birthday"] = new Date(userData["birthday"]); 
        return userData;
    };

    function handleForm(e){

        let userData = validate(e);
        if(userData){
            api.addPacient(userData, user.token, (res) => {
              if(res.status == 200){
                router.push('/');
              }else{
                _context.addToast("Error al guardar");
              }
            });
        }
    }

  return (
    <Layout title="Agregar paciente">

    	<Row className="my-4">
    		<Col sm="12" md="10">
		    	<h1>Agregar Paciente</h1>
    		</Col>
            <Col sm="12" md="2">
                <Link href="/"><a className="btn">Regresar</a></Link>
            </Col>
    	</Row>
    	<Row className="my-4">
            <Col>
                <Form onSubmit={handleForm}>
                  <Form.Group controlId="noExp">
                    <Form.Label>Número de expediente</Form.Label>
                    <Form.Control type="text" />
                    <Form.Text className="text-muted">
                      También es el usuario del paciente.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>

                  <Form.Group controlId="firstLastName">
                    <Form.Label>Apellido Paterno</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>

                  <Form.Group controlId="secondLastName">
                    <Form.Label>Apellido Materno</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>

                  <Form.Group controlId="birthday">
                    <Form.Label>Día de nacimiento</Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                  
                  <Button variant="primary" type="submit">
                    Guardar
                  </Button>
                </Form>
            </Col>
        </Row>
    </Layout>
  );
}

const mapStateToProps = state => ({
    user: state.users.user
});

const mapDispatchToProps = {
};

export default withAuthentication(connect(mapStateToProps, mapDispatchToProps)(Agregar));