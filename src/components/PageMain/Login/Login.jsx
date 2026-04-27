import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import style from "./Login.module.css";

import InputField from "./InputField/InputField";
import userAuth from "./../../../services/mockAuth.js";
import { useUser } from "../../../context/UserContext.jsx";
import { addStudentUser } from "../../../utils/storage.js";

function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useOutletContext();
  const { loginCurrentUser } = useUser();
  const [isVisible, setVisibility] = useState(false);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // states for register
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [middleName, setMiddlename] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIDnumber] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [yearLevel, setYearLevel] = useState(0);

  async function handleAuth(event) {
    event.preventDefault();
    const user = await handleLogin(await userAuth(userName, password));
    loginCurrentUser(user);
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

  async function handleRegister() {
    await addStudentUser({
      firstName,
      lastName,
      middleName,
      email,
      idNumber,
      username: regUsername,
      password: regPassword,
      yearLevel,
      userType: "student",
      requestedDocuments: [],
      isLoggedIn: false,
    });
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
            <InputField
              htmlFor="first-name"
              text="First Name: "
              name="first-name"
              id="first-name"
              value={firstName}
              onValueChange={(e) => setFirstname(e.target.value)}
            />
            <InputField
              htmlFor="last-name"
              text="Last Name: "
              name="last-name"
              id="last-name"
              value={lastName}
              onValueChange={(e) => setLastname(e.target.value)}
            />
            <InputField
              htmlFor="middle-name"
              text="Middle Name: "
              name="middle-name"
              id="middle-name"
              value={middleName}
              onValueChange={(e) => setMiddlename(e.target.value)}
            />

            <InputField
              htmlFor="id-number"
              text="ID Number: "
              name="id-number"
              id="id-number"
              value={idNumber}
              onValueChange={(e) => setIDnumber(e.target.value)}
            />
            <InputField
              htmlFor="email"
              text="Email: "
              name="email"
              id="email"
              value={email}
              onValueChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              htmlFor="year-level"
              text="Year Level: "
              name="year-level"
              id="year-level"
              value={yearLevel}
              onValueChange={(e) => setYearLevel(e.target.value)}
            />

            <InputField
              htmlFor="username"
              text="Username: "
              name="username"
              id="username"
              value={regUsername}
              onValueChange={(e) => setRegUsername(e.target.value)}
            />

            <InputField
              htmlFor="password"
              text="Password: "
              name="password"
              id="password"
              value={regPassword}
              onValueChange={(e) => setRegPassword(e.target.value)}
            />

            <div className={style["login__button-container"]}>
              <button
                className={`${style["login__register-button"]} ${style["login__button"]}`}
                onClick={handleRegister}
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
