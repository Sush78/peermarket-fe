import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlaceBet from "./components/PlaceBet";
import LandingPage from "./components/LandingPage";
import MyBets from "./components/MyBets";
import CreatePool from "./components/CreatePool";
import Notification from "./components/Notification";
import { NotificationProvider } from "./context/NotificationContext";
import PrivateRoutes from "./utils/PrivateRoutes";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-b from-gray-700 via-gray-900 to-slate-900">
      <Router>
        <NotificationProvider notificationDetails={[]}>
          <Header />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/createPool" element={<CreatePool />} />
              <Route path="/myBets" element={<MyBets />} />
            </Route>
            <Route path="/" element={<LandingPage />} />
            <Route path="/placeBet" element={<PlaceBet />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </NotificationProvider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
