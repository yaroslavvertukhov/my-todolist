import { ReactNode } from 'react'
import style from './style.module.css'

interface Layout {
    children: ReactNode
}

export function Layout({children}: Layout) {
    return (
        <div className={style.container}>
            {children}
        </div>
    )
}