import { Link, useNavigate } from "react-router-dom";
import userData from "../lib/userData";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Input from "../components/Input";

import Button from "../components/Button";
import LoadingComponent from "../components/LoadingComponent";
import { uploadFileAndReturnURL } from "../lib/uploadImage";

const UpdateProfile = () => {
  const [user, setUser] = useRecoilState(userData);

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [rate, setRate] = useState(0);
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setFullName(user?.fullName);
    setBio(user?.bio);
    setSpeciality(user?.speciality);
    setRate(user?.rate);
  }, [user]);

  const updateProfile = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const userRef = doc(db, "users", user?.email);

    await updateDoc(userRef, {
      fullName,
      bio,
      speciality,
      rate,
    })
      .then(() => {
        setLoading(false);
        navigate("/profile");
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
  };
  const updateProfilePic = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    let url = await uploadFileAndReturnURL(image);

    const userRef = doc(db, "users", user?.email);

    await updateDoc(userRef, {
      profilePic: url,
    })
      .then(() => {
        setLoading(false);
        navigate("/profile");
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="w-full min-h-screen bg-brand/5 py-12">
      {loading && <LoadingComponent />}
      <form
        onSubmit={(e) => updateProfile(e)}
        className="w-full md:w-1/2 mx-auto  py-12 px-6 bg-white shadow-md rounded-md"
      >
        <Link
          className="text-brand bg-brand/10 px-4 py-2 rounded-md "
          to={"/profile"}
        >
          Go Back
        </Link>

        <h1 className="text-2xl md:text-3xl font-semibold text-brand my-4">
          Update Profile Details
        </h1>
        <section>
          {/* session details */}
          <div className="flex flex-col mt-8 gap-4">
            <div>
              <label
                htmlFor="name"
                className="text-md text-gray-500 font-semibold mb-1"
              >
                Enter Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="bio"
                className="text-md text-gray-500 font-semibold mb-1"
              >
                Enter BIO
              </label>
              <Input
                id="bio"
                type="text"
                placeholder="Enter BIO"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
              />
            </div>

            {/* profile pic */}
          </div>

          {/* end session details */}
          <div className="w-full h-[2px] bg-brand/10 my-8"></div>

          <Button label={loading ? "Loading..." : "Submit"} type="submit" />
        </section>
      </form>

      <form
        onSubmit={(e) => updateProfilePic(e)}
        className="w-full md:w-1/2 mx-auto mt-16 py-6 shadow-md px-4 bg-white rounded-md"
      >
        <h1 className="text-2xl md:text-3xl font-semibold text-brand my-3 ">
          Update Profile Photo
        </h1>
        <div className="">
          <Input
            id="profile"
            type="file"
            required
            placeholder=""
            onChange={(e) => setImage(e.target.files[0])}
          />
          <Button
            label={loading ? "Loading..." : "Change Picture"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
