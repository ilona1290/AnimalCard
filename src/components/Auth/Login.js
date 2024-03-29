import { Component } from "react";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { postDataForLogin, getData } from "../Services/AccessAPI";
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
        event.target.innerText = ""
        //reset animation
        event.target.classList.remove('success');
        event.target.classList.remove('animate');
        
        event.target.classList.add('animate');
        let userInfo = this.state;
        this.setState({
            loading: true
        });
        postDataForLogin('api/Auth/Login', userInfo).then((result) => {
            event.target.classList.remove('animate');
            if (result?.token) {
                SessionManager.setUserSession(result.fullName, result.token, result.userId, result.role, result.profilePicture);
                getData(`api/Pet/GetPetsByUserRole/${result.role}/${result.userId}`).then((resultPets) => {
                    const pets = resultPets.userPets.map(obj => {
                        const id  = obj.id;
                        return id;
                      })
                    SessionManager.setUserSession(result.fullName, result.token, result.userId, result.role, result.profilePicture, pets);
                    if (SessionManager.getToken()) {
                        this.setState({
                            loading: false
                        });
                        // <LoginMenu menuText = 'Logout' menuURL = '/logout' />
                        console.log(SessionManager.getPets())
                        // If login successful and get token
                        // redirect to dashboard
                        if(result.role === "Vet"){
                            if(result.isCompletedVetProfile === false){
                                event.target.classList.add("success")
                                window.location.href = "/updateVetProfile";
                            }
                            else{
                                event.target.classList.add("success")
                                window.location.href = "/vetMenu";
                            }
                        }
                        else if(result.role === "Admin"){
                            event.target.classList.add("success")
                            window.location.href = "/adminMenu"
                        }
                        else{
                            event.target.classList.add("success")
                            window.location.href = "/ownerMenu";
                        }
                }})
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
                    <form>
                        <div className="field">
                            <input type="text" name="email" onChange={this.onChange} onKeyDown={this.onKeyDown} required/>
                            <label>Email</label>
                        </div>
                        <div className="field">
                            <input type="password" name="password" onChange={this.onChange} onKeyDown={this.onKeyDown} required/>
                            <label>Hasło</label>
                        </div>
                        <div className="field">
                            <button onClick={this.login} className="action__login__btn">Zaloguj</button>
                        </div>
                        <div className="field">
                        <   Link to="/"><button className="action__login__btn">Powrót</button></Link>
                        </div>
                        {/* <div className="field">
                            <input type="submit" value="Zaloguj"/>
                        </div>
                        <div className="field">
                            <Link to="/"><input type="reset" value="Powrót"/></Link>
                        </div> */}
                        <div className="signup-link">Nie masz konta? <a href="/register">Zarejestruj się</a></div>
                    </form>
                </div>
            </div>
        );
    }
}