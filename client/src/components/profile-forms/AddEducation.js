import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import PropTypes from "prop-types";

import { addEducation } from "../../actions/profile";

const AddEducation = ({ addEducation }) => {
  const history = useHistory();
  const [displayTo, setDisplayTo] = useState(true);
  //#region Refs for input ref={}
  const schoolRef = useRef();
  const degreeRef = useRef();
  const fieldofstudyRef = useRef();
  const fromRef = useRef();
  const toRef = useRef();
  const currentRef = useRef();
  const descriptionRef = useRef();
  //#endregion

  const submitHandler = (event) => {
    event.preventDefault();

    const toDate = toRef.current ? toRef.current.value : null;

    const formData = {
      school: schoolRef.current.value,
      degree: degreeRef.current.value,
      fieldofstudy: fieldofstudyRef.current.value,
      from: fromRef.current.value,
      to: toDate,
      current: currentRef.current.checked,
      description: descriptionRef.current.value,
    };

    addEducation(formData, history);
  };

  return (
    <>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form
        autoComplete="off"
        spellCheck="false"
        className="form"
        onSubmit={submitHandler}
      >
        <div className="form-group">
          <input
            ref={schoolRef}
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
          />
        </div>
        <div className="form-group">
          <input
            ref={degreeRef}
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
          />
        </div>
        <div className="form-group">
          <input
            ref={fieldofstudyRef}
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input ref={fromRef} type="date" name="from" />
        </div>
        <div className="form-group">
          <p>
            <input
              ref={currentRef}
              type="checkbox"
              name="current"
              value=""
              onClick={() => setDisplayTo((prevState) => !prevState)}
            />{" "}
            Current School or Bootcamp
          </p>
        </div>
        {displayTo && (
          <div className="form-group">
            <h4>To Date</h4>
            <input ref={toRef} type="date" name="to" />
          </div>
        )}
        <div className="form-group">
          <textarea
          spellCheck="false"
            ref={descriptionRef}
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>{" "}
    </>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
