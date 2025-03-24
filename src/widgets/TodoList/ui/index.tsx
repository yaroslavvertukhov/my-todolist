import { TodoListItem } from "../../../entities/TodoListItem/ui/TodoListItem";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import style from './style.module.css';
import { ETabs, useStore } from "../model/store";
import { useState } from "react";
import { SelectButton } from "primereact/selectbutton";
import { Button } from "primereact/button";
import { declension } from "../../../shared/lib/declension";
import { ETestIdCommon } from "../tests/testId";


export function TodoList() {
    const {getActiveTab, getItems, addItem, checkItem, clearComletedTasks, changeTab} = useStore();
    const [newTaskText, setNewTaskText] = useState('');

    const createTask = () => {
        addItem(newTaskText);

        setNewTaskText('')
    }

    const tabs = [
        { name: 'Все', value: ETabs.ALL },
        { name: 'Активные', value: ETabs.ACTIVE },
        { name: 'Завершенные', value: ETabs.COMPLETED }
    ];

    const getTextEmptyList = () => {
        switch (getActiveTab()) {
            case ETabs.ALL:
                return 'Нет задач'
            case ETabs.ACTIVE:
                return 'Нет активных задач'
            case ETabs.COMPLETED:
                return 'Нет завершенных задач'
        }
    }

    const activeTabItems = getItems(getActiveTab());

    return (
        <>
            <div className={style.head}>
                <IconField>
                    <InputIcon 
                        data-testid={ETestIdCommon.CREATE_TASK_ICON}
                        className="pi pi-plus"
                        onClick={createTask}
                    ></InputIcon>
                    <InputText 
                        data-testid={ETestIdCommon.CREATE_TASK_INPUT}
                        value={newTaskText}
                        onChange={(e) => setNewTaskText(e.target.value)}
                        onKeyDown={(e) => e.code === 'Enter' && createTask()}
                        pt={{
                            root: {
                                style: {
                                    width: '100%'
                                }
                            }
                            
                        }} 
                    />
                </IconField>
            </div>
            <div className={style.list}>
                {
                    activeTabItems.length ? activeTabItems.map((item) => (
                        <TodoListItem
                            key={item.id}
                            dataTestid={ETestIdCommon.LIST_ITEM}
                            id={item.id}
                            label={item.label}
                            checked={item.checked}
                            onChange={checkItem}
                        />
                    )) : (
                        <div className={style.emptyList}>
                            {getTextEmptyList()}
                        </div>
                    )
                }
                {
                    
                }
            </div>
            <div className={style.footer}>
                <div>
                    осталось {getItems((ETabs.ACTIVE)).length} {declension(getItems((ETabs.ACTIVE)).length, ['задача', 'задачи', 'задач'])}
                </div>
                <div className={style.tabs}>
                    <SelectButton data-testId={ETestIdCommon.TABS} value={getActiveTab()} onChange={(e) => changeTab(e.value)} optionLabel="name" options={tabs} />
                </div>
                <div onClick={clearComletedTasks}>
                    <Button label="Удалить все завершенные" severity="danger" text raised />
                </div>
            </div>
        </>

    )
}