import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = { username: "", password: "" };

  handleChange = event => {
    const name = event.target.name;
    let state = {};
    state[name] = event.target.value;
    this.setState(state);
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.username);
    window.localStorage.setItem("name", this.state.username);
    this.props.history.push("/map");
  };

  render() {
    return (
      <div className="container center-align section">
        <form onSubmit={this.handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              placeholder="Name"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button className="btn transparent z-depth-0 black-text" style={{border: '1px solid black'}} type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
