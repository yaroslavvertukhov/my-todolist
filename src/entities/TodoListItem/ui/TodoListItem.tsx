import { Checkbox } from "primereact/checkbox";
import style from './style.module.css';

interface TodoListItem {
    label: string
    checked: boolean
    onChange: () => void
}

export function TodoListItem({label, checked, onChange}: TodoListItem) {
    return (
        <label className={style.container}>
            <Checkbox name="pizza" value="Cheese" onChange={onChange} checked={checked} />
            <span className="ml-2">{label}</span>
        </label>
    )
}