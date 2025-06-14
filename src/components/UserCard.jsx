import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user, showButton }) => {
  const { _id, firstName, lastName, age, gender, skills, imageURL, about } =
    user;

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
    <div className="card bg-base-100 w-80 h-full sm:h-[60vh] sm:w-96 shadow-xl border border-base-300 overflow-hidden flex justify-center">
      <figure className="overflow-hidden">
        <img
          src={imageURL}
          alt="image"
          className="w-full max-h-64 object-cover"
        />
      </figure>

      <div className="card-body flex flex-col justify-start gap-2">
        <h2 className="card-title text-lg sm:text-xl font-semibold">
          {firstName + " " + lastName}
        </h2>

        <div className="text-sm text-base-content/70 space-y-1">
          {gender && (
            <p>
              <span className="font-medium text-base-content">Gender:</span>{" "}
              {gender}
            </p>
          )}
          {age && (
            <p>
              <span className="font-medium text-base-content">Age:</span> {age}
            </p>
          )}
          {skills && (
            <p>
              <span className="font-medium text-base-content">Skills:</span>{" "}
              {skills}
            </p>
          )}
        </div>

        <p className="text-sm text-base-content line-clamp-2 overflow-hidden">
          {about}
        </p>

        {showButton && (
          <div className="card-actions mt-2 flex justify-center gap-x-4">
            <button
              className="btn btn-sm btn-outline btn-error"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
