import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Login() {
  const loggedData = useContext(UserContext);
  const navigate = useNavigate();
  const [userCreds, setUserCreds] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState({
    type: "invisible-msg",
    text: ""
  });

  function handleInput(event) {
    setUserCreds((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch("https://spotify-clone-mernstack-1.onrender.com/login", {
      method: 'POST',
      body: JSON.stringify(userCreds),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.status === 404) {
        setMessage({ type: "text-red-500", text: "Username or Email Doesn't Exist" });
      } else if (response.status === 403) {
        setMessage({ type: "text-red-500", text: "Incorrect Password" });
      }

      setTimeout(() => {
        setMessage({ type: "invisible-msg", text: '' });
      }, 5000);

      return response.json();
    })
    .then((data) => {
      if (data.token !== undefined) {
        localStorage.setItem("nutrify-user", JSON.stringify(data));
        loggedData.setLoggedUser(data);
        navigate("/home");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <section className="h-screen flex items-center justify-center bg-black">
      <form className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <img className=" rounded-full w-24 h-24 mx-auto mb-6"  src="https://cdn.pixabay.com/photo/2016/10/22/00/15/spotify-1759471_640.jpg" alt=""/>
        <h1 className=" text-white text-3xl font-bold mb-6 text-center">Login in to Spotify</h1>
        <input
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
          required
          onChange={handleInput}
          type="email"
          placeholder="Enter Email"
          name="email"
          value={userCreds.email}
        />
        <input
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
          required
          maxLength="8"
          onChange={handleInput}
          type="password"
          placeholder="Enter Password"
          name="password"
          value={userCreds.password}
        />
        <button className="w-full bg-green-600 p-3 text-white font-semibold rounded hover:bg-green-500 transition duration-200">Login</button>
        <p className="text-gray-400 mt-4">Don't have an account? <Link to="/register" className="text-green-500 hover:underline">Register Now</Link></p>
        <p className={`${message.type} mt-4`}>{message.text}</p>
      </form>
    </section>
  );
}

export default Login;