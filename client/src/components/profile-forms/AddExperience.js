import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import PropTypes from "prop-types";

import { addExperience } from "../../actions/profile";

const AddExperience = ({ addExperience }) => {
  const history = useHistory();
  const [displayTo, setDisplayTo] = useState(true);
  //#region Refs for input ref={}
  const companyRef = useRef();
  const titleRef = useRef();
  const locationRef = useRef();
  const fromRef = useRef();
  const toRef = useRef();
  const currentRef = useRef();
  const descriptionRef = useRef();
  //#endregion

  const submitHandler = (event) => {
    event.preventDefault();

    const toDate = toRef.current ? toRef.current.value : null;

    const formData = {
      company: companyRef.current.value,
      title: titleRef.current.value,
      location: locationRef.current.value,
      from: fromRef.current.value,
      to: toDate,
      current: currentRef.current.checked,
      description: descriptionRef.current.value,
    };

    addExperience(formData, history);
  };

  return (
    <>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form autoComplete="off" className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input
            spellCheck="false"
            ref={titleRef}
            type="text"
            placeholder="* Job Title"
            name="title"
            required
          />
        </div>
        <div className="form-group">
          <input
            spellCheck="false"
            ref={companyRef}
            type="text"
            placeholder="* Company"
            name="company"
            required
          />
        </div>
        <div className="form-group">
          <input
            spellCheck="false"
            ref={locationRef}
            type="text"
            placeholder="Location"
            name="location"
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input spellCheck="false" ref={fromRef} type="date" name="from" />
        </div>
        <div className="form-group">
          <p>
            <input
              spellCheck="false"
              ref={currentRef}
              type="checkbox"
              name="current"
              value=""
              onChange={() => setDisplayTo((prevState) => !prevState)}
            />{" "}
            Current Job
          </p>
        </div>
        {displayTo && (
          <div className="form-group">
            <h4>To Date</h4>
            <input spellCheck="false" ref={toRef} type="date" name="to" />
          </div>
        )}
        <div className="form-group">
          <textarea
            spellCheck="false"
            ref={descriptionRef}
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
