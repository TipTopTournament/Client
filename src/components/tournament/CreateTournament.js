import React,{useState} from 'react';
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
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const optionsorte= [
    {value: 'bern', label:'Bern'},
    {value: 'basel', label:'Basel'},
    {value: 'aarau', label:'Aarau'},
];

class CreateTournament extends React.Component {

  constructor() {
    super();
   
  }
  /**
   * HTTP PUT request is sent to the backend.
   * If the request is successful, a user is returned to the front-end
   * and its token is stored in the localStorage.
   */
  


  render() {
    return ( 
       
                      
                      <Select/>
    );
        }
   
  
}

export default withRouter(CreateTournament);
