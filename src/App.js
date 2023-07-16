import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Control from "./components/Control/Control";
import CriticalPath from "./components/CriticalPath/CriticalPath";
import Table from "./components/Table/Table";
import { ActivitySquare } from "lucide-react";

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
    return (
        <Container id="main" as={Row} className="px-2" fluid>
            <Col className="pe-5" sm={10}>
                <div className="my-2 p-3" style={{ overflowX: "auto" }}>
                    <h4>
                        <ActivitySquare size="40" /> ORD Tableau
                    </h4>
                    <Control />
                </div>
                <div className="my-2 p-3" style={{ overflowX: "auto" }}>
                    {Boolean(tasksCount) && (
                        <>
                            <h5>Données</h5>
                            <Table type="input" />
                        </>
                    )}
                </div>
                <div className="my-2 p-3" style={{ overflowX: "auto" }}>
                    {computed && (
                        <>
                            <h5>Marges</h5>
                            <Table type="margin" />
                        </>
                    )}
                </div>
                <div className="my-2 p-3" style={{ overflowX: "auto" }}>
                    {computed && (
                        <>
                            <h5>Dates au plus tôt</h5>
                            <Table type="early" />
                        </>
                    )}
                </div>
                <div className="my-2 p-3" style={{ overflowX: "auto" }}>
                    {computed && (
                        <>
                            <h5>Dates au plus tard</h5>
                            <Table type="late" />
                        </>
                    )}
                </div>
                <div id="criticalPathGraph" className="my-0 p-3">
                    {criticalPath && (
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
