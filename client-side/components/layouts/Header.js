import Head from 'next/head';

function _Header({title}){
	return(
		<Head>
			<title>{title}</title>
			<link rel="icon" href="/favicon.png"/>
			<link rel="stylesheet" href="/css/base.css"/>
		</Head>
	);
}

export default _Header;