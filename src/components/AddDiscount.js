import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router';

import { GOOGLE_CLIENT_ID } from '../App';

function AddDiscount() {
  let navigate = useNavigate();
  const isLoggedOut = () => {
    localStorage.removeItem('Authenticated')
    navigate('/')
  }

  return (
    <div className="container is-widescreen">
      <nav className="navbar is-info">
      <div className="navbar-start">
        <a className="navbar-item">
          <b>Home</b>
        </a>
        <a className="navbar-item" href="#">
          <b>Discounts</b>
        </a>
      </div>
      <div className="navbar-end">
        <a className="navbar-item">
        <GoogleLogout
          clientId={GOOGLE_CLIENT_ID}
          onLogoutSuccess={isLoggedOut}
          buttonText="Logout"
          icon={false}>
        </GoogleLogout>
        </a>
      </div>
      </nav>
      <div className="container is-widescreen">
        <div className="column is-full">
          <div className="box">
            <form>
              <div className="field">
                <label className="label">Description</label>
                 <div className="control">
                  <textarea className="textarea is-hovered" rows="5" required/>
                </div>
              </div>
              <div className="field">
                <label className="label">Image link</label>
                 <div className="control">
                  <input className="input is-hovered" type="text" name="link" required/>
                 </div>
              </div>
              <div className="field">
                <label className="label">Subscribers</label>
                 <div className="control">
                  <textarea className="textarea is-hovered" rows="10" required/>
                </div>
              </div>
              <div className="buttons are-medium">
               <button align="center" type="submit" className="button is-info is-normal"><b>Send</b></button>
               <button type="reset" className="button is-info is-normal"><b>Cancel</b></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDiscount;