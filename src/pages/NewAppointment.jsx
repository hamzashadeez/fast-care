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
} from "firebase/firestore";
import Input from "../components/Input";

import Button from "../components/Button";
import LoadingComponent from "../components/LoadingComponent";

const Doctor = ({ data, selected, setSelected }) => {
  console.log(data);
  return (
    <div
      onClick={() => setSelected(data)}
      className={`w-[200px] h-[250px] border-2 ${
        selected?.fullName === data?.fullName
          ? "bg-brand/5 border border-brand"
          : "bg-white border-white"
      }  shadow-sm p-3 flex flex-col justify-between`}
    >
      <div>
        <img
          src={data?.profilePic ? data?.profilePic : "/man.jpg"}
          alt=""
          className="w-[70px] mx-auto rounded-full h-[70px]  object-cover"
        />
        <p className="font-semibold text-sm text-center mt-4 truncate mx-2">
          Dr {data?.fullName}
        </p>
        <p className="font-semibold text-sm text-center mt-2 capitalize italic text-green-400">
          {data?.speciality}
        </p>
        <div className="w-full h-[2px] bg-brand/10 mt-2"></div>
      </div>
      <p className="font-semibold text-lg mt-2">₦{data?.rate}k/session</p>
      <div className="font-semibold border bg-brand/20 text-brand py-1 text-sm text-center mt-2">
        Available
      </div>

      {/* <button
        type="button"
        className="font-semibold border border-brand/20 rounded-full text-brand py-2 text-sm text-center mt-2"
      >
        Select
      </button> */}
    </div>
  );
};
const NewAppointment = () => {
  const [user, setUser] = useRecoilState(userData);

  const [selected, setSelected] = useState(null);

  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");

  const [desc, setDesc] = useState("");

  const navigate = useNavigate();

  const getDoctors = async () => {
    console.log("hello");
    const dr = [];
    const q = query(collection(db, "users"), where("userType", "==", "doctor"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      dr.push(doc.data());
      setDoctors(dr);
    });
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const submitAppointment = async (e) => {
    if(loading) return;
    setLoading(true)
    e.preventDefault();
    const data = {
      doctor: selected,
      sessionName: name,
      sessionDesc: desc,
      patient: user,
      id: user?.email,
      doctorId: selected.email,
      status: "pending",
      date: new Date().toUTCString(),
      timestamp: Timestamp.now(),
    };
    const id = new Date().getTime();
    
    const dataRef = doc(db, "bookings", String(id));
    setDoc(dataRef, data, { merge: true }).then(() => {
        alert("Successfully Made an Appointment");
        setLoading(false);
        navigate("/bookings");
    }).catch((error) => {
        setLoading(false);
        alert(error.message);
    })
  };
  return (
    <div className="w-full min-h-screen bg-brand/5">
      {loading && <LoadingComponent />}
      <form
        onSubmit={(e) => submitAppointment(e)}
        className="w-full md:w-1/2 mx-auto pt-12"
      >
        <Link
          className="text-brand bg-brand/10 px-4 py-2 rounded-md mx-5 "
          to={"/bookings"}
        >
          Go Back
        </Link>

        <h1 className="text-2xl md:text-3xl font-semibold text-brand my-4 px-5">
          New Appointment
        </h1>
        <section>
          <p className="text-sm text-gray-500 font-semibold mb-1 px-5">
            Select Doctor
          </p>
          <main className="flex items-center gap-4 flex-wrap px-5">
            {doctors.map((doc, index) => (
              <Doctor
                data={doc}
                key={index}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </main>

          {/* session details */}
          <div className="flex flex-col mt-8 gap-4 px-4">
            <div>
              <label
                htmlFor="name"
                className="text-md text-gray-500 font-semibold mb-1"
              >
                Enter Session Label/Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="session name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="desc"
                className="text-md text-gray-500 font-semibold mb-1"
              >
                Enter Description
              </label>
              <Input
                id="desc"
                type="text"
                placeholder="description (optional)"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </div>
          </div>

          {/* end session details */}
          <div className="w-full h-[2px] bg-brand/10 my-8"></div>
            <div className="px-5">

            <Button label="Submit" type="submit" />
            </div>
        </section>
      </form>
    </div>
  );
};

export default NewAppointment;
