import { Component } from "react";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { postDataForLogin } from "../Services/AccessAPI";
import SessionManager from "./SessionManager";

import "./Login.css";


export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            loading: false,
            failed: false,
            error: ''
        };

        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.login();
        }
    }

    login(event) {
        event.preventDefault();
        let userInfo = this.state;
        this.setState({
            loading: true
        });
        postDataForLogin('api/Auth/Login', userInfo).then((result) => {
            if (result?.token) {
                SessionManager.setUserSession(result.fullName, result.token, result.userId, result.role, result.profilePicture);

                if (SessionManager.getToken()) {
                    this.setState({
                        loading: false
                    });

                    // <LoginMenu menuText = 'Logout' menuURL = '/logout' />

                    // If login successful and get token
                    // redirect to dashboard
                    if(result.role === "Vet"){
                        if(result.isCompletedVetProfile === false){
                            window.location.href = "/updateVetProfile";
                        }
                        else{
                            window.location.href = "/vetMenu";
                        }
                    }
                    else if(result.role === "Admin"){
                        window.location.href = "/adminMenu"
                    }
                    else{
                        window.location.href = "/ownerMenu";
                    }
                }
            }

            else {
                let errors = '';
                for (const key in result?.errors) {
                    if (Object.hasOwnProperty.call(result.errors, key)) {
                        errors += result.errors[key];

                    }
                }
                errors = errors === '' ? 'Login is unsuccessfull!' : errors;
                toast.error(errors, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });

                this.setState({
                    errors: "Login failed!",
                    loading: false
                });
            }

        });
    }

    render() {
        // let content;
        // if (this.state.loading) {
        //     content = <div>Loading...</div>;
        // }

        return (
            <div className="container">
                <div className="wrapper">
                    <div className="title">Zaloguj</div>
                    <form onSubmit={this.login}>
                        <div className="field">
                            <input type="text" name="email" onChange={this.onChange} onKeyDown={this.onKeyDown} required/>
                            <label>Email</label>
                        </div>
                        <div className="field">
                            <input type="password" name="password" onChange={this.onChange} onKeyDown={this.onKeyDown} required/>
                            <label>Hasło</label>
                        </div>
                        <div className="field">
                            <input type="submit" value="Zaloguj"/>
                        </div>
                        <div className="field">
                            <Link to="/"><input type="reset" value="Powrót"/></Link>
                        </div>
                        <div className="signup-link">Nie masz konta? <a href="/register">Zarejestruj się</a></div>
                    </form>
                </div>
            </div>
        );
    }
}