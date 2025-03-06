import React from "react";

const UserCard = ({ user ,showButton}) => {
  const { firstName, lastName, age, gender, skills, imageURL, about } = user;

  return (
    user && (
      <div className="card bg-base-300 h-full w-96 shadow-lg border border-base-300">
        <figure>
          <img src={imageURL} alt="image" className="w-96" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {gender && <p>{gender}</p>}
          {age && <p>{"age: " + age}</p>}
          <p>{about}</p>
          {skills && <p>{skills}</p>}
          {showButton && (
            <div className="card-actions justify-center">
              <button className="btn btn-primary">Ignore</button>
              <button className="btn btn-secondary">Interested</button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default UserCard;
