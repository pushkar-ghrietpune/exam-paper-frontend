import { FaEye, FaFilePdf } from "react-icons/fa";

function PaperTable({ papers }) {


const groupedPapers = Object.groupBy(

    papers,

    paper => paper.paperType

);

return (

    <div className="mt-5">

        {

            Object.entries(groupedPapers)

                .map(([paperType, paperList]) => (

                    <div
                        key={paperType}
                        className="mt-4"
                    >

                        <h3 className="section-header">

                            {paperType}

                            <span className="badge bg-light text-dark ms-2">

                                {paperList.length}

                            </span>

                        </h3>

                        {

                            paperList

                                .sort((a, b) => b.year - a.year)

                                .map(paper => (

                                    <div
                                        key={paper.id}
                                        className="card border-0 shadow rounded-4 mt-3 paper-card"
                                    >

                                        <div className="card-body">

                                            <h5>

                                                <FaFilePdf className="me-2 text-danger"/>

                                                {paper.paperTitle}

                                            </h5>

                                            <p className="text-muted">

                                                Semester {paper.semester}

                                                {" • "}

                                                Year {paper.year}

                                            </p>



                                            <div className="d-flex justify-content-end">
                                                <a  className="btn btn-outline-primary"
                                                        href={
                                                            import.meta.env.VITE_API_BASE_URL
                                                            +
                                                            paper.pdfUrl
                                                        }
                                                        target="_blank"
                                                    >
                                                        <FaEye className="me-2"/>

                                                    View PDF

                                                </a>                                               

                                            </div>

                                        </div>

                                    </div>

                                ))

                        }

                    </div>

                ))

        }

    </div>

);


}

export default PaperTable;
