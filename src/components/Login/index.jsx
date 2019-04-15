import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = { username: "" };

  handleChange = event => {
    const name = event.target.name;
    let state = {};
    state[name] = event.target.value;
    this.setState(state);
  };

  handleSubmit = event => {
    event.preventDefault();
    const username = this.state.username.toLowerCase();
    window.localStorage.setItem("name", username);
    this.props.history.push("/map");
  };

  render() {
    return (
      <div className="container center-align section">
        <h3>Can you make a g bigger than this</h3>
        <h1 style={{marginBottom: '100px'}}>g</h1>
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
          <button className="btn transparent z-depth-0 black-text" style={{border: '1px solid black'}} type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
