import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Register() {
    const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: ""
    
  });
  const [message, setMessage] = useState({
    type: "invisible-msg",
    text: ""
  });

  function handleInput(event) {
    setUserDetails((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch("https://spotify-clone-mernstack-1.onrender.com/register", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setMessage({ type: "text-green-500", text: data.message });

      setUserDetails({
        name: "",
        email: "",
        password: ""
        
      });

      setTimeout(() => {
        setMessage({ type: "invisible-msg", text: "" });
      }, 5000);
      navigate('/login');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <section className="h-screen flex items-center justify-center bg-black">
      <form className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
      <img className=" rounded-full w-24 h-24 mx-auto mb-6"  src="https://cdn.pixabay.com/photo/2016/10/22/00/15/spotify-1759471_640.jpg" alt=""/>
        <h1 className="text-white text-3xl font-bold mb-6 text-center">Join Spotify</h1>
        <input
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
          type="text"
          required
          onChange={handleInput}
          placeholder="Enter Name"
          name="name"
          value={userDetails.name}
        />
        <input
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
          type="email"
          required
          onChange={handleInput}
          placeholder="Enter Email"
          name="email"
          value={userDetails.email}
        />
        <input
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
          type="password"
          required
          maxLength={8}
          onChange={handleInput}
          placeholder="Enter Password"
          name="password"
          value={userDetails.password}
        />
        <button className="w-full bg-green-600 p-3 text-white font-semibold rounded hover:bg-green-500 transition duration-200">Join</button>
        <p className="text-gray-400 mt-4">Already Registered? <Link to="/login" className="text-green-500 hover:underline">Login</Link></p>
        <p className={`${message.type} mt-4`}>{message.text}</p>
      </form>
    </section>
  );
}

export default Register;
