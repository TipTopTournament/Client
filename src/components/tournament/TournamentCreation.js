import React from 'react';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import {Form} from "../../views/design/Form";
import {InputField} from "../../views/design/InputField";
import {Title} from "../../views/design/Title";
import {FormContainer} from "../../views/design/FormContainer";
import {ButtonContainer} from "../../views/design/ButtonContainer";
import {Label} from "../../views/design/Label";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
 
class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      username: null,
      password: null
    };
  }
  /**
   * HTTP PUT request is sent to the backend.
   * If the request is successful, a user is returned to the front-end
   * and its token is stored in the localStorage.
   */
  async createTournament() {
    let response;
    try {
      const requestBody = JSON.stringify({
        username: this.state.username,
        password: this.state.password
      });

      
    } catch (error) {
      alert(`Something went wrong : \n${handleError(error)}`);
    }
  }

  
  

  componentDidMount() {}

  render() {

     
   
  }
}

export default withRouter(Login);
