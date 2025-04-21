import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";


const UserCard = ({ user, showButton }) => {
  const { _id, firstName, lastName, age, gender, skills, imageURL, about } =  user;
   
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
       BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <div className="card bg-base-300 h-auto sm:h-[85vh] w-96 shadow-lg border border-base-300">
        <figure>
          <img
            src={imageURL}
            alt="image"
            className="w-full max-h-64 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {gender && <p>{gender}</p>}
          {age && <p>{"age: " + age}</p>}
          <p className="line-clamp-2">{about}</p>
          {skills && <p>{skills}</p>}
          {showButton && (
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary"
                onClick={() => handleSendRequest("ignored", _id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleSendRequest("interested", _id)}
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    )
};

export default UserCard;
