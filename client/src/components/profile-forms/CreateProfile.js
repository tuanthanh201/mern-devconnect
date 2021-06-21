import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile }) => {
  const history = useHistory();
  const [displaySocial, setDisplaySocial] = useState(false);

  //#region Refs
  const companyRef = useRef();
  const websiteRef = useRef();
  const locationRef = useRef();
  const statusRef = useRef();
  const skillsRef = useRef();
  const githubRef = useRef();
  const bioRef = useRef();
  const twitterRef = useRef();
  const facebookRef = useRef();
  const youtubeRef = useRef();
  const linkedinRef = useRef();
  const instagramRef = useRef();
  //#endregion

  const submitHandler = (event) => {
    event.preventDefault();

    const status =
      statusRef.current.value === "0" ? "" : statusRef.current.value;
    const twitter = twitterRef.current ? twitterRef.current.value : "";
    const facebook = facebookRef.current ? facebookRef.current.value : "";
    const youtube = youtubeRef.current ? youtubeRef.current.value : "";
    const linkedin = linkedinRef.current ? linkedinRef.current.value : "";
    const instagram = instagramRef.current ? instagramRef.current.value : "";

    const formData = {
      company: companyRef.current.value,
      website: websiteRef.current.value,
      location: locationRef.current.value,
      status,
      skills: skillsRef.current.value,
      githubusername: githubRef.current.value,
      bio: bioRef.current.value,
      social: {
        twitter,
        facebook,
        youtube,
        linkedin,
        instagram,
      },
    };

    createProfile(formData, history);
  };

  return (
    <>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" autoComplete="off" onSubmit={submitHandler}>
        <div className="form-group">
          <select name="status" ref={statusRef}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            ref={companyRef}
            spellCheck="false"
            type="text"
            placeholder="Company"
            name="company"
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            ref={websiteRef}
            spellCheck="false"
            type="text"
            placeholder="Website"
            name="website"
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            ref={locationRef}
            spellCheck="false"
            type="text"
            placeholder="Location"
            name="location"
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            ref={skillsRef}
            spellCheck="false"
            type="text"
            placeholder="* Skills"
            name="skills"
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            ref={githubRef}
            spellCheck="false"
            type="text"
            placeholder="Github Username"
            name="githubusername"
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            ref={bioRef}
            spellCheck="false"
            placeholder="A short bio of yourself"
            name="bio"
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => setDisplaySocial((prevDisplay) => !prevDisplay)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocial && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                ref={twitterRef}
                spellCheck="false"
                type="text"
                placeholder="Twitter URL"
                name="twitter"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                ref={facebookRef}
                spellCheck="false"
                type="text"
                placeholder="Facebook URL"
                name="facebook"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                ref={youtubeRef}
                spellCheck="false"
                type="text"
                placeholder="YouTube URL"
                name="youtube"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                ref={linkedinRef}
                spellCheck="false"
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                ref={instagramRef}
                spellCheck="false"
                type="text"
                placeholder="Instagram URL"
                name="instagram"
              />
            </div>
          </>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(CreateProfile);
