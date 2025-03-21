import React, { useState } from "react";

function Authenticate({ token, setToken }) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  async function handleClick() {
    console.log("Authenticating token...");
    setError(null);
    setSuccessMessage(null);

    if (token === null) {
      setError("No token found, you need to sign up first!");
      return;
    }
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log("Authentication successful:", result);
      setSuccessMessage(result.message);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Authenticate!</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token</button>
    </div>
  );
}

export default Authenticate;
