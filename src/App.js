import React, { useEffect, useState } from "react";
import { Col, Container, Row,Button ,Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Control from "./components/Control/Control";
import CriticalPath from "./components/CriticalPath/CriticalPath";
import Table from "./components/Table/Table";
import { LayoutList } from "lucide-react";


export default function App() {
    const tasksCount = useSelector((state) => state.tasksCount);
    const computed = useSelector((state) => state.computed);
    const criticalPath = useSelector((state) => state.criticalPath);
    const [mainHeight, setMainHeight] = useState(window.innerHeight);
    useEffect(() => {
        setMainHeight(
            document.getElementById("main").offsetHeight > window.innerHeight
                ? "inherit"
                : window.innerHeight
        );
    });
    const listTasks = useSelector((state) => state.listTasks);
    const computable = useSelector((state) => state.computable);
    const dispatch = useDispatch();
    

    const [showMarge, setShowMarge] = useState(false);
    const [showEarly, setShowEarly] = useState(false);
    const [showLate, setShowLate] = useState(false);
    const [showCriticalPath, setShowCriticalPath] = useState(false);

    useEffect(() => {
        const timeout1 = setTimeout(() => setShowMarge(true), 2000);
        const timeout2 = setTimeout(() => setShowEarly(true), 4000);
        const timeout3 = setTimeout(() => setShowLate(true), 6000);
        const timeout4 = setTimeout(() => setShowCriticalPath(true), 8000);

        return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
        clearTimeout(timeout4);
        };
    }, []);

    return (
        <Container id="main" as={Row} className="px-2" fluid >
            <Col className="pe-5" sm={10} style={{ width: "100%" }}>
                <div className="my-2 p-3" style={{ overflowX: "auto" }}>
                    <h4 style={{ textAlign: "center" , marginLeft: "10%"}}>
                        <LayoutList size="40" /> Ordonnancement de tache Tableau
                    </h4>
                    <Control />
                </div>
                <div className="my-2 p-3" style={{ overflowX: "auto" }}>
                    {Boolean(tasksCount) && (
                        <>
                            <h5>Données</h5>
                            <div className="d-flex align-items-center" style={{gap: "15px"}}> 
                                <Table type="input" /> 
                                <Form.Group as={Row} controlId="formTasksCount">
                                    <Button
                                        className="mt-2 ms-2 col-md-1"
                                        variant="primary"
                                        disabled={!computable}
                                        style={{ width: "100px"}}
                                        onClick={() => dispatch({ type: "COMPUTE" })}
                                    >
                                        OK 
                                    </Button>
  
                                </Form.Group>
                            </div>
                        </>
                    )}
                </div>

                <div className="my-2 p-3" style={{ overflowX: "auto" }}>
                    {showMarge && computed && (
                        <>
                            <h5>Marges</h5>
                            <Table type="margin" />
                        </>
                    )}
                </div>
                <div className="my-2 p-3" style={{ overflowX: "auto" }}>
                    {showEarly &&  computed && (
                        <>
                            <h5>Dates au plus tôt</h5>
                            <Table type="early" />
                        </>
                    )}
                </div>
                <div className="my-2 p-3" style={{ overflowX: "auto" }}>
                    {showLate && computed && (
                        <>
                            <h5>Dates au plus tard</h5>
                            <Table type="late" />
                        </>
                    )}
                </div>
                <div id="criticalPathGraph" className="my-0 p-3">
                    {showCriticalPath &&  criticalPath && (
                        <>
                            <h5>Chémin critique</h5>
                            <CriticalPath />
                        </>
                    )}
                </div>
            </Col>
        </Container>
    );
}
