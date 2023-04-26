import React from "react";
import { Link, useNavigate } from "react-router-dom";

import okNokIcon from './tick-and-cross.jpg';

function AdminMenu(){
    let navigate = useNavigate();

    const goToConfirmCustoms = () => {
        navigate("/confirmCustoms");
    }
    return(
        <div style={{height: "100%"}}>
            <Link to="/logout">
                <button className="header__buttons__end__btn" style={{position: "absolute", right: "1em", top: "1em"}}>
                    <p>Wyloguj</p>
                </button>
            </Link>
            <div className="menu">
                {/* Link z biblioteki formatuje nam po swojemu klikalną kartę (element div).  Lepiej tu użyć onClicków i useNavigate*/}
                {/* <Link to="/vetMenu/profile"> */}
                    <div className="menu__card" style={{backgroundColor:"#F9F9F9"}} onClick={goToConfirmCustoms}>
                        <img className="menu__icon" src={okNokIcon} alt="nemuIcon"></img>
                        <h2>Niestandardowe choroby, zabiegi i usługi</h2>
                    </div>
                {/* </Link> */}
            </div>
        </div>
    );
}

export default AdminMenu;