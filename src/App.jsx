import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomeProvider } from "./context/HomeContext";

import HomePage from "./components/HomePage";
import ETLComponent from "./components/ETLComponent";
import FurnaceComponent from "./components/FurnaceComponent";
import Navbar from "./shared/Navbar";
import { ETLProvider } from "./context/ETLContext";

function App() {
    return (
      <>
      <Navbar />
        <HomeProvider>
          <ETLProvider>
            <BrowserRouter>

                <Routes>

                    <Route path="/home" element={<HomePage />} />
                    <Route path="/etl" element={<ETLComponent />} />
                    <Route path="/furnace" element={<FurnaceComponent />} />

                </Routes>

            </BrowserRouter>
          </ETLProvider>
        </HomeProvider>
    </>
    );
}

export default App;