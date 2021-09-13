import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { useForm } from "../hooks/useForm";

export const LoginScreen = () => {

  const dispatch = useDispatch();

  const [values, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const {loading} = useSelector(state => state.ui)


  const { email, password } = values;

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(startLoginEmailPassword(email,password))
  }

  const handleLoginGoogle = () => {
    dispatch(startGoogleLogin())
  } 

  return (
    <>
      <h3 className="auth__title mb-2">Login</h3>
      <form 
      onSubmit={handleLogin}
      className="animate__animated animate__fadeIn animate__faster"
      >
        <input
          autoComplete="off"
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <button disabled={loading} className="btn btn-primary btn-block" type="submit">
          Login
        </button>
        <div className="auth__social-networks">
          Login with Google
          <div className="google-btn"
            onClick={handleLoginGoogle}
          >
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link className="link" to="/auth/register">
          create new account
        </Link>
      </form>
    </>
  );
};
