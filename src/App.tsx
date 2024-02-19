import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserLayout } from "Layout";
import { AuthProvider } from "layout/header/AuthConText";
import '@fontsource-variable/noto-sans-kr';

import MainPage from "page/MainPage";
import LoginPage from "page/user/LoginPage";
import WithDrawerPage from "page/user/withdrawal/WithdrawalPage";
import Exit from "page/user/withdrawal/WithdrawalComplete";
import MapSelectPage from "map/MapSelectPage";
import MusicMapCreatePage from "map/musicMap/create/MusicMapCreatePage";
import RoomListPageMenu from "game/multi/RoomListPageMenu";

const theme = extendTheme({
  components: {
    Text: {
      baseStyle: {
        textAlign: "center"
      },
    },
  },
  fonts: {
    body: `'Noto Sans KR Variable', sans-serif`,
  },
});

export const App = () => (
  <AuthProvider>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<MainPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="withdrawer" element={<WithDrawerPage />} />
            <Route path="exit" element={<Exit />} />
            <Route path="map/my-map" element={<MapSelectPage/>} />
            <Route path="map/create/music" element={<MusicMapCreatePage />} />
            <Route path="roomlist" element={<RoomListPageMenu />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </AuthProvider>
);
