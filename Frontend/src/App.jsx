import React from "react";
import Right from './home/right/Right'
import Left from './home/left/Left'
import Logout from "./home/left1/Logout";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAuth } from "./context/AuthProvider";
import { Navigate,Routes, Route } from "react-router-dom";

const App = () => {
  
  const [authUser] = useAuth();
  console.log("app is render")
  return (
    <>

      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen">
             
                <Logout />
                <Left />
                <Right />
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
     
    </>
  );
};

export default App;
