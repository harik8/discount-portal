import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import AddDiscount from './components/AddDiscount';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

export const REACT_APP_GOOGLE_CLIENT_ID = '582904936009-gog3ia1eq2ded6fqol1p6gchsc9ogp6f.apps.googleusercontent.com'
export const REACT_APP_AUTHORISED_USERS = ['khprasaad@gmail.com']

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