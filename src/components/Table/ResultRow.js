import React from "react";
import { useSelector } from "react-redux";
import ResultCell from "./ResultCell";

const renderCell = (tasks, tableType) => {
    return tasks.map((task) => (
        <td key={task.id}>
            <ResultCell tableType={tableType} task={task} />
        </td>
    ));
};

export default function ResultRow(props) {
    const listTasks = useSelector((state) => state.listTasks);
    return (
        <>
            {props.tableType !== "margin" && (
                <tr id={props.tableType} className="result-row">
                    {renderCell(listTasks, props.tableType)}
                    {props.tableType === "early" && (
                        <td>
                            <ResultCell />
                        </td>
                    )}
                </tr>
            )}
            {props.tableType === "margin" && (
                <tr id={props.tableType} className="result-row">
                    <td className="p-2">Marges</td>
                    {listTasks.map((task) => (
                        <td key={task.id} className="p-3">{task.margin}</td>
                    ))}
                </tr>
            )}
        </>
    );
}
