import React from "react";
import { useSelector } from "react-redux";
import TaskRow from "./TaskRow";
import ResultRow from "./ResultRow";
import InputRow from "./InputRow";

import "./table.css";

export default function Table(props) {
    const computed = useSelector((state) => state.computed);

    return (
        <>
            <table id="root-table">
                <tbody>
                    <TaskRow taskType="base" tableType={props.type} />
                    {props.type === "input" && <InputRow />}
                    {props.type === "input" && computed && (
                        <TaskRow taskType="next" tableType="input" />
                    )}
                    {props.type === "early" && <ResultRow tableType="early" />}
                    {props.type === "late" && <ResultRow tableType="late" />}
                    {props.type === "margin" && (
                        <ResultRow tableType="margin" />
                    )}
                </tbody>
            </table>
        </>
    );
}
