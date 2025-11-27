function Section() {
  return (
    <section>
      <h1>Login</h1>
      <form action="">
        <div>
          <label htmlFor="id-number">ID Number:</label>
          <input type="text" name="id-number" id="id-number" />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" />
        </div>
        <div>
          <button>Login</button>
          <p>or</p>
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export { Section };
