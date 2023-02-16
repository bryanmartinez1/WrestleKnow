import Navbar from "./Navbar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";

// Create Pages
import CreateWrestler from "./pages/CreatePages/CreateWrestler";
import CreateTitle from "./pages/CreatePages/CreateTitle";
import CreateBrand from "./pages/CreatePages/CreateBrand";
import CreatePPV from "./pages/CreatePages/CreatePPV";
import CreateCompany from "./pages/CreatePages/CreateCompany";
import CreateFaction from "./pages/CreatePages/CreateFaction";

// Results Pages
import Wrestler from "./pages/ResultsPages/Wrestler";
import Company from "./pages/ResultsPages/Company";
import Title from "./pages/ResultsPages/Title";
import Faction from "./pages/ResultsPages/Faction";

// Chosen Pages
import ChosenWrestler from "./pages/ChosenPages/ChosenWrestler";
import ChosenCompany from "./pages/ChosenPages/ChosenCompany";
import ChosenTitle from "./pages/ChosenPages/ChosenTitle";
import ChosenFaction from "./pages/ChosenPages/ChosenFaction";
import ChosenBrand from "./pages/ChosenPages/ChosenBrand";
import ChosenPPV from "./pages/ChosenPages/ChosenPPV";

// Gorilla Position Pages
import Profile from "./pages/GorillaPositionPages/Profile";
import Messages from "./pages/GorillaPositionPages/Messages";
import Bookmarks from "./pages/GorillaPositionPages/Bookmarks";
import SearchResults from "./pages/GorillaPositionPages/SearchResults";
import Feed from "./pages/GorillaPositionPages/Feed";
import OtherUser from "./pages/GorillaPositionPages/OtherUser";

//User Pages
import LogIn from "./pages/UserPages/LogIn";
import SignUp from "./pages/UserPages/SignUp";
import ForgotUserName from "./pages/UserPages/forgotUsername";
import ForgotPassword from "./pages/UserPages/forgotPassword";
import Account from "./pages/UserPages/Account";
import Admin from "./pages/UserPages/Admin";

//Other Imports
import { Route, Routes } from "react-router-dom";

// Parse Imports
import { App_ID, JS_Key, Host_Server } from "./KEYS";
import Parse from "parse/dist/parse.min.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Initializing the SDK
Parse.setAsyncStorage(AsyncStorage);

Parse.initialize(App_ID, JS_Key);
Parse.serverURL = Host_Server;

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          {/* User Features Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<Admin />} />

          {/* Create Pages */}
          <Route path="/createwrestler" element={<CreateWrestler />}></Route>
          <Route path="/createtitle" element={<CreateTitle />}></Route>
          <Route path="/createbrand" element={<CreateBrand />}></Route>
          <Route path="/createppv" element={<CreatePPV />}></Route>
          <Route path="/createcompany" element={<CreateCompany />}></Route>
          <Route path="/createfaction" element={<CreateFaction />}></Route>

          {/* Selection Pages */}
          <Route path="/wrestler" element={<Wrestler />} />
          <Route path="/title" element={<Title />} />
          <Route path="/company" element={<Company />} />
          <Route path="/faction" element={<Faction />} />

          {/* Chosen Pages */}
          <Route path="/wrestler/chosenwrestler" element={<ChosenWrestler />} />
          <Route path="/title/chosentitle" element={<ChosenTitle />} />
          <Route path="/company/chosencompany" element={<ChosenCompany />} />
          <Route path="/faction/chosenfaction" element={<ChosenFaction />} />
          <Route
            path="/company/chosencompany/brand"
            element={<ChosenBrand />}
          />
          <Route path="/company/chosencompany/ppv" element={<ChosenPPV />} />

          {/* Gorilla Position Pages */}
          <Route path="/gorillaposition" element={<Profile />} />
          <Route path="/gorillaposition/profile" element={<Profile />} />
          <Route path="/gorillaposition/messages" element={<Messages />} />
          <Route path="/gorillaposition/bookmarks" element={<Bookmarks />} />
          <Route
            path="/gorillaposition/searchresults"
            element={<SearchResults />}
          />
          <Route path="/gorillaposition/feed" element={<Feed />} />
          <Route path="/gorillaposition/otheruser" element={<OtherUser />} />

          {/* User Function Pages */}
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/username" element={<ForgotUserName />} />
          <Route path="/password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
