import { useEffect, useState } from "react";
import API_BASE_URL from "../services/api";

import {
getPapers,
createPaper,
updatePaper,
deletePaper
} from "../services/adminPaperService";

import {
getSubjects
} from "../services/adminSubjectService";

import "../css/PaperManagement.css";

function PaperManagement() {


const [papers, setPapers] = useState([]);
const [subjects, setSubjects] = useState([]);

const [selectedSubject, setSelectedSubject] = useState("");

const [year, setYear] = useState("");

const [semester, setSemester] = useState("");

const [paperType, setPaperType] = useState("");

const [paperTitle, setPaperTitle] = useState("");

const [isActive, setIsActive] = useState(true);

const [selectedFile, setSelectedFile] = useState(null);

const [editingId, setEditingId] = useState(null);

const [loading, setLoading] = useState(false);

const [error, setError] = useState("");

useEffect(() => {

    loadPapers();

    loadSubjects();

}, []);

const loadPapers = () => {

    setLoading(true);

    getPapers()

        .then(response => {

            setPapers(response.data);

            setError("");

        })

        .catch(error => {

            console.error(error);

            setError(
                "Failed to load papers."
            );

        })

        .finally(() => {

            setLoading(false);

        });

};

const loadSubjects = () => {

    getSubjects()

        .then(response => {

            setSubjects(
                response.data
            );

        })

        .catch(error => {

            console.error(error);

        });

};

const handleSave = () => {

    const formData =
        new FormData();

    formData.append(
        "year",
        year
    );

    formData.append(
        "semester",
        semester
    );

    formData.append(
        "paperType",
        paperType
    );

    formData.append(
        "paperTitle",
        paperTitle
    );

    formData.append(
        "subjectId",
        selectedSubject
    );

    formData.append(
        "isActive",
        isActive
    );

    if (selectedFile) {

        formData.append(
            "file",
            selectedFile
        );

    }

    if (editingId) {

        updatePaper(
            editingId,
            formData
        )

            .then(() => {

                resetForm();

                loadPapers();

            })

            .catch(error => {

                console.error(error);

            });

    }
    else {

        createPaper(
            formData
        )

            .then(() => {

                resetForm();

                loadPapers();

            })

            .catch(error => {

                console.error(error);

            });

    }

};

const handleEdit = (
    paper
) => {

    setEditingId(
        paper.id
    );

    setYear(
        paper.year
    );

    setSemester(
        paper.semester
    );

    setPaperType(
        paper.paperType
    );

    setPaperTitle(
        paper.paperTitle
    );

    setIsActive(
        paper.isActive
    );

    setSelectedSubject(
        paper.subject?.id
    );

    setSelectedFile(
        null
    );

};

const handleDelete = (
            id
                    ) => {

                        const confirmed =
                window.confirm(
                    "Delete this paper?"
                );

            if (!confirmed) {

                return;

            }

    deletePaper(id)

        .then(() => {

            loadPapers();

        })

        .catch(error => {

            console.error(error);

        });

};

const resetForm = () => {

    setEditingId(null);

    setYear("");

    setSemester("");

    setPaperType("");

    setPaperTitle("");

    setSelectedSubject("");

    setSelectedFile(null);

    setIsActive(true);

};

return (

    <div className="admin-card">

        <h2>

            Paper Management

        </h2>

        <div className="form-row">

            <select
                value={selectedSubject}
                onChange={(e) =>
                    setSelectedSubject(
                        e.target.value
                    )
                }>

                <option value="">

                    Select Subject

                </option>

                {

                    subjects.map(
                        subject => (

                            <option
                                key={subject.id}
                                value={subject.id}
                            >

                                {
                                    subject.classEntity?.board?.name
                                }

                                {" - "}

                                {
                                    subject.classEntity?.name
                                }

                                {" - "}

                                {
                                    subject.name
                                }

                            </option>

                        )
                    )

                }

            </select>

            <input
                type="number"
                placeholder="Year"
                value={year}
                onChange={(e) =>
                    setYear(
                        e.target.value
                    )
                }
            />

            <input
                type="number"
                placeholder="Semester"
                value={semester}
                onChange={(e) =>
                    setSemester(
                        e.target.value
                    )
                }
            />

        </div>

        <div className="form-row">

            <input
                type="text"
                placeholder="Paper Type"
                value={paperType}
                onChange={(e) =>
                    setPaperType(
                        e.target.value
                    )
                }
            />

            <input
                type="text"
                placeholder="Paper Title"
                value={paperTitle}
                onChange={(e) =>
                    setPaperTitle(
                        e.target.value
                    )
                }
            />

        </div>

        <div className="form-row">

            <input
                type="file"
                onChange={(e) =>
                    setSelectedFile(
                        e.target.files[0]
                    )
                }
            />

            <label>

                Active

                <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) =>
                        setIsActive(
                            e.target.checked
                        )
                    }
                />

            </label>

            <button
                className="add-btn"
                onClick={handleSave}>

                {
                    editingId

                        ? "Update Paper"

                        : "Add Paper"

                }

            </button>

        </div>

        {

            loading

                &&

                <p>

                    Loading...

                </p>

        }

        {

            error

                &&

                <p className="error-text">

                    {error}

                </p>

        }

        <table>

            <thead>

            <tr>

                <th>

                    Title

                </th>

                <th>

                    Year

                </th>

                <th>

                    Semester

                </th>

                <th>

                    Type

                </th>

                <th>

                    Subject

                </th>

                <th>

                    PDF

                </th>

                <th>

                    Actions

                </th>

            </tr>

            </thead>

            <tbody>

            {

                papers.map(
                    paper => (

                        <tr
                            key={
                                paper.id
                            }>

                            <td>

                                {
                                    paper.paperTitle
                                }

                            </td>

                            <td>

                                {
                                    paper.year
                                }

                            </td>

                            <td>

                                {
                                    paper.semester
                                }

                            </td>

                            <td>

                                {
                                    paper.paperType
                                }

                            </td>

                            <td>

                                {

                                    paper.subject?.classEntity?.board?.name

                                }

                                {" - "}

                                {

                                    paper.subject?.classEntity?.name

                                }

                                {" - "}

                                {

                                    paper.subject?.name

                                }

                            </td>

                            <td>

                                {

                                    paper.pdfUrl

                                        ?

                                        <a
                                            href={`${API_BASE_URL}${paper.pdfUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View PDF
                                        </a>

                                        :

                                        "No PDF"

                                }

                            </td>

                            <td>

                                <button
                                    className="edit-btn"
                                    onClick={() =>
                                        handleEdit(
                                            paper
                                        )
                                    }>

                                    Edit

                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        handleDelete(
                                            paper.id
                                        )
                                    }>

                                    Delete

                                </button>

                            </td>

                        </tr>

                    )
                )

            }

            </tbody>

        </table>

    </div>

);


}

export default PaperManagement;
