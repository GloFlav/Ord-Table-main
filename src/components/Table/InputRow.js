import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    compute_final_achievment_date,
    compute_late_date,
    find_critical_path,
} from "../../utils/algorithm/table";

function InputRow() {
    const computing = useSelector((state) => state.computing);
    const listTasks = useSelector((state) => state.listTasks);
    const linkedTask = useSelector((state) => state.linkedTask);
    const [previousTasks, setPreviousTasks] = useState(listTasks.map(() => ""));
    const [inputVal, setInnputVal] = useState("");
    const previousInputVal = useRef("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (computing) {
            linkedTask.start_tasks = [];
            linkedTask.end_tasks = [];
            listTasks.forEach((task) => {
                task.early_date = null;
                task.late_date = null;
                task.margin = null;
                task.next_tasks = [];
            });
            listTasks.forEach((task) => {
                if (task.previous_tasks) {
                    if (typeof task.previous_tasks[0] === "string")
                        task.previous_tasks = task.previous_tasks.map((id) =>
                            listTasks.find((t) => t.id === id)
                        );
                    task.previous_tasks.forEach((p) => p.next_tasks.push(task));
                } else linkedTask.start_tasks.push(task);
            });
            const final_date = compute_final_achievment_date(linkedTask);
            compute_late_date(final_date, linkedTask);
            dispatch({
                type: "COMPUTED",
                final: final_date,
                path: find_critical_path(final_date, linkedTask),
            });
        }
    }, [computing]);

    useEffect(() => {
        previousInputVal.current = inputVal;
    }, [inputVal]);

    useEffect(() => {
        setPreviousTasks(
            listTasks.map((task) =>
                task.previous_tasks ? task.previous_tasks.toString() : ""
            )
        );
    }, [listTasks]);

    const inPreviousTasks = (id, previous_id) => {
        if (id === previous_id) return true;
        else if (
            listTasks.find((t) => t.id === previous_id) &&
            listTasks.find((t) => t.id === previous_id).previous_tasks
        )
            return listTasks
                .find((t) => t.id === previous_id)
                .previous_tasks.some((p) => inPreviousTasks(id, p));
        else return false;
    };

    const cleanTasksData = (id, input_value) => {
        input_value = [
            ...new Set(
                input_value
                    .split(",")
                    .filter(
                        (previous_id) =>
                            listTasks.find((t) => t.id === previous_id) &&
                            previous_id !== id &&
                            !inPreviousTasks(id, previous_id)
                    )
            ),
        ];
        listTasks.find((t) => t.id === id).previous_tasks =
            input_value.toString() ? input_value : null;
        return input_value;
    };

    return (
        <>
            <tr id="duration">
                <td className="p-2">Durée</td>
                {listTasks.map((task) => (
                    <td key={task.id}>
                        <input
                            type="text"
                            className="row-input duration-field"
                            style={{
                                maxWidth: "50px",
                                textAlign: "center",
                                border: 0,
                            }}
                            placeholder="..."
                            maxLength={4}
                            onChange={(e) => {
                                e.preventDefault();
                                if (!/^([1-9]?|[1-9]\d*)$/.test(e.target.value))
                                    e.target.value = previousInputVal.current;
                                else setInnputVal(e.target.value);
                                dispatch({
                                    type: "COMPUTABLE",
                                    computabled: [
                                        ...document.querySelectorAll(
                                            ".duration-field"
                                        ),
                                    ].every((element) => element.value),
                                });
                            }}
                            onBlur={(e) => {
                                e.preventDefault();
                                listTasks.find(
                                    (t) => t.id === task.id
                                ).duration = parseInt(e.target.value);
                                setInnputVal("");
                            }}
                        />
                    </td>
                ))}
            </tr>
            <tr id="previous-task">
                <td className="p-2">T.Ant</td>
                {listTasks.map((task, index) => (
                    <td key={task.id}>
                        <input
                            type="text"
                            className="row-input"
                            style={{
                                maxWidth: "50px",
                                textAlign: "center",
                                border: 0,
                            }}
                            placeholder="..."
                            value={previousTasks[index]}
                            onChange={(e) => {
                                e.preventDefault();
                                if (
                                    !/^([a-zA-Z]?|([a-zA-Z],)+[a-zA-Z]?)$/i.test(
                                        e.target.value
                                    )
                                )
                                    setPreviousTasks(
                                        previousTasks.map((v, k) =>
                                            k === index
                                                ? previousInputVal.current
                                                : v
                                        )
                                    );
                                else {
                                    e.target.value =
                                        e.target.value.toUpperCase();
                                    e.target.value = cleanTasksData(
                                        task.id,
                                        e.target.value
                                    );
                                    if (e.nativeEvent.data === ",") {
                                        e.target.value += e.target.value
                                            ? ","
                                            : "";
                                    }
                                    setInnputVal(e.target.value);
                                    setPreviousTasks(
                                        previousTasks.map((v, k) =>
                                            k === index ? e.target.value : v
                                        )
                                    );
                                }
                            }}
                            onBlur={(e) => {
                                e.preventDefault();
                                e.target.value = cleanTasksData(
                                    task.id,
                                    e.target.value
                                );
                                setInnputVal("");
                            }}
                        />
                    </td>
                ))}
            </tr>
        </>
    );
}

export default InputRow;
