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
        <div class="profile-github">
          <h2 class="text-primary my-1">
            <i class="fab fa-github"></i> Github Repos
          </h2>
          {profile.repos.map((repo) => (
            <div class="repo bg-white p-1 my-1">
              <div>
                <h4><a href={repo.html_url} target="_blank"
                  rel="noopener noreferrer">{repo.name}</a></h4>
                <p>
                  {repo.description}
                </p>
              </div>
              <div>
                <ul>
                  <li class="badge badge-primary">Stars: {repo.stargazers_count}</li>
                  <li class="badge badge-dark">Watchers: {repo.watchers_count}</li>
                  <li class="badge badge-light">Forks: {repo.forks_count}</li>
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