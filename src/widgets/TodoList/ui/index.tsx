import { TodoListItem } from "../../../entities/TodoListItem/ui/TodoListItem";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import style from './style.module.css';
import { ETabs, useStore } from "../model/store";
import { useState } from "react";
import { SelectButton } from "primereact/selectbutton";


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

    return (
        <>
            <div className={style.head}>
                <IconField>
                    <InputIcon 
                        className="pi pi-plus"
                        onClick={createTask}
                    ></InputIcon>
                    <InputText 
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
                    getItems().length ? getItems().map((item) => (
                        <TodoListItem 
                            key={item.id}
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
                    осталось 2 задачи
                </div>
                <div className={style.tabs}>
                    <SelectButton value={getActiveTab()} onChange={(e) => changeTab(e.value)} optionLabel="name" options={tabs} />
                </div>
                <div onClick={clearComletedTasks}>
                    Удалить все завершенные
                </div>
            </div>
        </>

    )
}