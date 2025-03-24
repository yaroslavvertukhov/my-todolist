import style from './style.module.css'

interface Title {
    text: string
}

export function Title({text}: Title) {
    return (
        <h1 className={style.title}>
            {text}
        </h1>
    )
}