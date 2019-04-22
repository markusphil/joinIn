import React, { Component } from "react";
import GlobalContext from "../context/main-context";
import { Button } from "../components/ButtonMain";
import { authRequest } from "../requests/auth";
import { TabsControl } from "../components/Navigation/TabsControl";

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.passwordRef = React.createRef();
    this.profilePicRef = React.createRef();
  }
  state = {
    isLogin: true
  };

  static contextType = GlobalContext;

  switchModeHandler = event => {
    event.preventDefault();
    this.setState(state => {
      return { isLogin: !state.isLogin };
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const formData = {
      name: this.nameRef.current.value,
      password: this.passwordRef.current.value
    };

    if (
      formData.name.trim().length <= 3 ||
      formData.password.trim().length <= 3
    ) {
      return;
    }
    if (!this.state.isLogin) {
      formData.profilePic = this.profilePicRef.current.value;
    }

    authRequest(formData, this.state.isLogin)
      .then(resData => {
        if (resData.data.login.token) {
          //if token is valid, call the context login Method with the received auth-data
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.userName,
            resData.data.login.profilePic,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  render() {
    return (
      <form className="login-form" onSubmit={this.submitHandler}>
        <TabsControl
          activeTab={this.state.isLogin}
          onChange={this.switchModeHandler}
          tab1="Login"
          tab2="Signup"
        />
        <div className="form-input">
          <label htmlFor="name">Username</label>
          <input type="name" id="name" ref={this.nameRef} />
        </div>
        <div className="form-input">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordRef} />
        </div>
        {!this.state.isLogin && (
          <div className="form-input">
            <label htmlFor="profile_pic">Profile Picture</label>
            <input
              type="profile_pic"
              id="profile_pic"
              ref={this.profilePicRef}
            />
          </div>
        )}
        <div className="form-actions">
          <Button status="primary" type="submit">
            {this.state.isLogin ? "Login" : "Signup"}
          </Button>
        </div>
      </form>
    );
  }
}

export default AuthPage;
