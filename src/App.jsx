import { Route, Routes } from "react-router-dom";
import WordInfo from "./Pages/WordInfo";
import Home from "./Pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/word/:word/id/:id" element={<WordInfo />} />
      </Routes>
    </>
  );
};

export default App;
