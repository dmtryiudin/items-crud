import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  Layout,
  Auth,
  NotFound,
  Login,
  Registration,
  Logout,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Auth />}>
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
            <Route path="logout" element={<Logout />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
