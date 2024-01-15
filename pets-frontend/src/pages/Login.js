import React from "react";
import { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBValidationItem,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import {useDispatch, useSelector} from 'react-redux'
import { toast } from "react-toastify";
import { login } from "../redux/features/slice";

//define initialStates
const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  //set hooks for passing initialState
  const [formValue, setFormValue] = useState(initialState);

  //destructure form values
  const { email, password } = formValue;
  const navigate = useNavigate()

  const dispatch = useDispatch();

  if(email && password) {
dispatch(login({formValue, navigate, toast}))
  }

  //submit function
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //keep track of userInput
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div className="loginStyles">
      <MDBCard alignment="center" />

      <MDBIcon fas icon="user-circle" className="fa-2x" />
      <h5>Sign In</h5>
      <MDBCard>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBValidationItem
                className="col-12"
                feedback="Please enter your email"
                invalid
              >
                <MDBInput
                  type="email"
                  value={email}
                  label="Email"
                  name="email"
                  onChange={onInputChange}
                  required
                ></MDBInput>
              </MDBValidationItem>
            </div>

            <div className="col-md-12">
              <MDBValidationItem
                className="col-12"
                feedback="Please enter your password"
                invalid
              >
                <MDBInput
                  type="password"
                  value={password}
                  label="Password"
                  name="password"
                  onChange={onInputChange}
                  required
                ></MDBInput>
              </MDBValidationItem>
            </div>

            <div className="col-md-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an account? Signup</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
