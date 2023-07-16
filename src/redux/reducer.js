import { LinkedTask } from "../utils/model/data.model";

const initialState = {
    tasksCount: 0,
    listTasks: [],
    linkedTask: new LinkedTask(),
    finalDate: 0,
    criticalPath: null,
    computable: false,
    computing: false,
    computed: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "INITIATE":
            return {
                tasksCount: action.count,
                listTasks: action.list,
                linkedTask: new LinkedTask(),
                finalDate: 0,
                criticalPath: null,
                computable: action.computabled,
                computing: false,
                computed: false,
            };
        case "COMPUTABLE":
            return {
                ...state,
                computable: action.computabled,
            };
        case "COMPUTE":
            return {
                ...state,
                computing: true,
            };
        case "COMPUTED":
            return {
                ...state,
                finalDate: action.final,
                criticalPath: action.path,
                computing: false,
                computed: true,
            };
        default:
            return state;
    }
};
