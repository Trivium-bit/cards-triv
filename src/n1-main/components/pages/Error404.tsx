import React from "react";
import styles from "../../ui/Error404.module.scss";
import {NavLink} from "react-router-dom";
import {PATH} from "../AppRoutes";

export const Error404 = () =>{
    return (
        <div className={styles.ErrorWrapper}>

            <div className={styles.stars}>

                <div className={styles.centralBody}>
                    <img className={styles.image404} src="http://salehriaz.com/404Page/img/404.svg" alt={"img404"} />
                    <NavLink to={PATH.PROFILE} className={styles.btnGoHome} >GO BACK
                        HOME</NavLink>
                </div>
                <div className={styles.objects}>
                    <img className={styles.objectRocket} src="http://salehriaz.com/404Page/img/rocket.svg" alt={"imgRocket"}/>
                    <div className={styles.earthMoon}>
                        <img className={styles.objectEarth} src="http://salehriaz.com/404Page/img/earth.svg" width="100px" alt={"imgEarth"}/>
                        <img className={styles.objectMoon} src="http://salehriaz.com/404Page/img/moon.svg" width="80px" alt={"imgMoon"}/>
                    </div>
                    <div className={styles.boxAstronaut}>
                        <img className={styles.objectAstronaut} src="http://salehriaz.com/404Page/img/astronaut.svg"
                             width="140px" alt={"imgAstronaut"}/>
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


