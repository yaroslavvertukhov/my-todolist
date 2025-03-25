import { Checkbox } from "primereact/checkbox";
import style from './style.module.css';
import classNames from "classnames";

interface TodoListItem {
    id: string
    dataTestid?: string
    label: string
    checked: boolean
    onChange: (id: string) => void
}

export function TodoListItem({id, dataTestid, label, checked, onChange}: TodoListItem) {
    return (
        <label data-testid={dataTestid} className={classNames(style.container, {
            [style.checked]: checked
        })}>
            <Checkbox name="pizza" value="Cheese" onChange={() => onChange(id)} checked={checked} />
            <span className="ml-2">{label}</span>
        </label>
    )
}