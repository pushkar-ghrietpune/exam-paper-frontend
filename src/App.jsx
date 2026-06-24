import {

BrowserRouter,

Routes,


Route

} from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";

import './css/App.css';

function App() {



return (

    <BrowserRouter>

        <Routes>

            <Route
                path="/"
                element={<HomePage />}
            />
            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/admin"
                element={

                    <ProtectedRoute>

                        <AdminPage/>

                    </ProtectedRoute>

                }
            />

        </Routes>

    </BrowserRouter>

    

);


}

export default App;
