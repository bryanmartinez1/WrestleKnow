import React from "react";
import Navbar from "./Navbar/Navbar";
import Home from "./Pages/Home";
import Settings from "./Pages/User/Settings";

// Create Pages
import CreateWrestler from "./Pages/Admin/Create/CreateWrestler";
import CreateTitle from "./Pages/Admin/Create/CreateTitle";
import CreateBrand from "./Pages/Admin/Create/CreateBrand";
import CreatePPV from "./Pages/Admin/Create/CreatePPV";
import CreateCompany from "./Pages/Admin/Create/CreateCompany";
import CreateFaction from "./Pages/Admin/Create/CreateFaction";

// Results Pages
import Wrestler from "./Pages/Search/Wrestler";
import Company from "./Pages/Search/Company";
import Title from "./Pages/Search/Title";
import Faction from "./Pages/Search/Faction";
import Brand from "./Pages/Search/Brand";
import PPV from "./Pages/Search/PPV";

// Select Pages
import WrestlerSelect from "./Pages/Select/WrestlerSelect";
import TitleSelect from "./Pages/Select/TitleSelect";
import CompanySelect from "./Pages/Select/CompanySelect";
import FactionSelect from "./Pages/Select/FactionSelect";
import BrandSelect from "./Pages/Select/BrandSelect";
import PPVSelect from "./Pages/Select/PPVSelect";

// Gorilla Position Pages
import Messages from "./Pages/GorillaPosition/Messages";
import Bookmarks from "./Pages/GorillaPosition/Bookmarks";
import SearchResults from "./Pages/GorillaPosition/SearchResults";
import Feed from "./Pages/GorillaPosition/Feed";
import User from "./Pages/GorillaPosition/User";

//User Pages
import LogIn from "./Pages/User/LogIn";
import SignUp from "./Pages/User/SignUp";
import ForgotUserName from "./Pages/User/forgotUsername";
import ForgotPassword from "./Pages/User/forgotPassword";
import Account from "./Pages/User/Account";
import Admin from "./Pages/Admin/Admin";

//Other Imports
import { Route, Routes } from "react-router-dom";
import Compare from "./Pages/Compare/Compare";

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
          {/* Admin Pages */}
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/admin/createwrestler"
            element={<CreateWrestler />}
          ></Route>
          <Route path="/admin/createtitle" element={<CreateTitle />}></Route>
          <Route path="/admin/createbrand" element={<CreateBrand />}></Route>
          <Route path="/admin/createppv" element={<CreatePPV />}></Route>
          <Route
            path="/admin/createcompany"
            element={<CreateCompany />}
          ></Route>
          <Route
            path="/admin/createfaction"
            element={<CreateFaction />}
          ></Route>
          {/* Selection Pages */}
          <Route path="/wrestler" element={<Wrestler />} />
          <Route path="/title" element={<Title />} />
          <Route path="/company" element={<Company />} />
          <Route path="/faction" element={<Faction />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/ppv" element={<PPV />} />
          {/* Select Pages */}
          <Route path="/wrestler/:wrestlerId" element={<WrestlerSelect />} />
          <Route path="/title/:titleId" element={<TitleSelect />} />
          <Route path="/company/:companyId" element={<CompanySelect />} />
          <Route path="/faction/:factionId" element={<FactionSelect />} />
          <Route path="/brand/:brandId" element={<BrandSelect />} />
          <Route path="/ppv/:ppvId" element={<PPVSelect />} />
          {/* Gorilla Position Pages */}
          <Route path="/gp" element={<Feed />} />
          <Route path="/gp/messages" element={<Messages />} />
          <Route path="/gp/bookmarks" element={<Bookmarks />} />
          <Route path="/gp/searchresults" element={<SearchResults />} />
          <Route path="/gp/user" element={<User />} />
          <Route path="/gp/follow" element={<Follow />} />
          {/* User Function Pages */}
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/username" element={<ForgotUserName />} />
          <Route path="/password" element={<ForgotPassword />} />
          {/* Other Function Pages */}
          <Route path="/compare" element={<Compare />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
