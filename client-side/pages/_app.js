import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import 'react-circular-progressbar/dist/styles.css';
import '../styles.css';

import { ToastProvider } from '../components/toastr/ToastProvider';

import { wrapper } from '../store/store';


function MyApp({ Component, pageProps }) {

  return (
  	<ToastProvider>
		<Component {...pageProps} />
	</ToastProvider>
  );

}

export default wrapper.withRedux(MyApp);