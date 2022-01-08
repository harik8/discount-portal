import React, { Component } from 'react';
import axios from 'axios';

import { GoogleLogout } from 'react-google-login';

import { API_END_POINT, GOOGLE_CLIENT_ID } from '../App';
import Logout from '../Logout';

import moment from "moment";

class AddDiscount extends Component {
  
  constructor(props) {
    super(props);
    this.onChangeDiscountMessage = this.onChangeDiscountMessage.bind(this);
    this.onChangeDiscountPoster = this.onChangeDiscountPoster.bind(this);
    this.onChangeSubscribersList = this.onChangeSubscribersList.bind(this);
    this.onChangeValidFor = this.onChangeValidFor.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      discount_message: '',
      discount_poster: '',
      subscribers_list:'',
      valid_for: ''
    }
  }
  
  onChangeDiscountMessage(e) {
    this.setState({
      discount_message: e.target.value
    });
  }

  onChangeDiscountPoster(e) {
    this.setState({
      discount_poster: e.target.value
    })  
  }

  onChangeSubscribersList(e) {
    this.setState({
      subscribers_list: e.target.value
    })
  }

  onChangeValidFor(e) {
    this.setState({
      valid_for: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      discount_message: this.state.discount_message,
      discount_poster: this.state.discount_poster,
      subscribers_list: this.state.subscribers_list,
      added_date: moment().format("DD-MM-YYYY"),
      valid_for: this.state.valid_for,
      expireed_date: moment().add(this.state.valid_for, 'days').format("DD-MM-YYYY")
    };

    let headers = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    
    axios.post(`${API_END_POINT}/adddiscount`, {
      obj}, headers)
      .then((response) => {
      console.log(response);
      }, (error) => {
      console.log(error);
      });
    
    // this.setState({
    //   discount_message: '',
    //   discount_poster:  '',
    //   subscribers_list: ''
    // })
  }
 
  render() {
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
        onLogoutSuccess={Logout}
        buttonText="Logout"
        icon={false}>
      </GoogleLogout>
      </a>
    </div>
    </nav>
    <div className="container is-widescreen">
      <div className="column is-full">
        <div className="box">
          <form onSubmit={this.onSubmit}>
            <div className="field">
              <label className="label">Description</label>
               <div className="control">
                <textarea 
                  className="textarea is-hovered"
                  rows="5"
                  required
                  value={this.state.discount_message}
                  onChange={this.onChangeDiscountMessage}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Image link</label>
               <div className="control">
                <input 
                  className="input is-hovered" 
                  type="text" 
                  name="link"
                  value={this.state.discount_poster}
                  onChange={this.onChangeDiscountPoster}
                  required
                />
               </div>
            </div>
            <div className="field">
              <label className="label">Valid for (in days)</label>
               <div className="control">
                <input 
                  className="input is-hovered" 
                  type="text" 
                  name="validfor"
                  value={this.state.valid_for}
                  onChange={this.onChangeValidFor}
                  required
                />
               </div>
            </div>
            <div className="field">
              <label className="label">Subscribers</label>
               <div className="control">
                <textarea 
                  className="textarea is-hovered" 
                  rows="10"
                  value={this.state.subscribers_list}
                  onChange={this.onChangeSubscribersList}
                  required
                />
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
    )
  }
}

export default AddDiscount;