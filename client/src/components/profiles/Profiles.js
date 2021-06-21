import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getAllProfile } from "../../actions/profile";

const Profiles = ({ profile: { profiles, loading }, getAllProfile }) => {
  useEffect(() => {
    getAllProfile();
  }, [getAllProfile]);

  let content = <h4>No profiles found...</h4>;
  if (profiles.length > 0) {
    content = profiles.map((profile) => (
      <ProfileItem key={profile._id} profile={profile} />
    ));
  }

  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect witth
            developers
          </p>
          <div className="profiles">{content}</div>
        </>
      )}
    </>
  );
};

Profiles.propTypes = {
  getAllProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfile })(Profiles);
