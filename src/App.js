import './App.css';
import React, { useState } from 'react';

function App({username, password}) {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();
    console.log(event, '-=-=-=-=-=-=-')
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form" data-testid="login-form">
      <form>
        <div className="input-container">
          <label>Username </label>
          <input id="username" type="text" name="username" required />
          {renderErrorMessage("username")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input data-testid="password" type="password" name="password" required />
          {renderErrorMessage("password")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="login-form">
      <div className="title" data-testid="title">Sign In</div>
      {renderForm}
    </div>
  );
}

export default App;
