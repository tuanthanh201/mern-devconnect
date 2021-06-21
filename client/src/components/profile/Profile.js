import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";

import Spinner from "../layout/Spinner";
import ProfileGithub from "./ProfileGithub";
import { getProfileById } from "../../actions/profile";
import { useEffect } from "react";

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
  const params = useParams();
  const { profileId } = params;

  useEffect(() => {
    getProfileById(profileId);
  }, [getProfileById, profileId]);

  //#region Skills List
  let skillsList;
  if (profile && profile.skills && profile.skills.length > 0) {
    skillsList = profile.skills.map((skill, index) => (
      <div className="p-1" key={index}>
        <i className="fa fa-check"></i> {skill}
      </div>
    ));
  }
  //#endregion

  //#region Experience List
  let experienceList;
  if (profile && profile.experience && profile.experience.length > 0) {
    experienceList = profile.experience.map((exp) => (
      <div key={exp._id}>
        <h3 className="text-dark">{exp.company}</h3>
        <p>
          <Moment format="MM/YYYY">{exp.from}</Moment> -{" "}
          {exp.to === null || exp.to === "" || exp.current ? (
            " Now"
          ) : (
            <Moment format="MM/YYYY">{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position: </strong>
          {exp.title}
        </p>
        <p>
          <strong>Description: </strong>
          {exp.description}
        </p>
      </div>
    ));
  }
  //#endregion

  //#region Education List
  let educationList;
  if (profile && profile.education && profile.education.length > 0) {
    educationList = profile.education.map((edu) => (
      <div key={edu._id}>
        <h3>{edu.school}</h3>
        <p>
          <Moment format="MM/YYYY">{edu.from}</Moment> -{" "}
          {edu.to === null || edu.to === "" || edu.current ? (
            " Now"
          ) : (
            <Moment format="MM/YYYY">{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong>Degree: </strong>
          {edu.degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>
          {edu.fieldofstudy}
        </p>
        <p>
          <strong>Description: </strong>
          {edu.description}
        </p>
      </div>
    ));
  }
  //#endregion

  return (
    <>
      {loading && <Spinner />}
      {!loading && profile !== null && (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            !auth.loading &&
            auth.user._id === profileId && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}

          <div className="profile-grid my-1">
            {/* Top */}
            <div className="profile-top bg-primary p-2">
              <img
                className="round-img my-1"
                src={profile.user.avatar}
                alt=""
              />
              <h1 className="large">{profile.user.name}</h1>
              <p className="lead">
                {profile.status} at {profile.company}
              </p>
              <p>{profile.location}</p>
              <div className="icons my-1">
                {profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe fa-2x"></i>
                  </a>
                )}
                {profile.social && profile.social.twitter && (
                  <a
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter fa-2x"></i>
                  </a>
                )}
                {profile.social && profile.social.facebook && (
                  <a
                    href={profile.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook fa-2x"></i>
                  </a>
                )}
                {profile.social && profile.social.linkedin && (
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin fa-2x"></i>
                  </a>
                )}
                {profile.social && profile.social.youtube && (
                  <a
                    href={profile.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-youtube fa-2x"></i>
                  </a>
                )}
                {profile.social && profile.social.instagram && (
                  <a
                    href={profile.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram fa-2x"></i>
                  </a>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="profile-about bg-light p-2">
              <h2 className="text-primary">{profile.user.name}'s Bio</h2>
              <p>{profile.bio}</p>
              <div className="line"></div>
              <h2 className="text-primary">Skill Set</h2>
              <div className="skills">{skillsList}</div>
            </div>

            {/* Experience */}
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {experienceList}
            </div>

            {/* Education */}
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {educationList}
            </div>

            {/* Github */}
            {profile.githubusername && profile.githubusername !== "" && (
              <ProfileGithub />
            )}
          </div>
        </>
      )}
      {profile === null && <p>You don't have a profile</p>}
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
