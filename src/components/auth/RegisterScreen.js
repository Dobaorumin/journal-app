import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { setError,removeError } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";



export const RegisterScreen = () => {
  
  const dispatch = useDispatch();
  const {msgError} = useSelector(state => state.ui)

  
  const handleRegister = (e) => {
        e.preventDefault()

        if(isFormValid()){
          dispatch(startRegisterWithEmailPasswordName(email,password,name))
        }
        console.log(values)
  }
  
  
  const [values, handleInputChange] = useForm({
    name:"",
    email:"",
    password:"",
    password2:"",
  });

  const isFormValid = () => {
    if (name.trim().length === 0){
      dispatch(setError("name is required"))
      return false
    } else if(!validator.isEmail(email)){
      dispatch(setError("email is not valid"))
      return false
    } else if (password !== password2 || password.length <5){
      dispatch(setError("Password would be at least 6 characters and match each other"))
      return false
    } 

    dispatch(removeError())
    return true
  }

  const {name,email,password,password2} = values

  return (
    <>
      <h3 className="auth__title mb-2">Register</h3>
      {msgError && <p className="auth__alert-error">{msgError}</p>}
      <form
      className="animate__animated animate__fadeIn animate__faster"
      onSubmit={handleRegister}>
      <input
          autoComplete="off"
          className="auth__input"
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
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
        <input
          className="auth__input"
          type="password"
          placeholder="Confirm"
          name="password2"
          value={password2}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary btn-block mb-2" type="submit">
          Register
        </button>

        <Link className="link" to="/auth/login">
          Already register?
        </Link>
      </form>
    </>
  );
};
