import { TodoListItem } from "../../../entities/TodoListItem/ui/TodoListItem";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import style from './style.module.css';


export function TodoList() {
    return (
        <>
            <div className={style.head}>
                <IconField>
                    <InputIcon className="pi pi-plus"></InputIcon>
                    <InputText pt={{
                        root: {
                            style: {
                                width: '100%'
                            }
                        }
                    }} />
                </IconField>
            </div>
            <div className={style.list}>
                <TodoListItem 
                    label="Тест"
                    checked
                    onChange={() => {}}
                />
                <TodoListItem 
                    label="Тест"
                    checked
                    onChange={() => {}}
                />
            </div>
            <div className={style.footer}>
                <div>
                    осталось 2 задачи
                </div>
                <div className={style.tabs}>
                    <div>
                        Все
                    </div>
                    <div>
                        Активные
                    </div>
                    <div>
                        Завершенные
                    </div>
                </div>
                <div>
                    Удалить все завершенные
                </div>
            </div>
        </>

    )
}