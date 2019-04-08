import React, { Component } from 'react';
import AuthContext from '../context/auth-context';

class AuthPage extends Component {
    constructor(props){
        super(props);
        this.nameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.profilePicRef = React.createRef();
    }
    state = {
        isLogin: true
    };

    static contextType = AuthContext;
    
    switchModeHandler = () => {
        this.setState( state => {
            return {isLogin: !state.isLogin};
        });
    };
    
    submitHandler = event => {
        event.preventDefault();
        const name = this.nameRef.current.value;
        const password = this.passwordRef.current.value;
        
        if (name.trim().length <= 3 || password.trim().length <= 3){
            return
        }

        let requestBody = {
            query: `
                query Login ($name: String!, $password: String!){
                    login(name: $name, password: $password) {
                        userId
                        token
                        tokenExpiration
                    }
                }`,
            variables: {
                name: name,
                password: password
            }
        };

        
        if (!this.state.isLogin) {

            const profilePic = this.profilePicRef.current.value;
            requestBody = {
                query: `
                mutation Signup ($name: String!, $password: String!, $profpic: String!){
                    createUser(userInput: {name: $name, password: $password, profilePic: $profpic}) {
                        _id
                        name
                      }
                }`,
                variables: {
                    name: name,
                    password: password,
                    profpic: profilePic
                }
            };
        }

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
              'Content-Type':'application/json'
            }
        })
        .then(res => {
            if(res.status !==200 && res.status !== 201){ //throw error when status is not ok
                throw new Error('connection failed!');
            }
            return res.json();
        })
        .then(resData => {
            if (resData.data.login.token) { //if token is valid, call the context login Method with the received auth-data
                this.context.login(
                    resData.data.login.token,
                    resData.data.login.userId,
                    resData.data.login.tokenExpiration
                );
            }
        })
        .catch(err => {
            console.log(err);
        })
    };
    render() {
        return (
        <form onSubmit={this.submitHandler}>
            <h1>{ this.state.isLogin ? "Login" : "Signup"}</h1>
            <div className="form-control" >
                <label htmlFor="name">Username</label>
                <input type="name" id="name" ref={this.nameRef}/>
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={this.passwordRef}/>
            </div>
            { !this.state.isLogin && <div className="form-control">
                <label htmlFor="profile_pic">Profile Picturen</label>
                <input type="profile_pic" id="profile_pic" ref={this.profilePicRef}/>
            </div> }    
            <div className="form-actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={this.switchModeHandler}>Switch to { this.state.isLogin ? "Signup" : "Login"}</button>
            </div> 
        </form>
        );
    }
}

export default AuthPage;