function InputAndLabel({
  htmlFor,
  text,
  type = "text",
  name,
  id,
  placeholder = "",
}) {
  return (
    <div>
      <label htmlFor={htmlFor}>{text}</label>
      <input type={type} name={name} id={id} placeholder={placeholder} />
    </div>
  );
}

function LoginRegisterForm() {
  return (
    <div>
      <div id="login-register-container">
        <section id="login-section">
          <h2>Login</h2>
          <form action="" id="login-form">
            <InputAndLabel htmlFor="name" text="Name: " name="name" id="name" />
            <InputAndLabel
              htmlFor="id-number"
              text="ID Number: "
              name="id-number"
              id="id-number"
            />
            <div id="login-register-button-container">
              <button>Login</button>
              <p>or</p>
              <button>Register</button>
            </div>
          </form>
        </section>
        <section id="register-section">
          <h2>Register</h2>
          <form action="" id="register-form">
            <InputAndLabel htmlFor="name" text="Name: " name="name" id="name" />
            <InputAndLabel
              htmlFor="id-number"
              text="ID Number: "
              name="id-number"
              id="id-number"
            />
            <InputAndLabel
              htmlFor="email"
              text="Email: "
              name="email"
              id="email"
            />
            <InputAndLabel
              htmlFor="last-year-attended"
              text="Last Year Attended: "
              name="last-year-attended"
              id="last-year-attended"
            />
            <div id="register-button-container">
              <button>Register</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export { LoginRegisterForm };
