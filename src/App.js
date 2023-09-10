import React from "react";
import FLAGS from "./FLAGS";
import Navbar from "./Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Settings from "./Pages/User/Settings";

// Create Pages
import WrestlerCreate from "./Pages/Admin/Create/WrestlerCreate";
import CompanyCreate from "./Pages/Admin/Create/CompanyCreate";
import TitleCreate from "./Pages/Admin/Create/TitleCreate";
import FactionCreate from "./Pages/Admin/Create/FactionCreate";
import BrandCreate from "./Pages/Admin/Create/BrandCreate";
import PPVCreate from "./Pages/Admin/Create/PPVCreate";

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

//  Game Pages
import Games from "./Pages/Games/Games";
import StoneRockCactus from "./Pages/Games/Stone_Rock_Cactus/StoneRockCactus";
import WrestlEconomy from "./Pages/Games/Wrestle_Economy/WrestlEconomy";
import KairiShipSails from "./Pages/Games/Kairi_Ship_Sails/KairiShipSails";
import Damien from "./Pages/Games/Damien/Damien";
import ChasingTheDragon from "./Pages/Games/Chasing_The_Dragon/ChasingTheDragon";
import RingBreaker from "./Pages/Games/Ring_Breaker/RingBreaker";

//Other Imports
import { Route, Routes } from "react-router-dom";
import Compare from "./Pages/Compare/Compare";
import Chart from "./Pages/Chart/Chart";
import Follow from "./Pages/GorillaPosition/Follow";
import TicTacToe from "./Pages/Games/Tic Tac Toe/TicTacToe";
import Profile from "./Pages/Select/Profile/Profile";

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
          {/* User Features Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/account" element={<Account />} />
          <Route path="/profile/:profileId" element={<Profile />} />

          {/* Admin Pages */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/create/wrestler" element={<WrestlerCreate />} />
          <Route path="/admin/create/company" element={<CompanyCreate />} />
          <Route path="/admin/create/title" element={<TitleCreate />} />
          <Route path="/admin/create/faction" element={<FactionCreate />} />
          <Route path="/admin/create/brand" element={<BrandCreate />} />
          <Route path="/admin/create/ppv" element={<PPVCreate />} />

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
          {FLAGS.canUseGP.live && (
            <>
              <Route path="/gp" element={<Feed />} />
              <Route path="/gp/messages" element={<Messages />} />
              <Route path="/gp/bookmarks" element={<Bookmarks />} />
              <Route path="/gp/searchresults" element={<SearchResults />} />
              <Route path="/gp/user" element={<User />} />
              <Route path="/gp/follow" element={<Follow />} />
            </>
          )}

          {/* User Function Pages */}
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/username" element={<ForgotUserName />} />
          <Route path="/password" element={<ForgotPassword />} />

          {/* Other Function Pages */}
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
                path="/games/stone_rock_cactus"
                element={<StoneRockCactus />}
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
