export const maximum_achievment_date = tasks => {
    if (tasks.length === 1)  return tasks[0].early_date + tasks[0].duration;
    let max = tasks[0].early_date + tasks[0].duration;
    let tasks_length = tasks.length;
    for (let i = 1; i < tasks_length; i++) {
        if ((tasks[i].early_date + tasks[i].duration) > max) {
            max = tasks[i].early_date + tasks[i].duration;
        }
    }
    return max;
}

export const responsible_task = (tasks, date) => {
    if (tasks.length === 1)  return tasks[0];    
    let tasks_length = tasks.length;
    for (let i = 0; i < tasks_length; i++) {
        if ((tasks[i].early_date + tasks[i].duration) === date) {
            return tasks[i];
        }
    }
}

export const minimum_start_date = tasks => {
    if (tasks.length === 1) return tasks[0].late_date;
    let min = tasks[0].late_date;
    let tasks_length = tasks.length;
    for (let i = 1; i < tasks_length; i++) {
        if (tasks[i].late_date < min) {
            min = tasks[i].late_date;
        }
    }
    return min;
}

export const check_every_not_null_early = tasks => tasks.every(task => task.early_date !== null);

export const check_every_not_null_late = tasks => tasks.every(task => task.late_date !== null);