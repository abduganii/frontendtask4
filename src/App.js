import React from 'react';
import UnauthenticatedApp from './UnauthenticatedApp';
import AuthenticatedApp from './AuthenticatedApp';
import useToken from './Hooks/useToken';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [token] = useToken();


  if (token) {
    return <AuthenticatedApp />;
  } else {
    return <UnauthenticatedApp />;
  }
}

export default App;