import { useRef } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

const Register = (props) => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const password2InputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    if (passwordInputRef.current.value !== password2InputRef.current.value) {
      return props.setAlert("Passwords do not match!", "danger");
    }

    const userData = {
      name: nameInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };
    props.register(userData);
  };

  return (
    <>
      {props.isAuthenticated && <Redirect to="/dashboard" />}
      <h1 classpassword="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" autoComplete="off" onSubmit={submitHandler}>
        <div className="form-group">
          <input
            spellCheck="off"
            type="text"
            placeholder="Name"
            name="name"
            required
            ref={nameInputRef}
          />
        </div>
        <div className="form-group">
          <input
            spellCheck="off"
            type="email"
            placeholder="Email Address"
            name="email"
            required
            ref={emailInputRef}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            ref={passwordInputRef}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            ref={password2InputRef}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  setAlert,
  register,
})(Register);
