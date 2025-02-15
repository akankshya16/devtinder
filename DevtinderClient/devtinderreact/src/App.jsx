import Navbar from "./components/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/body";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route
              path="/login"
              element={
                <div>
                  {" "}
                  <Login />
                </div>
              }
            />
            <Route
              path="/profile"
              element={
                <div>
                  {" "}
                  <Profile />
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>

      <Navbar />
    </>
  );
}

export default App;
