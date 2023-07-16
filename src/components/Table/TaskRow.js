import React from "react";
import { useSelector } from "react-redux";

const renderCell = (tasks, tableType, taskType) => {
    if (taskType === "base")
        return tasks.map((task) => (
            <td key={`${task.id}-base`}>
                {tableType === "early" && (
                    <span style={{ float: "left" }}>
                        {task.early_date}&nbsp;&nbsp;
                    </span>
                )}
                {tableType === "late" && (
                    <span style={{ float: "left" }}>
                        {task.late_date}&nbsp;&nbsp;
                    </span>
                )}
                {task.id}
            </td>
        ));
    else if (taskType === "next")
        return tasks.map((task) => (
            <td key={`${task.id}-next`}>
                {task.next_tasks ? task.next_tasks.toString() : "-"}
            </td>
        ));
};

export default function TaskRow(props) {
    const listTasks = useSelector((state) => state.listTasks);
    const finalDate = useSelector((state) => state.finalDate);
    return (
        <>
            <tr>
                {props.tableType === "input" && (
                    <td>{props.taskType === "base" ? "Tâches" : "T.succ"}</td>
                )}
                {props.tableType === "margin" && <td>Tâches</td>}
                {renderCell(listTasks, props.tableType, props.taskType)}
                {props.tableType === "early" && (
                    <td>
                        <span style={{ float: "left" }}>
                            {finalDate}&nbsp;&nbsp;
                        </span>
                        Fin
                    </td>
                )}
            </tr>
        </>
    );
}
