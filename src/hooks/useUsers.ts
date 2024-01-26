import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import { User } from "../services/api-client";
import userService from "../services/user-service";

const useUsers = () => {

  const [users, setUsers] = useState<User[]>([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const { response, cancel } = userService.getList<User>();

    response
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
        setError("");
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        console.log("Error", error.message);
        setError(error.message);
        setUsers([]);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return {users,error, loading, setUsers, setError, setLoading}
}


export default useUsers;    