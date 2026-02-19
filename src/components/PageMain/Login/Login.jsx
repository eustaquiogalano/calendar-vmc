import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import style from "./Login.module.css";

import InputField from "./InputField/InputField";
import userAuth from "./../../../services/mockAuth.js";
import { useUser } from "../../../context/UserContext.jsx";

function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useOutletContext();
  const { setCurrentUser } = useUser();
  const [isVisible, setVisibility] = useState(false);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleAuth(event) {
    event.preventDefault();
    const user = await handleLogin(userAuth(userName, password));
    setCurrentUser(user);
    user.userType === "student" ? navigate("/student") : navigate("/admin");
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
      <div>
        <p>dean.office deanmalakas</p>
        <p>joris.arancon jorispogi</p>
      </div>
    </div>
  );
}

export default Login;
