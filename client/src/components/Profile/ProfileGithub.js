import { Fragment, useEffect } from "react";
import { getGithubRepos } from "../../actions/profile";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const ProfileGithub = ({ userName, profile, getGithubRepos }) => {

  useEffect(() => {
    getGithubRepos(userName);
  }, [getGithubRepos, userName])
  
  return (
    <Fragment>
      {profile.repos !== null && profile.repos.length > 0 && (
        <div className="profile-github">
          <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>
          {profile.repos.map((repo) => (
            <div className="repo bg-white p-1 my-1">
              <div>
                <h4><a href={repo.html_url} target="_blank"
                  rel="noopener noreferrer">{repo.name}</a></h4>
                <p>
                  {repo.description}
                </p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                  <li className="p-3 badge badge-dark">{'  '}Watchers: {repo.watchers_count}</li>
                  <li className="badge badge-light">Forks: {repo.forks_count}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

ProfileGithub.propTypes = {
  profile: PropTypes.object.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
}


export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);