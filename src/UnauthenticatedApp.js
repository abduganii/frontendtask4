import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/login';
import Registor from './components/registor/registor';


function UnauthenticatedApp() {
	return (
		<>
		<Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registor" element={< Registor/>} />
      </Routes>
			
		</>
	);
}

export default UnauthenticatedApp;