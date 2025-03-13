import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFristName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [imageURL, setImageURL] = useState(user.imageURL);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          imageURL,
          about,
          skills,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data);
    }
  };
  return (
    <>
      <div className="flex justify-center my-10">
        <div class=" flex flex-col justify-center overflow-hidden mx-4">
          <div class="w-96 p-6 m-auto bg-base-300 rounded-3xl shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
            <h1 class="text-3xl font-semibold text-center">Edit Profile</h1>
            <form class="space-y-2">
              <div>
                <label class="label">
                  <span class="text-base label-text">First Name:</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFristName(e.target.value)}
                  class="w-full input input-bordered"
                />
              </div>
              <div>
                <label class="label">
                  <span class="text-base label-text">Last Name:</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  class="w-full input input-bordered"
                />
              </div>
              <div>
                <label class="label">
                  <span class="text-base label-text">Age:</span>
                </label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  class="w-full input input-bordered"
                />
              </div>
              <div>
                <label class="label">
                  <span class="text-base label-text">Gender:</span>
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  class="w-full input input-bordered"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label class="label">
                  <span class="text-base label-text">Image URL:</span>
                </label>
                <input
                  type="text"
                  value={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
                  class="w-full input input-bordered"
                />
              </div>
              <div>
                <label class="label">
                  <span class="text-base label-text">About:</span>
                </label>
                <textarea
                  type="text"
                  value={about}
                  rows={4}
                  onChange={(e) => setAbout(e.target.value)}
                  class="w-full textarea textarea-bordered"
                />
              </div>
              <div>
                <label class="label">
                  <span class="text-base label-text">Skills:</span>
                </label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  class="w-full input input-bordered"
                />
              </div>
              <p className="text-red-600">{error}</p>
              <div>
                <button
                  type="button"
                  class="btn-primary btn btn-block"
                  onClick={saveProfile}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
        <UserCard
          user={{
            firstName,
            lastName,
            age,
            gender,
            imageURL,
            about,
            skills,
          }}
          showButton={false}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
