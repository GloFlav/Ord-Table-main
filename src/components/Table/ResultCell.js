import React from "react";
import { useSelector } from "react-redux";

const renderCell = (task, tableType, finalDate) => {
    if (tableType === "early") {
        if (task.previous_tasks)
            return task.previous_tasks.map((previous_task) => (
                <tr key={previous_task.id}>
                    <td>{previous_task.early_date}</td>
                    <td>
                        <span>{previous_task.id}&nbsp;&nbsp;</span>
                        <span style={{ float: "right", color: "blue" }}>
                            {previous_task.duration}
                        </span>
                    </td>
                </tr>
            ));
        else
            return (
                <tr>
                    <td>0</td>
                    <td>
                        <span>Déb&nbsp;&nbsp;</span>
                        <span style={{ float: "right", color: "blue" }}>0</span>
                    </td>
                </tr>
            );
    } else if (tableType === "late") {
        if (task.next_tasks)
            return task.next_tasks.map((next_task) => (
                <tr key={next_task.id}>
                    <td>{next_task.late_date}</td>
                    <td>
                        <span>{next_task.id}&nbsp;&nbsp;</span>
                        <span style={{ float: "right", color: "blue" }}>{task.duration}</span>
                    </td>
                </tr>
            ));
        else
            return (
                <tr>
                    <td>{finalDate}</td>
                    <td>
                        <span>Fin&nbsp;&nbsp;</span>
                        <span style={{ float: "right", color: "blue" }}>{task.duration}</span>
                    </td>
                </tr>
            );
    }
};

const renderFinalTaskCell = (final_tasks) => {
    return final_tasks.map((final_task) => (
        <tr key={final_task.id}>
            <td>{final_task.early_date}</td>
            <td>
                <span>{final_task.id}&nbsp;&nbsp;</span>
                <span style={{ float: "right", color: "blue" }}>{final_task.duration}</span>
            </td>
        </tr>
    ));
};

export default function ResultCell(props) {
    const linkedTask = useSelector((state) => state.linkedTask);
    const finalDate = useSelector((state) => state.finalDate);
    return (
        <>
            <table
                className="result-cell"
                style={{ width: "100%", height: "100%", color: "red" }}
            >
                <tbody>
                    {props.task &&
                        renderCell(props.task, props.tableType, finalDate)}
                    {!props.task &&
                        linkedTask &&
                        renderFinalTaskCell(linkedTask.end_tasks)}
                </tbody>
            </table>
        </>
    );
}
