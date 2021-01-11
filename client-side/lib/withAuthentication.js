import { useEffect } from 'react'
import { useSelector } from "react-redux";
import Router from 'next/router';

const withAuthentication = WrappedComponent => {
  const RequiresAuthentication = props => {
     // get user role from redux state
   const user = useSelector(({ users }) => users.user);

   useEffect(() => {
     // if a there isn't a logged in user and their role has been set to "guest"
     // then redirect them to "/signin"
     if(!user) Router.push('/login');
   }, [user]);

     // if there's a loggedInUser, show the wrapped page, otherwise show a loading indicator
    return user ? <WrappedComponent {...props} /> : <div>Cargando...</div>;
  };

  return RequiresAuthentication;
};

export default withAuthentication;