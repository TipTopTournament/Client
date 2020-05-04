import React, { Component } from "react";
import AppRouter from "./components/shared/routers/AppRouter";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 */
class App extends Component {
  render() {
    return (
      <div style={{background:"#F3F3FF"}}>
        <div className="header">
        <AppRouter/>
        </div>
      </div>
    );
  }
}

export default App;
