import { useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ITodoListItem } from "../../../entities/TodoListItem/model/TodoListItem";

enum EAction {
    ADD = 'add',
    CLEAR_COMPLETED = 'clear-comleted',
    TOGGLE_ITEM = 'toggle-item',
    CHANGE_TAB = 'change-tab'
}

export enum ETabs {
    ALL = 'all',
    ACTIVE = 'active',
    COMPLETED = 'completed',
}

interface State {
    activeTab: ETabs,
    items: ITodoListItem[]
}

interface Action {
    type: EAction,
    payload?: any
}

function reducer(state: State, action: Action) {
    const copyArr: ITodoListItem[] = JSON.parse(JSON.stringify(state.items));

    switch (action.type) {
        case EAction.ADD:
            copyArr.push({
                id: uuidv4(),
                label: action.payload,
                checked: false
            });

            return {
                ...state,
                items: copyArr
            }
        case EAction.CLEAR_COMPLETED:
            const activeTasks = copyArr.filter((task) => !task.checked)

            return {
                ...state,
                items: activeTasks
            }
        case EAction.TOGGLE_ITEM:
            const selectedTask = copyArr.find((task) => task.id === action.payload)

            if (selectedTask) {
                selectedTask.checked = !selectedTask.checked
            }

            return {
                ...state,
                items: copyArr
            }
        case EAction.CHANGE_TAB:
            return {
                ...state,
                activeTab: action.payload
            }
        default:
            return state
    }
}

const initValue: State = {
    activeTab: ETabs.ALL,
    items: []
}

export function useStore() {
    const [state, dispatch] = useReducer<State, [Action]>(reducer, initValue);

    const getActiveTab = () => {
        return state.activeTab
    }

    const getItems = () => {
        switch (state.activeTab) {
            case ETabs.ALL:
                return state.items
            case ETabs.ACTIVE:
                return state.items.filter((item) => !item.checked)
            case ETabs.COMPLETED:
                return state.items.filter((item) => item.checked)
        }
    }

    const addItem = (text: string) => {
        dispatch({
            type: EAction.ADD,
            payload: text
        })
    }

    const checkItem = (id: string) => {
        dispatch({
            type: EAction.TOGGLE_ITEM,
            payload: id
        })
    }

    const clearComletedTasks = () => {
        dispatch({
            type: EAction.CLEAR_COMPLETED,
        })
    }

    const changeTab = (tab: ETabs) => {
        dispatch({
            type: EAction.CHANGE_TAB,
            payload: tab
        })
    }

    return {
        getActiveTab,
        getItems,
        addItem,
        checkItem,
        clearComletedTasks,
        changeTab
    }
}