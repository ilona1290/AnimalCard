import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


import SessionManager from './components/Auth/SessionManager';
import Login from "./components/Auth/Login";

import './App.css';
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
import Treatments from "./pages/Treatments";
import Weight from "./pages/Weight";
import Diseases from "./pages/Diseases";
import InjectionsMenu from "./pages/InjectionsMenu";
import RabiesVaccinations from "./pages/RabiesVaccinations";
import OtherVaccinations from "./pages/OtherVaccinations";
import ResearchResults from "./pages/ResearchResults";
import Visits from "./pages/Visits";
import PetProfile from "./pages/PetProfile";
import OwnerProfile from "./pages/OwnerProfile";
import OwnerCalendar from "./pages/OwnerCalendar";

function App() {
  return (
    <div className="App">
        {SessionManager.getToken() ?
          <Router>
            <CustomAppBar />
            <Routes>
              <Route path="/logout" element={<Logout/>}/>
              <Route path="/updateVetProfile" element={<UpdateVetProfile />} />
              <Route path="/adminMenu" element={<AdminMenu />} />
              <Route path="/vetMenu" element={<VetMenu />} />
              <Route path="/ownerMenu" element={<OwnerMenu />} />
              <Route path="/ownerMenu/profile" element={<OwnerProfile />} />
              <Route path="/ownerMenu/calendar" element={<OwnerCalendar />} />
              <Route path="/vetMenu/profile" element={<VetProfile />} />
              <Route path="/vetMenu/calendar" element={<VetCalendar />} />
              <Route path="/vetMenu/calendar/startVisit/:visitId/type/:visitType" element={<StartVisit />} />
              <Route path="/vetMenu/animalCard/create" element={<CreateAnimalCard />} />
              <Route path="/pets/:petId" element={<AnimalCard />} />
              <Route path="/pets/:petId/profile" element={<PetProfile />} />
              <Route path="/pets/:petId/injections" element={<InjectionsMenu />} />
              <Route path="/pets/:petId/visits" element={<Visits />} />
              <Route path="/pets/:petId/injections/rabiesVacinations" element={<RabiesVaccinations />} />
              <Route path="/pets/:petId/injections/otherVacinations" element={<OtherVaccinations />} />
              <Route path="/pets/:petId/diseases" element={<Diseases />} />
              <Route path="/pets/:petId/treatments" element={<Treatments />} />
              <Route path="/pets/:petId/researchResults" element={<ResearchResults />} />
              <Route path="/pets/:petId/weight" element={<Weight />} />
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
