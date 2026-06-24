import BoardManagement from "../components/BoardManagement";
import ClassManagement from "../components/ClassManagement";
import SubjectManagement from "../components/SubjectManagement";
import PaperManagement from "../components/PaperManagement";
import {logout} from "../utils/auth";

import { useNavigate  } from "react-router-dom";

import { useState } from "react";

import "../css/AdminPage.css";

function AdminPage() {

    const [activeTab, setActiveTab] = useState("boards");

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/");

    };


return (

    <div className="admin-page">

        <h1 className="admin-title">

            Profuz Admin Dashboard

        </h1>
        <div className="top-right-buttons">

            <button

                className="home-btn"

                onClick={() =>

                    navigate("/")

                }

            >

                Home

            </button>

            <button

                className="logout-btn"

                onClick={handleLogout}

            >

                Logout

            </button>

        </div>
        <div className="tab-container">

            <button
                className={
                    activeTab === "boards"
                        ? "active-tab"
                        : ""
                }
                onClick={() =>
                    setActiveTab("boards")
                }
            >
                Boards
            </button>

            <button
                className={
                    activeTab === "classes"
                        ? "active-tab"
                        : ""
                }
                onClick={() =>
                    setActiveTab("classes")
                }
            >
                Classes
            </button>

            <button
                className={
                    activeTab === "subjects"
                        ? "active-tab"
                        : ""
                }
                onClick={() =>
                    setActiveTab("subjects")
                }
            >
                Subjects
            </button>

            <button
                className={
                    activeTab === "papers"
                        ? "active-tab"
                        : ""
                }
                onClick={() =>
                    setActiveTab("papers")
                }
            >
                Papers
            </button>
            
        </div>

        {
            activeTab === "boards" &&
            <BoardManagement />
        }

        {
            activeTab === "classes" &&
            <ClassManagement />
        }

        {
            activeTab === "subjects" &&
            <SubjectManagement />
        }

        {
            activeTab === "papers" &&
            <PaperManagement />
        }

    </div>

);


}

export default AdminPage;
