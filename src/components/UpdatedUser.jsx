import React from "react";
import { useLoaderData, useNavigate } from "react-router";

const UpdatedUser = () => {
  const user = useLoaderData();
  const navigate = useNavigate()
//   console.log(user);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);

    const updatedUser = { name, email };
    console.log(updatedUser);
    //send data to the server
    navigate('/')
    fetch(`http://localhost:3000/users/${user._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after data :", data);
        if(data.modifiedCount){
            alert('Updated Info Successful.')
        }
      });
  };
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold my-5">Edit My Information</h1>
        <div className="py-10 border-2 w-100 mx-auto bg-green-50 my-5">
          <form onSubmit={handleUpdateUser}>
            <input
              name="name"
              type="text"
              defaultValue={user.name}
              placeholder="Your Name"
              className="p-2 rounded-lg bg-white mb-5"
              required
            />
            <br />
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              placeholder="Your Email"
              className="p-2 rounded-lg bg-white mb-5"
              required
            />
            <br />
            <button
              type="submit"
              className="p-2 rounded-xl bg-pink-500 text-white"
            >
              Update
            </button>
          </form>
        </div>

        {/* {
                users.map(user => 
                    <div key={user.id} className="">
                        <h1>Name : {user.name}</h1>
                        <h2>Email : {user.email}</h2>
                    </div>
                )
            } */}
      </div>
    </div>
  );
};

export default UpdatedUser;
