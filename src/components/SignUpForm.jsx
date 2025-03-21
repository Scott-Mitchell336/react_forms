import { useState } from "react";

function SignUpForm({ token, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "some-username",
            password: "super-secret-999",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to sign up"); // Handle non-2xx responses
      }

      const result = await response.json();
      console.log("Sign up successful:", result);
      setSuccessMessage(result.message);
      setToken(result.token);
      // alert(result.message);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Sign Up!</h2>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label className="signup-label">
          Username:{" "}
          <input
            className="signup-input"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
        <label className="signup-label">
          Password:{" "}
          <input
            className="signup-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default SignUpForm;
