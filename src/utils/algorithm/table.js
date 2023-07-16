import { CriticalPath } from "../model/data.model";
import {
    maximum_achievment_date,
    responsible_task,
    minimum_start_date,
    check_every_not_null_early,
    check_every_not_null_late,
} from "./utils";

export const compute_final_achievment_date = (linkedTask) => {
    if (linkedTask.start_tasks.some((t) => t.early_date !== null)) return;
    linkedTask.start_tasks.forEach((start_task) => {
        start_task.early_date = 0;
        if (start_task.next_tasks.length > 0)
            start_task.next_tasks.forEach((next_task) =>
                compute_early_date_until_null(next_task, linkedTask)
            );
        else linkedTask.add_end_task(start_task);
    });
    return maximum_achievment_date(linkedTask.end_tasks);
};

const compute_early_date_until_null = (current_task, linkedTask) => {
    if (check_every_not_null_early(current_task.previous_tasks)) {
        current_task.early_date = maximum_achievment_date(
            current_task.previous_tasks
        );
        if (!current_task.next_tasks) return;
        else if (current_task.next_tasks.length === 0) {
            linkedTask.add_end_task(current_task);
            return;
        }
        current_task.next_tasks.forEach((task) =>
            compute_early_date_until_null(task, linkedTask)
        );
    }
};

export const find_critical_path = (final_achievment_date, linkedTask) => {
    const critical_path = new CriticalPath();
    let current_critical_path_task = responsible_task(
        linkedTask.end_tasks,
        final_achievment_date
    );
    critical_path.add_new_link(current_critical_path_task);
    while (current_critical_path_task.previous_tasks) {
        current_critical_path_task = responsible_task(
            current_critical_path_task.previous_tasks,
            current_critical_path_task.early_date
        );
        critical_path.add_new_link(current_critical_path_task);
    }
    return critical_path.add_new_link({ id: "Déb" });
};

export const compute_late_date = (final_achievment_date, linkedTask) => {
    linkedTask.end_tasks.forEach((end_task) => {
        end_task.late_date = final_achievment_date - end_task.duration;
        end_task.margin = end_task.late_date - end_task.early_date;
        if (end_task.previous_tasks)
            end_task.previous_tasks.forEach((previous_task) =>
                compute_late_date_until_null(previous_task)
            );
    });
};

const compute_late_date_until_null = (current_task) => {
    if (check_every_not_null_late(current_task.next_tasks)) {
        current_task.late_date =
            minimum_start_date(current_task.next_tasks) - current_task.duration;
        current_task.margin = current_task.late_date - current_task.early_date;
        if (current_task.previous_tasks)
            current_task.previous_tasks.forEach((task) =>
                compute_late_date_until_null(task)
            );
    }
};
