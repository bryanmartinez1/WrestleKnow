import Navbar from "./Navbar/Navbar";
import Home from "./Pages/Home";
import Settings from "./Pages/User/Settings";

// Create Pages
import CreateWrestler from "./Pages/Create/CreateWrestler";
import CreateTitle from "./Pages/Create/CreateTitle";
import CreateBrand from "./Pages/Create/CreateBrand";
import CreatePPV from "./Pages/Create/CreatePPV";
import CreateCompany from "./Pages/Create/CreateCompany";
import CreateFaction from "./Pages/Create/CreateFaction";

// Results Pages
import Wrestler from "./Pages/Search/Wrestler";
import Company from "./Pages/Search/Company";
import Title from "./Pages/Search/Title";
import Faction from "./Pages/Search/Faction";

// Chosen Pages
import ChosenWrestler from "./Pages/Select/ChosenWrestler";
import ChosenCompany from "./Pages/Select/ChosenCompany";
import ChosenTitle from "./Pages/Select/ChosenTitle";
import ChosenFaction from "./Pages/Select/ChosenFaction";
import ChosenBrand from "./Pages/Select/ChosenBrand";
import ChosenPPV from "./Pages/Select/ChosenPPV";

// Gorilla Position Pages
import Profile from "./Pages/GorillaPosition/Profile";
import Messages from "./Pages/GorillaPosition/Messages";
import Bookmarks from "./Pages/GorillaPosition/Bookmarks";
import SearchResults from "./Pages/GorillaPosition/SearchResults";
import Feed from "./Pages/GorillaPosition/Feed";
import OtherUser from "./Pages/GorillaPosition/OtherUser";

//User Pages
import LogIn from "./Pages/User/LogIn";
import SignUp from "./Pages/User/SignUp";
import ForgotUserName from "./Pages/User/forgotUsername";
import ForgotPassword from "./Pages/User/forgotPassword";
import Account from "./Pages/User/Account";
import Admin from "./Pages/User/Admin";

//Other Imports
import { Route, Routes } from "react-router-dom";

// Parse Imports
import { App_ID, JS_Key, Host_Server } from "./KEYS";
import Parse from "parse/dist/parse.min.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Follow from "./Pages/GorillaPosition/Follow";

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
          <Route path="/gp" element={<Feed />} />
          <Route path="/gp/profile" element={<Profile />} />
          <Route path="/gp/messages" element={<Messages />} />
          <Route path="/gp/bookmarks" element={<Bookmarks />} />
          <Route path="/gp/searchresults" element={<SearchResults />} />
          <Route path="/gp/otheruser" element={<OtherUser />} />
          <Route path="/gp/follow" element={<Follow />} />

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
