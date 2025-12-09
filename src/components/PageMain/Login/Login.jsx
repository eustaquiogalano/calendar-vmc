import { useState } from "react";
import style from "./Login.module.css";
import InputField from "./InputField/InputField";
import userAuth from "./../../../services/mockAuth.js";

function Login({ onLogin }) {
  const [isVisible, setVisibility] = useState(false);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleAuth(event) {
    event.preventDefault();

    setTimeout(() => {
      onLogin(userAuth(userName, password));
    }, 1500);
  }

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function showRegisterForm(e) {
    e.preventDefault();
    if (isVisible) {
      setVisibility(false);
    } else {
      setVisibility(true);
    }
  }

  return (
    <div
      className={`${style["login__slider--slide"]} ${style["login__slider"]}`}
    >
      <div
        className={`${isVisible ? style["login--show-register"] : ""} ${
          style["login"]
        }`}
      >
        <section
          className={`${style["login__login-section"]} ${style["login__section"]}`}
        >
          <h2 className={style["login__h2"]}>Login</h2>
          <form
            action=""
            className={`${style["login__login-form"]} ${style["login__form"]}`}
          >
            <InputField
              htmlFor="name"
              text="Name: "
              name="name"
              id="name"
              value={userName}
              onValueChange={handleUsername}
            />
            <InputField
              htmlFor="Password"
              text="Password: "
              name="password"
              id="password"
              value={password}
              onValueChange={handlePassword}
            />
            <div className={style["login__button-container"]}>
              <button
                className={`${style["login__button"]} ${style["login__login-button"]}`}
                onClick={handleAuth}
              >
                Login
              </button>
              <p>or</p>
              <button
                className={`${style["login__button"]} ${style["login__ goto-register-button"]}`}
                onClick={showRegisterForm}
              >
                Register
              </button>
            </div>
          </form>
        </section>

        <section
          className={`${style["login__register-section"]} ${style["login__section"]}`}
        >
          <h2 className={style["login__h2"]}>Register</h2>
          <form
            action=""
            className={`${style["login__register-form"]} ${style["login__form"]}`}
          >
            <InputField htmlFor="name" text="Name: " name="name" id="name" />
            <InputField
              htmlFor="id-number"
              text="ID Number: "
              name="id-number"
              id="id-number"
            />
            <InputField
              htmlFor="email"
              text="Email: "
              name="email"
              id="email"
            />
            <InputField
              htmlFor="last-year-attended"
              text="Last Year Attended: "
              name="last-year-attended"
              id="last-year-attended"
            />
            <div className={style["login__button-container"]}>
              <button
                className={`${style["login__register-button"]} ${style["login__button"]}`}
                onClick={showRegisterForm}
              >
                Register
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;
