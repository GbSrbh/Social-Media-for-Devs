import Moment from "react-moment";

const ProfileEducation = ({ education }) => {
  return (
    <div>
      <h3 className="text-dark">{education.school}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{education.from}</Moment> {' - '}
        {education.to ? <Moment format="YYYY/MM/DD">{education.to}</Moment> : (<span>Now</span>)}
      </p>
      <p><strong>Degree: </strong>{education.degree}</p>
      {education.description && (
        <p>
          <strong>Description: </strong>{education.description}
        </p>
      )}
    </div>
  )
}

export default ProfileEducation;