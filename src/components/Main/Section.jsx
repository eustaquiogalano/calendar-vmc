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

function Section() {
  return (
    <section>
      <h1>Login</h1>
      <form action="" id="login-form">
        <InputAndLabel htmlFor="name" text="Name: " name="name" id="name" />
        <InputAndLabel
          htmlFor="id-number"
          text="ID Number: "
          name="id-number"
          id="id-number"
        />
        <div id="login-register-container">
          <button>Login</button>
          <p>or</p>
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export { Section };
