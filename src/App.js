import React, { useEffect, useState } from "react";
import { Col, Container, Row,Button ,Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Control from "./components/Control/Control";
import CriticalPath from "./components/CriticalPath/CriticalPath";
import Table from "./components/Table/Table";
import { ActivitySquare } from "lucide-react";
import { Task } from "./utils/model/data.model";

const createTask = (e, listTasks, dispatch) => {
    e.target.value =
        e.target.value > 26 ? 26 : e.target.value < 1 ? 1 : e.target.value;
    let list_tasks = [];
    if (listTasks.length > e.target.value) {
        list_tasks = listTasks.slice(0, e.target.value);
        for (let i = 0; i < e.target.value; i++)
            if (list_tasks[i].previous_tasks) {
                list_tasks[i].previous_tasks = list_tasks[
                    i
                ].previous_tasks.filter(
                    (p) =>
                        list_tasks.includes(p) ||
                        list_tasks.map((t) => t.id).includes(p)
                );
                if (!list_tasks[i].previous_tasks.length)
                    list_tasks[i].previous_tasks = null;
            }
    } else {
        list_tasks = listTasks.slice();
        for (let i = listTasks.length; i < e.target.value; i++)
            list_tasks.push(new Task(String.fromCharCode(i + 65)));
    }

    dispatch({
        type: "INITIATE",
        count: e.target.value,
        list: list_tasks,
        computabled: list_tasks.every((task) => task.duration),
    });
};

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

    return (
        <Container id="main" as={Row} className="px-2" fluid >
            <Col className="pe-5" sm={10} style={{ width: "100%" }}>
                <div className="my-2 p-3" style={{ overflowX: "auto" }}>
                    <h4 style={{ textAlign: "center" , marginLeft: "10%"}}>
                        <ActivitySquare size="40" /> ORD Tableau
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
