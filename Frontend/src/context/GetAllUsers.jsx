import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function GetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
       
        const token = Cookies.get("token");

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/allusers`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // only if your backend reads this
          },
        });
      
        setAllUsers(response.data);
      } catch (error) {
        console.log("Error in useGetAllUsers: " ,error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
}

export default GetAllUsers;
