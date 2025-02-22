import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Addbook from "./pages/Addbook";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import RedirectAuthenticatedUsers from "./providers/RedirectAuthenticatedUsers";
import RedirectUnAuthenticatedUsers from "./providers/RedirectUnAuthenticatedUsers";
import Footer from "./components/Footer";
import SearchPage from "./pages/SearchPage";
import BookPage from "./pages/BookPage";
import UpdatePage from "./pages/UpdatePage";

function App() {
  const { getUser, fetchingUser } = useAuthStore();

  useEffect(() => {
    getUser();
  }, [getUser]);


  if (fetchingUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route
          path={"/add-book"}
          element={
            <RedirectUnAuthenticatedUsers>
              <Addbook />
            </RedirectUnAuthenticatedUsers>
          }
        />
        <Route
          path={"/log-in"}
          element={
            <RedirectAuthenticatedUsers>
              <Login />
           </RedirectAuthenticatedUsers>
          }
        />
        <Route
          path={"/sign-up"}
          element={
            <RedirectAuthenticatedUsers>
              <Signup />
           </RedirectAuthenticatedUsers>
          }
        />
        <Route path={"/search"} element={<SearchPage />} />
        <Route path={"/book/:id"} element={<BookPage />} />
        <Route path={"/book/:id/update"} element={<UpdatePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
