import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFristName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleProfileEdit = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          skills,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data));
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div class=" flex flex-col justify-center overflow-hidden my-10">
      <div class="w-full p-6 m-auto bg-base-300 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <h1 class="text-3xl font-semibold text-center">Edit Profile</h1>
        <form class="space-y-4">
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
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              class="w-full input input-bordered"
            />
          </div>
          <div>
            <label class="label">
              <span class="text-base label-text">About:</span>
            </label>
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              class="w-full input input-bordered"
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
          <p>{error}</p>
          <div>
            <button
              type="button"
              class="btn-neutral btn btn-block"
              onClick={handleProfileEdit}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
