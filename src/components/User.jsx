import React, { use, useState } from "react";
import { Link } from "react-router";

const User = ({userPromise}) => {
  const initialUsers = use(userPromise);
  const [users,setUsers] = useState(initialUsers)
  // console.log(users);
  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);
    const newUser = { name, email };
    e.target.reset()

    //save this user to the database (via server)
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after saving user : ", data);
        if(data.insertedId){
          newUser._id = data.insertedId;
          const newUsers = [...users,newUser];
          setUsers(newUsers)
            alert('user sign up successfully.')
        }
      });
  };
  const handleDeleteUser=(id)=>{
    console.log('delete data id :',id);
    fetch(`http://localhost:3000/users/${id}`,{
      method : 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.deletedCount){
        alert("User Deleted Successfully.")
        const remaining = users.filter(user => user._id !== id)
        setUsers(remaining);
      }
    })
  }

  return (
    <div>
    <h1>Total User : {users.length}</h1>
      <div>
      <h1 className="text-3xl font-bold my-5">
        Shehab & company LTD. with simple curd
      </h1>
      <div className="py-10 border-2 w-100 mx-auto bg-green-50 my-5">
        <form onSubmit={handleAddUser}>
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            className="p-2 rounded-lg bg-white mb-5"
            required
          />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="p-2 rounded-lg bg-white mb-5"
            required
          />
          <br />
          <button
            type="submit"
            className="p-2 rounded-xl bg-pink-500 text-white"
          >
            Add User
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
    <div>
      <h1 className="text-2xl font-bold">All Users</h1>
      {
        users.map(user => 
          <div key={user._id} className="border-2 p-2 my-5">
            <h3>Name : {user.name}</h3>
            <p>Email : {user.email}</p>
            <Link to={`/users/${user._id}`} className="bg-blue-500 p-2 rounded-xl text-white mr-5">Details</Link>
            <Link to={`/update/${user._id}`} className="bg-yellow-500 p-2 rounded-xl text-white mr-5">Update</Link>
            <button onClick={()=>handleDeleteUser(user._id)} className="bg-red-500 p-2 rounded-xl text-white">Delete</button>
          </div>
        )
      }
    </div>
    </div>
  );
};

export default User;
