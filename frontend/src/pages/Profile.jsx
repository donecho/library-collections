import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState({});

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    api.get("/users/me").then(res => {
      setUser(res.data);
      setName(res.data.name || "");
      setAddress(res.data.address || "");
      setDob(res.data.dob?.slice(0,10) || "");
    });
  }, []);

  const updateProfile = async () => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("address", address);
      formData.append("dob", dob);

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const res = await api.put("/users/me", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setUser(res.data);
      toast.success("Profile Updated");

    } catch {
      toast.error("Update Failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 shadow rounded-xl">

      <h1 className="text-2xl font-bold mb-4 text-center">My Profile</h1>

      {/* Avatar */}
      {user.avatar && (
        <img
          src={`http://localhost:5000/${user.avatar}`}
          className="w-40 h-40 rounded-full object-cover mb-5 mx-auto "
        />
      )}

      <input
        type="file"
        onChange={(e) => setAvatar(e.target.files[0])}
        className="mb-4"
      />

      {/* Email */}
      <p className="text-gray-500 mb-2">Email</p>
      <input
        value={user.email || ""}
        disabled
        className="w-full mb-4 p-2 border rounded bg-gray-100"
      />

      {/* Name */}
      <p className="text-gray-500 mb-2">Name</p>
      <input
        value={name}
        onChange={(e)=>setName(e.target.value)}
        className="w-full mb-4 p-2 border rounded dark:bg-gray-700"
      />

      {/* Address */}
      <p className="text-gray-500 mb-2">Address</p>
      <input
        value={address}
        onChange={(e)=>setAddress(e.target.value)}
        className="w-full mb-4 p-2 border rounded dark:bg-gray-700"
      />

      {/* DOB */}
      <p className="text-gray-500 mb-2">Date of Birth</p>
      <input
        type="date"
        value={dob}
        onChange={(e)=>setDob(e.target.value)}
        className="w-full mb-6 p-2 border rounded dark:bg-gray-700"
      />

      <button
        onClick={updateProfile}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
        Save Changes
      </button>

    </div>
  );
};

export default Profile;
