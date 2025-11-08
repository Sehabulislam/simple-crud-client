import "./App.css";
import User from "./components/User";

const userPromise = fetch('http://localhost:3000/users').then(res =>res.json())

function App() {
  
  return (
    <>
      <h2 className="text-4xl font-bold">Hey Iam Shehab</h2>
    <User userPromise={userPromise}></User>
    </>
  );
}

export default App;
