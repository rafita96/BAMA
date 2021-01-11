import { Navbar, Nav, NavDropDown } from 'react-bootstrap';
import Image from 'next/image'
import Link from 'next/link'

function _Navbar({role}){

	let links = [];

	if(role === 'ROLE_ADMIN'){
		links.push(<Link href="/"><a className="nav-link text-white">Pacientes</a></Link>);
	}
	
	links.push(<Link href="/paciente/perfil"><a className="nav-link text-white">Perfil</a></Link>);
	links.push(<Link href="/juegos"><a className="nav-link text-white">Juegos</a></Link>);
	links.push(<Link href="/logout"><a className="nav-link text-white">Cerrar Sesión</a></Link>);

	return(
		<Navbar sticky="top" expand="lg" variant="dark" bg="dark" className="bg-cardhead">
			<img src="/img/navlogo.png"  style={{maxWidth: "30%", margin: "auto"}}/>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					{links.map(link => (
						<li className="nav-item px-2">
							{link}
						</li>
					))}
	
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default _Navbar;