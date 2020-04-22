import React from "react";
import { withRouter } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import Select from "react-select";


const optionsorte = [
  { value: "bern", label: "Bern" },
  { value: "basel", label: "Basel" },
  { value: "aarau", label: "Aarau" }
];
/*function customTheme(theme){
    return{
        ...theme,
        colors:{
            ...theme.colors,
            primary25: 'red',
            primary: 'blue,'
        }
    }
}*/

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
       
                      
                      <Select options={optionsorte} /*theme={customTheme}*/ className= 'mb-3' placeholder='select Destination' isSearchable/>
    );
        }
   
  

}

export default withRouter(CreateTournament);
