import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Tweets from "./pages/Tweets/Tweets";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Tweets />
      </div>
    </>
  );
}

export default App;
