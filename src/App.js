import React from "react";
import FLAGS from "./FLAGS";
import Navbar from "./Navbar/Navbar";
import Home from "./pages/Home/Home";
import Settings from "./pages/User/Settings";

// Create pages
import WrestlerCreate from "./pages/Admin/Create/WrestlerCreate";
import CompanyCreate from "./pages/Admin/Create/CompanyCreate";
import TitleCreate from "./pages/Admin/Create/TitleCreate";
import FactionCreate from "./pages/Admin/Create/FactionCreate";
import BrandCreate from "./pages/Admin/Create/BrandCreate";
import PPVCreate from "./pages/Admin/Create/PPVCreate";

// Results pages
import Wrestler from "./pages/Search/Wrestler";
import Company from "./pages/Search/Company";
import Title from "./pages/Search/Title";
import Faction from "./pages/Search/Faction";
import Brand from "./pages/Search/Brand";
import PPV from "./pages/Search/PPV";

// Select pages
import WrestlerSelect from "./pages/Select/WrestlerSelect";
import TitleSelect from "./pages/Select/TitleSelect";
import CompanySelect from "./pages/Select/CompanySelect";
import FactionSelect from "./pages/Select/FactionSelect";
import BrandSelect from "./pages/Select/BrandSelect";
import PPVSelect from "./pages/Select/PPVSelect";

// Gorilla Position pages
import Messages from "./pages/GorillaPosition/Messages";
import Bookmarks from "./pages/GorillaPosition/Bookmarks";
import SearchResults from "./pages/GorillaPosition/SearchResults";
import Feed from "./pages/GorillaPosition/Feed";
import User from "./pages/GorillaPosition/User";

//User pages
import LogIn from "./pages/User/LogIn";
import SignUp from "./pages/User/SignUp";
import ForgotUserName from "./pages/User/forgotUsername";
import ForgotPassword from "./pages/User/forgotPassword";
import Account from "./pages/User/Account";
import Admin from "./pages/Admin/Admin";

//  Game pages
import Games from "./pages/Games/Games";
import RockPaperScissors from "./pages/Games/Rock_Paper_Scissors/Rock_Paper_Scissors.js";
import WrestlEconomy from "./pages/Games/Wrestle_Economy/WrestlEconomy";
import KairiShipSails from "./pages/Games/Kairi_Ship_Sails/KairiShipSails";
import Damien from "./pages/Games/Damien/Damien";
import ChasingTheDragon from "./pages/Games/Chasing_The_Dragon/ChasingTheDragon";
import RingBreaker from "./pages/Games/Ring_Breaker/RingBreaker";

//Other Imports
import { Route, Routes } from "react-router-dom";
import Compare from "./pages/Compare/Compare";
import Chart from "./pages/Chart/Chart";
import TicTacToe from "./pages/Games/Tic Tac Toe/TicTacToe";
import Profile from "./pages/Select/Profile/Profile";

// Parse Imports
import { App_ID, JS_Key, Host_Server } from "./KEYS";
import Parse from "parse/dist/parse.min.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Initializing the SDK
Parse.setAsyncStorage(AsyncStorage);

Parse.initialize(App_ID, JS_Key);
Parse.serverURL = Host_Server;

function App() {
  console.log("FLAGS:", FLAGS);
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          {/* User Features pages */}
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/account" element={<Account />} />
          <Route path="/profile/:profileId" element={<Profile />} />

          {/* Admin pages */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/create/wrestler" element={<WrestlerCreate />} />
          <Route path="/admin/create/company" element={<CompanyCreate />} />
          <Route path="/admin/create/title" element={<TitleCreate />} />
          <Route path="/admin/create/faction" element={<FactionCreate />} />
          <Route path="/admin/create/brand" element={<BrandCreate />} />
          <Route path="/admin/create/ppv" element={<PPVCreate />} />

          {/* Selection pages */}
          <Route path="/wrestler" element={<Wrestler />} />
          <Route path="/title" element={<Title />} />
          <Route path="/company" element={<Company />} />
          <Route path="/faction" element={<Faction />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/ppv" element={<PPV />} />

          {/* Select pages */}
          <Route path="/wrestler/:wrestlerId" element={<WrestlerSelect />} />
          <Route path="/title/:titleId" element={<TitleSelect />} />
          <Route path="/company/:companyId" element={<CompanySelect />} />
          <Route path="/faction/:factionId" element={<FactionSelect />} />
          <Route path="/brand/:brandId" element={<BrandSelect />} />
          <Route path="/ppv/:ppvId" element={<PPVSelect />} />

          {/* Gorilla Position pages */}
          {FLAGS.canUseGP.live && (
            <>
              <Route path="/gp" element={<Feed />} />
              <Route path="/gp/user/:username" element={<User />} />
              <Route path="/gp/messages/:username" element={<Messages />} />
              <Route path="/gp/bookmarks" element={<Bookmarks />} />
              <Route path="/gp/searchresults" element={<SearchResults />} />
            </>
          )}

          {/* User Function pages */}
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/username" element={<ForgotUserName />} />
          <Route path="/password" element={<ForgotPassword />} />

          {/* Other Function pages */}
          {FLAGS.canCompare.live && (
            <Route path="/compare" element={<Compare />} />
          )}
          {FLAGS.canUseCharts.live && (
            <Route path="/charts" element={<Chart />} />
          )}
          {FLAGS.canPlayGames.live && (
            <>
              <Route path="/games" element={<Games />} />
              <Route
                path="/games/rock_paper_scissors"
                element={<RockPaperScissors />}
              />
              <Route
                path="/games/wrestle_economy"
                element={<WrestlEconomy />}
              />
              <Route
                path="/games/kairi_ship_sails"
                element={<KairiShipSails />}
              />
              <Route path="/games/damien" element={<Damien />} />
              <Route
                path="/games/chasing_the_dragon"
                element={<ChasingTheDragon />}
              />
              <Route path="/games/ring_breaker" element={<RingBreaker />} />
              <Route path="/games/tic_tac_toe" element={<TicTacToe />} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
