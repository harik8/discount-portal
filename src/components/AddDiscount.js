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
    this.onChangeDiscountPercentage = this.onChangeDiscountPercentage.bind(this);
    this.onChangeSubscribersList = this.onChangeSubscribersList.bind(this);
    this.onChangeValidFor = this.onChangeValidFor.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      discount_message: '',
      discount_percentage: '',
      subscribers_list:'',
      valid_for: '',
      code: ''
    }
  }
  
  onChangeDiscountMessage(e) {
    this.setState({
      discount_message: e.target.value
    });
  }

  onChangeDiscountPercentage(e) {
    this.setState({
      discount_percentage: e.target.value
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

  onChangeCode(e) {
    this.setState({
      code: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      discount_message: this.state.discount_message,
      discount_percentage: this.state.discount_percentage,
      subscribers_list: this.state.subscribers_list,
      added_date: moment().format("D-M-YYYY"),
      valid_for: this.state.valid_for,
      code: this.state.code,
      expired_date: moment().add(this.state.valid_for, 'days').format("D-M-YYYY")
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
                  rows="2"
                  required
                  value={this.state.discount_message}
                  onChange={this.onChangeDiscountMessage}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Discount %</label>
               <div className="control">
                <input 
                  className="input is-hovered" 
                  type="text" 
                  name="link"
                  value={this.state.discount}
                  onChange={this.onChangeDiscountPercentage}
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
              <label className="label">Discount code</label>
               <div className="control">
                <input 
                  className="input is-hovered" 
                  type="text" 
                  name="code"
                  value={this.state.code}
                  onChange={this.onChangeCode}
                  required
                />
               </div>
            </div>
            <div className="field">
              <label className="label">Subscribers</label>
               <div className="control">
                <textarea 
                  className="textarea is-hovered" 
                  rows="5"
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