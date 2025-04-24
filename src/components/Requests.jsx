import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);
  
  if (!requests) return;

  if (requests.length === 0) {
    return (
      <div className="flex justify-center items-center ">
        <h1 className="font-bold text-3xl my-4">
          You don't have any requests yet
        </h1>
      </div>
    );
  }

  return (
    <div>
      <div className="font-bold text-3xl text-center my-10 text-white">Requests</div>
      {requests.map((request) => {
        console.log(request);
        const { _id, imageURL, firstName, lastName, about } =
          request.fromUserId;
        return (
          <div key={_id} className="flex justify-center items-center my-5 px-4">
            <div className="card w-96 bg-base-300 shadow-xl border border-base-300 p-4 flex flex-row items-center gap-4">
              {/* Profile Picture */}
              <div className="w-16 h-16">
                <img
                  src={imageURL}
                  alt="User"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="card-title text-base">
                  {firstName + " " + lastName}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-2">{about}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <button
                  className="btn btn-secondary btn-xs"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  reject
                </button>
                <button
                  className="btn btn-primary btn-xs"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  accept
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
