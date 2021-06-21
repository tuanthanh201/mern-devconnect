import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getGithubRepos } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const ProfileGithub = ({
  profile: {
    profile: { githubusername },
    loading,
    repos,
  },
  getGithubRepos,
}) => {
  useEffect(() => {
    getGithubRepos(githubusername);
  }, [getGithubRepos, githubusername]);

  const reposList = repos.map((rep) => (
    <div className="repo bg-white p-1 my-1" key={rep.id}>
      <div>
        <h4>
          <a href={rep.html_url} target="_blank" rel="noopener noreferrer">
            {rep.name}
          </a>
        </h4>
        {rep.description && <p>{rep.description}</p>}
      </div>
      <div>
        <ul>
          <li className="badge badge-primary">Stars: {rep.stargazers_count}</li>
          <li className="badge badge-dark">Watchers: {rep.watchers_count}</li>
          <li className="badge badge-light">Forks: {rep.forks_count}</li>
        </ul>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <Spinner />}
      {!loading && (
        <div className="profile-github">
          <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>
          {reposList}
        </div>
      )}
    </>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
