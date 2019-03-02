import React, { Component } from 'react';

class AuthPage extends Component {
    constructor(props){
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
    }
    state = {
        isLogin: true
    };
    
    switchModeHandler = () => {
        this.setState( state => {
            return {isLogin: !state.isLogin};
        });
    };
    
    submitHandler = event => {
        event.preventDefault();
        const email = this.emailRef.current.value;
        const password = this.passwordRef.current.value;

        if (email.trim().length === 0 || password.trim().length === 0){
            return
        }

        let requestBody = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
        };

        if (!this.state.isLogin) {
            requestBody = {
                query: `
                mutation {
                    createUser(userInput: {email: "${email}", password: "${password}"}) {
                        _id
                        email
                      }
                }`
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
            console.log(resData); //at this point we are not doing anything with the date so we just log it.
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
                <label htmlFor="email">E-Mail</label>
                <input type="email" id="email" ref={this.emailRef}/>
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={this.passwordRef}/>
            </div>   
            <div className="form-actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={this.switchModeHandler}>Switch to { this.state.isLogin ? "Signup" : "Login"}</button>
            </div> 
        </form>
        );
    }
}

export default AuthPage;