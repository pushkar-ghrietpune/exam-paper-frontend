import { useEffect, useState } from "react";

import {


getSubjects,
createSubject,
updateSubject,
deleteSubject


} from "../services/adminSubjectService";

import {


getClasses


} from "../services/adminClassService";

import "../css/SubjectManagement.css";

function SubjectManagement() {


const [subjects, setSubjects] = useState([]);

const [classes, setClasses] = useState([]);

const [selectedClass, setSelectedClass] = useState("");

const [subjectName, setSubjectName] = useState("");

const [editingId, setEditingId] = useState(null);

const [loading, setLoading] = useState(false);

const [error, setError] = useState("");

useEffect(() => {

    loadSubjects();

    loadClasses();

}, []);

const loadSubjects = () => {

    setLoading(true);

    getSubjects()

        .then(response => {

            setSubjects(response.data);

            setError("");

        })

        .catch(error => {

            console.error(error);

            setError(
                "Failed to load subjects."
            );

        })

        .finally(() => {

            setLoading(false);

        });

};

const loadClasses = () => {

    getClasses()

        .then(response => {

            setClasses(response.data);

        })

        .catch(error => {

            console.error(error);

        });

};

const handleSave = () => {

    const subjectData = {

        name: subjectName,

        classId: Number(
            selectedClass
        )

    };

    if (editingId) {

        updateSubject(
            editingId,
            subjectData
        )

            .then(() => {

                resetForm();

                loadSubjects();

            })

            .catch(error => {

                console.error(error);

            });

    }
    else {

        createSubject(
            subjectData
        )

            .then(() => {

                resetForm();

                loadSubjects();

            })

            .catch(error => {

                console.error(error);

            });

    }

};

const handleEdit = (
    subject
) => {

    setEditingId(
        subject.id
    );

    setSubjectName(
        subject.name
    );

    setSelectedClass(
        subject.classEntity.id
    );

};

const handleDelete = (
    id
) => {

    if (
        !window.confirm(
            "Delete this subject?"
        )
    ) {

        return;

    }

    deleteSubject(id)

        .then(() => {

            loadSubjects();

        })

        .catch(error => {

            console.error(error);

        });

};

const resetForm = () => {

    setEditingId(null);

    setSubjectName("");

    setSelectedClass("");

};

return (

    <div className="admin-card">

        <h2>

            Subject Management

        </h2>

        <div className="form-row">

            <select
                value={selectedClass}
                onChange={(e) =>
                    setSelectedClass(
                        e.target.value
                    )
                }>

                <option value="">

                    Select Class

                </option>

                {

                    classes.map(
                        classItem => (

                            <option
                                key={classItem.id}
                                value={classItem.id}
                            >

                                {
                                    classItem.board?.name
                                }

                                {" - "}

                                {
                                    classItem.name
                                }
                                
                            </option>

                        )
                    )

                }

            </select>

            <input
                type="text"
                placeholder="Subject Name"
                value={subjectName}
                onChange={(e) =>
                    setSubjectName(
                        e.target.value
                    )
                }
            />

            <button
                className="add-btn"
                onClick={handleSave}>

                {

                    editingId

                        ? "Update Subject"

                        : "Add Subject"

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

                    Subject

                </th>

                <th>

                    Class

                </th>

                <th>

                    Actions

                </th>

            </tr>

            </thead>

            <tbody>

            {

                subjects.map(
                    subject => (

                        <tr
                            key={
                                subject.id
                            }>

                            <td>

                                {
                                    subject.name
                                }

                            </td>

                            <td>

                                {
                                    subject.classEntity.name
                                }

                            </td>

                            <td>

                                <button
                                    className="edit-btn"
                                    onClick={() =>
                                        handleEdit(
                                            subject
                                        )
                                    }>

                                    Edit

                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        handleDelete(
                                            subject.id
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

export default SubjectManagement;
