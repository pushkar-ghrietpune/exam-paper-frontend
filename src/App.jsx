import { useEffect, useState } from 'react';
import { getClasses } from './services/classService';
import { getSubjects } from './services/subjectService';
import { getPapers } from './services/paperService';

import PaperTable from './components/PaperTable';
import Footer from './components/Footer';
function App() {


const [classes, setClasses] = useState([]);
const [subjects, setSubjects] = useState([]);
const [papers, setPapers] = useState([]);

const [selectedClass, setSelectedClass] = useState('');
const [selectedSubject, setSelectedSubject] = useState('');

//error handeling states
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

useEffect(() => {

    getClasses()
        .then(response => {

            setClasses(response.data);

        })
        .catch(error => {

            console.error(error);

        });

}, []);

const handleClassChange = (event) => {

    const classId = event.target.value;

    setSelectedClass(classId);

    getSubjects(classId)
        .then(response => {

            setSubjects(response.data);

            setPapers([]);

            setSelectedSubject('');

        })
        .catch(error => {

            console.error(error);

        });

};

const handleSubjectChange = (event) => {

    const subjectId = event.target.value;

    setSelectedSubject(subjectId);

    setLoading(true);
    setError("");

    getPapers(subjectId)

        .then(response => {

            setPapers(response.data);

        })

        .catch(error => {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Unable to load papers. Please try again later."
            );

            setPapers([]);

        })

        .finally(() => {

            setLoading(false);

        });

};

return (

    <div className="container py-5">

        <h1 className="display-4 fw-bold text-center">

            📚 Exam Papers

        </h1>

        <p className="text-center text-secondary mb-5">

            Find previous year question papers instantly

        </p>

        <div className="card border-0 shadow-lg rounded-4 p-4">

            <div className="row">

                <div className="col-md-6">

                    <label className="form-label fw-bold">

                        Select Class

                    </label>

                    <select
                        className="form-select"
                        value={selectedClass}
                        onChange={handleClassChange}
                    >

                        <option>Select Class</option>

                        {
                            classes.map(classObj => (

                                <option
                                    key={classObj.id}
                                    value={classObj.id}
                                >

                                    {classObj.name}

                                </option>

                            ))
                        }

                    </select>

                </div>

                <div className="col-md-6">

                    <label className="form-label fw-bold">

                        Select Subject

                    </label>

                    <select
                        className="form-select"
                        value={selectedSubject}
                        onChange={handleSubjectChange}
                    >

                        <option>Select Subject</option>

                        {
                            subjects.map(subject => (

                                <option
                                    key={subject.id}
                                    value={subject.id}
                                >

                                    {subject.name}

                                </option>

                            ))
                        }

                    </select>

                </div>

            </div>

        </div>

        {loading &&
                <div className="status-card loading">
                    ⏳ Loading papers...
                </div>
        }

        {error &&
            <div className="status-card error">
                ❌ {error}
            </div>
        }

        {!loading && !error && papers.length === 0 && selectedSubject && (
            <div className="status-card empty">
                📄 No papers available for this subject.
            </div>
        )}
        
        {!loading &&
            !error &&
            papers.length > 0 &&
        (
            <PaperTable papers={papers}/>
        )}

        

        <Footer />

    </div>

);


}

export default App;
