import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


import SessionManager from './components/Auth/SessionManager';
import Login from "./components/Auth/Login";

import './App.css';
import StartPage from "./pages/StartPage";
import Logout from "./components/Auth/Logout";
import CreateUser from "./components/User/CreateUser";
import Home from "./pages/Home";
import ConfirmEmail from "./pages/ConfirmEmail";
import ConfirmEmailInfo from "./pages/ConfirmEmailInfo";
import UpdateVetProfile from "./pages/UpdateVetProfile";
import AdminMenu from "./pages/AdminMenu";
import AdminConfirmCustoms from "./pages/AdminConfirmCustoms";
import VetMenu from "./pages/VetMenu";
import VetProfile from "./pages/VetProfile";
import Pets from "./pages/Pets";
import AnimalCard from "./pages/AnimalCard";
import OwnerMenu from "./pages/OwnerMenu";
import VetCalendar from "./pages/VetCalendar";
import StartVisit from "./pages/StartVisit";
import CustomAppBar from "./components/CustomAppBar";
import CreateAnimalCard from "./pages/CreateAnimalCard";

function App() {
  return (
    <div className="App">
        {SessionManager.getToken() ?
          <Router>
            <CustomAppBar />
            <Routes>
              <Route path="/start" element={<StartPage/>}/>
              <Route path="/logout" element={<Logout/>}/>
              <Route path="/updateVetProfile" element={<UpdateVetProfile />} />
              <Route path="/adminMenu" element={<AdminMenu />} />
              <Route path="/vetMenu" element={<VetMenu />} />
              <Route path="/ownerMenu" element={<OwnerMenu />} />
              <Route path="/vetMenu/profile" element={<VetProfile />} />
              <Route path="/vetMenu/calendar" element={<VetCalendar />} />
              <Route path="/vetMenu/calendar/startVisit" element={<StartVisit />} />
              <Route path="/vetMenu/animalCard/create" element={<CreateAnimalCard />} />
              <Route path="/pets/:petId" element={<AnimalCard />} />
              <Route path="/pets" element={<Pets />} />
              <Route path="/confirmCustoms" element={<AdminConfirmCustoms />} />
            </Routes>
          </Router>
          :
          <Router>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<CreateUser />} />
              <Route path="/confirmEmailInfo" element={<ConfirmEmailInfo/>} />
              <Route path='/confirmEmail' element={<ConfirmEmail/>} />
            </Routes>
          </Router>
        }
    </div>
  );
}

export default App;
