import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = { username: "" };

  handleChange = event => {
    this.setState({ username: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.username);
    window.localStorage.setItem("name", this.state.username);
    this.props.history.push("/map");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.usernam}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default withRouter(Login);
