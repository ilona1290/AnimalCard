import React from "react";
import { Link } from 'react-router-dom';

import './Home.css';

function Home(){
    return(
        <div className="home">
            <div className="header">
                <h1 className="header__heading">Animal Card</h1>
                <p className="header__text">Elektroniczna książeczka zdrowia Twojego pupila stworzona przez właścicieli dla właścicieli. Aplikacja powstała jako ekologiczna 
                    alternatywa dla tradycyjnych książeczek zdrowia. Dzięki połączeniu z Internetem wgląd w książeczkę zdrowia jest możliwy z każdego urządzania 
                    i miejsca na świecie, więc jesteś na bieżąco z nachodzącymi wizytami, szczepieniami i wieloma innymi.</p>
                <div className="header__buttons">
                    <Link to="/login">
                        <button className="header__buttons__btn">
                            <p>Zaloguj</p>
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="header__buttons__btn">
                            <p>Zarejestruj</p>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;