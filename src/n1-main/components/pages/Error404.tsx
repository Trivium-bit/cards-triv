import React from "react";
import styles from "../../ui/Error404.module.scss";
import {NavLink} from "react-router-dom";
import {PATH} from "../AppRoutes";
import astronaut from "./../../../images/astronaut.svg";
import earth from "./../../../images/earth.svg";
import moon from "./../../../images/moon.svg";
import rocket from "./../../../images/rocket.svg";
import errorText from "./../../../images/404Text.svg";

export const Error404 = () => {


    return (
        <div className={styles.ErrorWrapper } >

            <div className={styles.stars} >

                <div className={styles.centralBody}>
                    <img className={styles.image404} src={errorText} alt={"img404"}/>
                    <NavLink to={PATH.PROFILE} className={styles.btnGoHome}>GO BACK HOME</NavLink>
                </div>
                <div className={styles.objects}>
                    <img className={styles.objectRocket} src={rocket} alt={"imgRocket"}/>
                    <div className={styles.earthMoon}>
                        <img className={styles.objectEarth} src={earth} alt={"imgEarth"}/>
                        <img className={styles.objectMoon} src={moon} alt={"imgMoon"}/>
                    </div>
                    <div className={styles.boxAstronaut}>
                        <img className={styles.objectAstronaut} src={astronaut} alt={"imgAstronaut"}/>
                    </div>
                </div>
                <div className={styles.glowingStars}>
                    <div className={styles.star}/>
                    <div className={styles.star}/>
                    <div className={styles.star}/>
                    <div className={styles.star}/>
                    <div className={styles.star}/>
                    <div className={styles.star}/>
                </div>
            </div>

        </div>
    );
}


