export class Task {
    constructor(id, duration = null, previous_tasks = null) {
        this.id = id;
        this.duration = duration;
        this.early_date = null;
        this.late_date = null;
        this.margin = null;
        this.previous_tasks = previous_tasks;
        this.next_tasks = [];
    }
    toString() {
        return this.id;
    }
}

export class LinkedTask {
    constructor() {
        this.start_tasks = [];
        this.end_tasks = [];
    }
    add_end_task(task) {
        task.next_tasks = null;
        this.end_tasks.push(task);
    }
}

class CriticalPathLink {
    constructor(source, target, value = 0) {
        this.source = source;
        this.target = target;
        this.value = value;
    }
}

export class CriticalPath {
    constructor() {
        this.nodes = [{ id: "Fin" }];
        this.links = [];
    }
    add_new_link(node) {
        this.nodes.unshift(node);
        this.links.unshift(
            new CriticalPathLink(node.id, this.nodes[1].id, node.duration)
        );
        return this;
    }
}
