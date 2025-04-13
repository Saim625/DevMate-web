import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addConnections, removeConnections } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const handleRemove = async (connectionId) => {
    try {
      const res = await axios.delete(
        BASE_URL + `/user/connection/remove/${connectionId}`,
        {
          withCredentials: true,
        }
      );

      dispatch(removeConnections(connectionId));
    } catch (err) {
      console.error(err);
    }
  };

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center ">
        <h1 className="font-bold text-3xl my-4">
          You don't have any connections yet
        </h1>
        <Link to="/" className="underline text-blue-500">
          Make Connections
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="font-bold text-3xl text-center my-10">Connections</div>
      {connections.map((connection) => {
        const { imageURL, firstName, lastName, about } = connection;
        return (
          <div
            key={connection._id}
            className="flex justify-center items-center my-5 px-4"
          >
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
                <Link to={"/chat/" + connection._id} >
                  <button className="btn btn-primary btn-xs">Message</button>
                </Link>
                <button
                  className="btn btn-secondary btn-xs"
                  onClick={() => handleRemove(connection.connectionId)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
