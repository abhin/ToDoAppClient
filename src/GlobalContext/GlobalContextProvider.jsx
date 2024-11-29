import GlobalContext from "./GlobalContext";
import { showError, showSuccess } from "../Functions/Message";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function GlobalContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [toDos, setToDos] = useState([]);
  const [googleUserToken, setGoogleUserToken] = useState();
  const [isGoogleUserTokenExpired, setIsGoogleUserTokenExpired] = useState(true);

  const login = (email, password) => {
    fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data?.success) {
          showError(data.message);
          return;
        } else {
          setUser(data?.user);
          navigate("/Dashboard");
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const signUp = (name, email, password) => {
    fetch("http://localhost:8000/api/v1/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data?.success) {
          showError(data.message);
          return;
        } else {
          navigate("/login");
          showSuccess(data.message);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const addTodo = (title, description) => {
    fetch("http://localhost:8000/api/v1/todos/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user?.token,
      },
      body: JSON.stringify({ title, description }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data?.success) {
          showError(data.message);
          return;
        } else {
          setToDos([data.toDo, ...toDos]);
          showSuccess(data.message);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const getAllToDo = () => {
    fetch("http://localhost:8000/api/v1/todos/read", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user?.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data?.success) {
          showError(data.message);
          console.log("error", data.message);
          return;
        } else {
          setToDos(data.toDo);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const updateToDo = (id, completed) => {
    fetch("http://localhost:8000/api/v1/todos/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: user?.token,
      },
      body: JSON.stringify({ id, completed }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (!data?.success) {
          showError(data.message);
        } else {
          getAllToDo();
          showSuccess(data.message);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const deleteToDo = (id) => {
    fetch(`http://localhost:8000/api/v1/todos/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: user?.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data?.success) {
          showError(data.message);
          return;
        } else {
          getAllToDo();
          showSuccess(data.message);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const goolgeLogin = () => {
    window.open("http://localhost:8000/api/v1/auth/google", "_self");
  };

  const verifyGoolgeUser = (token) => {
    if (isGoogleUserTokenExpired ) {
      showError("Login expired. Please try again");
      navigate("/login");
      return;
    }
    fetch("http://localhost:8000/api/v1/auth/google/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        if (!data?.success) {
          showError(data.message);
          return;
        } else {
          showSuccess(data.message);
          setUser(data?.user);
          navigate("/Dashboard");
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const logout = () => { setUser(null);
    navigate("/"); }

  useEffect(() => {
    if (user) getAllToDo();
  }, [user]);

  useEffect(() => {
    googleUserToken && verifyGoolgeUser(googleUserToken)
  }, [googleUserToken]);


  return (
    <GlobalContext.Provider
      value={{
        login,
        signUp,
        user,
        addTodo,
        toDos,
        updateToDo,
        deleteToDo,
        goolgeLogin,
        verifyGoolgeUser,
        setGoogleUserToken,
        setIsGoogleUserTokenExpired,
        logout
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
