import _Header from './Header'
import _Navbar from './Navbar'

import { Container, Row, Col } from 'react-bootstrap';

export default function Layout({title, children, role}) {
  return (
  <div>
  	<_Header title={title} />
  	<header>
  		<_Navbar role={role} />
  	</header>
  	<main>
  		<Container>
  		{children}
  		</Container>
  	</main>
  </div>
  );
}