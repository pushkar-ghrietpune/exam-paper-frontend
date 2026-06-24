import { useEffect, useState } from "react";

import {
getClasses,
createClass,
updateClass,
deleteClass
} from "../services/adminClassService";

import {
getBoards
} from "../services/adminBoardService";

import "../css/ClassManagement.css";

function ClassManagement() {


const [classes, setClasses] = useState([]);
const [boards, setBoards] = useState([]);

const [selectedBoard, setSelectedBoard] = useState("");

const [className, setClassName] = useState("");

const [displayOrder, setDisplayOrder] = useState("");

const [editingId, setEditingId] = useState(null);

const [loading, setLoading] = useState(false);

const [error, setError] = useState("");

useEffect(() => {

    loadClasses();

    loadBoards();

}, []);

const loadClasses = () => {

    setLoading(true);

    getClasses()

        .then(response => {

            setClasses(response.data);

            setError("");

        })

        .catch(error => {

            console.error(error);

            setError(
                "Failed to load classes."
            );

        })

        .finally(() => {

            setLoading(false);

        });

};

const loadBoards = () => {

    getBoards()

        .then(response => {

            setBoards(response.data);

        })

        .catch(error => {

            console.error(error);

        });

};

const handleSave = () => {

    const classData = {

        name: className,

        displayOrder: Number(displayOrder),

        boardId: Number(selectedBoard)

    };

    if (editingId) {

        updateClass(
            editingId,
            classData
        )

            .then(() => {

                resetForm();

                loadClasses();

            })

            .catch(error => {

                console.error(error);

            });

    }
    else {

        createClass(classData)

            .then(() => {

                resetForm();

                loadClasses();

            })

            .catch(error => {

                console.error(error);

            });

    }

};

const handleEdit = (classItem) => {

    setEditingId(classItem.id);

    setClassName(classItem.name);

    setDisplayOrder(
        classItem.displayOrder
    );

    setSelectedBoard(
        classItem.boardId
    );

};

const handleDelete = (id) => {

    if (
        !window.confirm(
            "Delete this class?"
        )
    ) {

        return;

    }

    deleteClass(id)

        .then(() => {

            loadClasses();

        })

        .catch(error => {

            console.error(error);

        });

};

const resetForm = () => {

    setEditingId(null);

    setClassName("");

    setDisplayOrder("");

    setSelectedBoard("");

};

return (

    <div className="admin-card">

        <h2>

            Class Management

        </h2>

        <div className="form-row">

            <select
                value={selectedBoard}
                onChange={(e) =>
                    setSelectedBoard(
                        e.target.value
                    )
                }>

                <option value="">

                    Select Board

                </option>

                {

                    boards.map(board => (

                        <option
                            key={board.id}
                            value={board.id}>

                            {board.name}

                        </option>

                    ))

                }

            </select>

            <input
                type="text"
                placeholder="Class Name"
                value={className}
                onChange={(e) =>
                    setClassName(
                        e.target.value
                    )
                }
            />

            <input
                type="number"
                placeholder="Display Order"
                value={displayOrder}
                onChange={(e) =>
                    setDisplayOrder(
                        e.target.value
                    )
                }
            />

            <button
                className="add-btn"
                onClick={handleSave}>

                {

                    editingId

                        ? "Update Class"

                        : "Add Class"

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

                    Class

                </th>

                <th>

                    Board

                </th>

                <th>

                    Order

                </th>

                <th>

                    Actions

                </th>

            </tr>

            </thead>

            <tbody>

            {

                classes.map(classItem => (

                    <tr key={classItem.id}>

                        <td>

                            {classItem.name}

                        </td>

                        <td>

                            {

                                boards.find(

                                    board =>

                                        board.id === classItem.boardId

                                )?.name

                                ||

                                "N/A"

                            }

                        </td>

                        <td>

                            {classItem.displayOrder}

                        </td>

                        <td>

                            <button
                                className="edit-btn"
                                onClick={() =>
                                    handleEdit(
                                        classItem
                                    )
                                }>

                                Edit

                            </button>

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    handleDelete(
                                        classItem.id
                                    )
                                }>

                                Delete

                            </button>

                        </td>

                    </tr>

                ))

            }

            </tbody>

        </table>

    </div>

);


}

export default ClassManagement;
