import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import AddDiscount from './components/AddDiscount';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
export const AUTHORISED_USERS = process.env.REACT_APP_AUTHORISED_USERS;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/adddiscount"
          element={
            <ProtectedRoute redirectTo="/">
              <AddDiscount />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;