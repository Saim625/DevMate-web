import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Privacy_Policy from "./privacy/Privacy_Policy";
import Refund_Policy from "./privacy/Refund_Policy";
import Service_Policy from "./privacy/Service_Policy";
import TermsAndConditions from "./privacy/TermsAndConditions";
import Contact_Us from "./privacy/Contact_Us";
import Subscriptions from "./components/Subscriptions";
import Chat from "./components/Chat";
import ThankYou from "./utils/ThankYou";
import Cancel from "./utils/Cancel";
import About_Us from "./privacy/About_Us";
import LandingIntro from "./components/LandingIntro";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/privacy-policy" element={<Privacy_Policy />} />
            <Route path="/refund-policy" element={<Refund_Policy />} />
            <Route path="/service-policy" element={<Service_Policy />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/contact-us" element={<Contact_Us />} />
            <Route path="/about-us" element={<About_Us />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/chat/:targetedUserId" element={<Chat />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/landing-intro" element={<LandingIntro />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
