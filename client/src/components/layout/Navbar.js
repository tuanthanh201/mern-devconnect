import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <NavLink to="/profiles" activeClassName="active-link">
          Developers
        </NavLink>
        <NavLink to="/posts" activeClassName="active-link">
          Posts
        </NavLink>
        <NavLink to="/dashboard" activeClassName="active-link">
          <i className="fa fa-user" /> {""}
          <span className="hide-small">Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink onClick={logout} to="/some-where">
          <i className="fas fa-sign-out-alt" />
          {""}
          <span className="hide-small">Logout</span>
        </NavLink>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <NavLink to="/profiles" activeClassName="active-link">
          Developers
        </NavLink>
      </li>
      <li>
        <NavLink to="/register" activeClassName="active-link">
          Register
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" activeClassName="active-link">
          Login
        </NavLink>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <NavLink to="/">
          <i className="fas fa-code"></i> DevConnector
        </NavLink>
      </h1>
      {!loading && isAuthenticated && authLinks}
      {!loading && !isAuthenticated && guestLinks}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
