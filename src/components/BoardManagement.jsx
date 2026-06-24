import { useEffect, useState } from "react";
import {
getBoards,
createBoard,
updateBoard,
deleteBoard
} from "../services/adminBoardService";

import "../css/BoardManagement.css";

function BoardManagement() {

const [boards, setBoards] = useState([]);
const [boardName, setBoardName] = useState("");
const [editingId, setEditingId] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

useEffect(() => {
    loadBoards();
}, []);

const loadBoards = () => {

    setLoading(true);

    getBoards()
        .then(response => {

            setBoards(response.data);
            setError("");

        })
        .catch(error => {

            console.error(error);
            setError("Failed to load boards.");

        })
        .finally(() => {

            setLoading(false);

        });
};

const handleSave = () => {

    if (!boardName.trim()) {

        return;

    }

    if (editingId) {

        updateBoard(editingId, boardName)
            .then(() => {

                setBoardName("");
                setEditingId(null);
                loadBoards();

            })
            .catch(error => {

                console.error(error);

            });

    }
    else {

        createBoard(boardName)
            .then(() => {

                setBoardName("");
                loadBoards();

            })
            .catch(error => {

                console.error(error);

            });

    }
};

const handleEdit = (board) => {

    setBoardName(board.name);
    setEditingId(board.id);

};

const handleDelete = (id) => {

    if (!window.confirm("Delete this board?")) {

        return;

    }

    deleteBoard(id)
        .then(() => {

            loadBoards();

        })
        .catch(error => {

            console.error(error);

        });
};

return (

    <div className="admin-card">

        <h2>Board Management</h2>

        <div className="form-row">

            <input
                type="text"
                placeholder="Board Name"
                value={boardName}
                onChange={(e) =>
                    setBoardName(e.target.value)}
            />

            <button
                className="add-btn"
                onClick={handleSave}>

                {editingId ? "Update Board" : "Add Board"}

            </button>

        </div>

        {loading && <p>Loading...</p>}

        {error && (
            <p className="error-text">
                {error}
            </p>
        )}

        <table>

            <thead>

            <tr>

                <th>Board Name</th>
                <th>Actions</th>

            </tr>

            </thead>

            <tbody>

            {boards.map(board => (

                <tr key={board.id}>

                    <td>{board.name}</td>

                    <td>

                        <button
                            className="edit-btn"
                            onClick={() =>
                                handleEdit(board)}>

                            Edit

                        </button>

                        <button
                            className="delete-btn"
                            onClick={() =>
                                handleDelete(board.id)}>

                            Delete

                        </button>

                    </td>

                </tr>

            ))}

            </tbody>

        </table>

    </div>

);


}

export default BoardManagement;
