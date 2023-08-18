import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ProfileItem = ({ profile, profileState, i }) => {

  return (
    <div className="profile bg-light">
      <img src={profile.user.avatar} alt="Display Avatar" className="round-img" />
      <div>
        <h2>{profile.user.name}</h2>
        <p>{profile.status} {profile.company && <span>at {profile.company}</span>}</p>
        <p className="my-1">{profile.location && <span>{profile.location}</span>}</p>
        <Link to={`/profile/${profile.user._id}`} className="btn btn-primary" >
          View Profile
        </Link>
      </div>

      <ul>
        {profileState.skillsArray[i].map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>

    </div>
  )

}
const mapStateToProps = state => ({
  profileState: state.profile,
})

export default connect(mapStateToProps)(ProfileItem);