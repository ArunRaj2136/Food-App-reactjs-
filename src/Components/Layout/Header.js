import React, { Fragment } from "react";

import classes from "./Header.module.css";
import mealsImage from "../../Assets/meals.jpg";
import HeaderCartBtn from "./HeaderCartBtn";

function Header() {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartBtn />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious Food!"></img>
      </div>
    </Fragment>
  );
}

export default Header;
