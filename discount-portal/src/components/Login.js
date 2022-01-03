import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

import { REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_AUTHORISED_USERS } from '../App';

function Login() {
  let navigate = useNavigate()

  const validateLogin = (response) => {
    console.log("Authenticated User is - ", response.profileObj.email)

    if (REACT_APP_AUTHORISED_USERS.includes(response.profileObj.email)) {
      localStorage.setItem('Authenticated', true)
      navigate('/adddiscount')
    } else {
      navigate('/')
      alert("Login Failed or You're not authorized to Access.")
    }
  }

  return (
    <div className="section is-fullheight">
      <div className="container"> 
        <div className="column is-4 is-offset-4">
          <div className="box">
            <form>
              <div className="field" align="center">
                <label className="label">DISCOUNT PORTAL</label>
              </div>
              <div align="center">
                <GoogleLogin
                 clientId={REACT_APP_GOOGLE_CLIENT_ID}
                 buttonText="Sign in with Google"
                 onSuccess={validateLogin}
                 onFailure={validateLogin}
                 cookiePolicy={'single_host_origin'}
                 style={{ marginTop: '100px' }}
                 isSignedIn={true}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;