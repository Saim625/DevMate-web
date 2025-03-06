import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if(!feed) return

  return (
    <div className="flex justify-center my-10">
      <UserCard  user={feed[1]} showButton={true} />
    </div>
  ) 
};

export default Feed;
