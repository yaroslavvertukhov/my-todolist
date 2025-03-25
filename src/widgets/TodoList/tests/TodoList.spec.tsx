import { beforeAll, describe, expect, it } from "vitest";
import {cleanup, render, screen, within} from '@testing-library/react'
import userEvent, {UserEvent} from '@testing-library/user-event'
import { TodoList } from "../ui";
import { ETestIdCommon } from "./testId";

const renderTodoList = () => {
    cleanup();
    render(
        <TodoList />
    )
}

const tasks = [
    'Тестовая задача созданная кликом по иконке',
    'Тестовая задача созданная кнопкой Enter',
]

describe('Проверка TodoList', () => {
    beforeAll(() => {
        renderTodoList();
    })

    describe('Создание задач', async () => {
        it('Добавление задач кликом по иконке и по нажатию на Enter', async () => {
            const input = screen.getByTestId(ETestIdCommon.CREATE_TASK_INPUT);
            const icon = screen.getByTestId(ETestIdCommon.CREATE_TASK_ICON);

            // Создание задачи кликом по иконке
            await userEvent.click(input)
            await userEvent.type(input, tasks[0]);

            expect(input.value).toBe(tasks[0]);

            await userEvent.click(icon);

            expect(input.value).toBe('');

            
            // Создание задачи кнопкой Enter
            await userEvent.click(input)
            await userEvent.type(input, tasks[1]);

            expect(input.value).toBe(tasks[1]);

            await userEvent.keyboard("{Enter}");

            expect(input.value).toBe('');
        })
    })

    describe('Работа с задачами', async () => {
        it('Проверка отображения задач на вкладке Активные до взаимодействия с задачами', async () => {
            const tabs = screen.getByTestId(ETestIdCommon.TABS);
            const tab = screen.getByText('Активные');
        
            await userEvent.click(tab.closest('.p-button'))

            const selectedTab = tabs.querySelector('.p-highlight > span');
            expect(selectedTab.textContent).toBe('Активные');

            const items = screen.getAllByTestId(ETestIdCommon.LIST_ITEM);

            expect(items.length).toBe(2);
        })

        it('Проверка отображения задач на вкладке Завершенные до взаимодействия с задачами', async () => {
            const tabs = screen.getByTestId(ETestIdCommon.TABS);
            const tab = screen.getByText('Завершенные');

            await userEvent.click(tab.closest('.p-button'))

            const selectedTab = tabs.querySelector('.p-highlight > span');
            expect(selectedTab.textContent).toBe('Завершенные');

            const items = screen.queryAllByTestId(ETestIdCommon.LIST_ITEM);

            expect(items.length).toBe(0);
        })

        it('Проверка отображения задач на вкладке Все до взаимодействия с задачами', async () => {
            const tabs = screen.getByTestId(ETestIdCommon.TABS);
            const tab = screen.getByText('Все');
        
            await userEvent.click(tab.closest('.p-button'))

            const selectedTab = tabs.querySelector('.p-highlight > span');
            expect(selectedTab.textContent).toBe('Все');

            const items = screen.getAllByTestId(ETestIdCommon.LIST_ITEM);

            expect(items.length).toBe(2);
        })

        it('Нажатие на задачу и проверка класса стилизации завершения', async () => {
            const task = screen.getByText(tasks[0]);
        
            await userEvent.click(task)

            const checkedTask = task.closest('[class~=_checked_]');
            expect(checkedTask).toBeDefined();
        })

        it('Проверка отображения задач на вкладке Активные после взаимодействия с задачами', async () => {
            const tabs = screen.getByTestId(ETestIdCommon.TABS);
            const tab = screen.getByText('Активные');
        
            await userEvent.click(tab.closest('.p-button'))

            const selectedTab = tabs.querySelector('.p-highlight > span');
            expect(selectedTab.textContent).toBe('Активные');

            const items = screen.getAllByTestId(ETestIdCommon.LIST_ITEM);

            expect(items.length).toBe(1);
        })

        it('Проверка отображения задач на вкладке Завершенные после взаимодействия с задачами', async () => {
            const tabs = screen.getByTestId(ETestIdCommon.TABS);
            const tab = screen.getByText('Завершенные');

            await userEvent.click(tab.closest('.p-button'))

            const selectedTab = tabs.querySelector('.p-highlight > span');
            expect(selectedTab.textContent).toBe('Завершенные');

            const items = screen.queryAllByTestId(ETestIdCommon.LIST_ITEM);

            expect(items.length).toBe(1);
        })

        it('Проверка отображения задач на вкладке Все после взаимодействия с задачами', async () => {
            const tabs = screen.getByTestId(ETestIdCommon.TABS);
            const tab = screen.getByText('Все');
        
            await userEvent.click(tab.closest('.p-button'))

            const selectedTab = tabs.querySelector('.p-highlight > span');
            expect(selectedTab.textContent).toBe('Все');

            const items = screen.getAllByTestId(ETestIdCommon.LIST_ITEM);

            expect(items.length).toBe(2);
        })
    })

    describe('Проверка очистки завершенных', async () => {
        it('Проверка отображения задач на вкладке Активные до взаимодействия с кнопкой очистки', async () => {
            const tabs = screen.getByTestId(ETestIdCommon.TABS);
            const tab = screen.getByText('Активные');
        
            await userEvent.click(tab.closest('.p-button'))

            const selectedTab = tabs.querySelector('.p-highlight > span');
            expect(selectedTab.textContent).toBe('Активные');

            const items = screen.getAllByTestId(ETestIdCommon.LIST_ITEM);

            expect(items.length).toBe(1);
        })

        it('Проверка отображения задач на вкладке Завершенные до взаимодействия с задачами', async () => {
            const tabs = screen.getByTestId(ETestIdCommon.TABS);
            const tab = screen.getByText('Завершенные');

            await userEvent.click(tab.closest('.p-button'))

            const selectedTab = tabs.querySelector('.p-highlight > span');
            expect(selectedTab.textContent).toBe('Завершенные');

            const items = screen.queryAllByTestId(ETestIdCommon.LIST_ITEM);

            expect(items.length).toBe(1);
        })

        it('Проверка отображения задач на вкладке Все до взаимодействия с задачами', async () => {
            const tabs = screen.getByTestId(ETestIdCommon.TABS);
            const tab = screen.getByText('Все');
        
            await userEvent.click(tab.closest('.p-button'))

            const selectedTab = tabs.querySelector('.p-highlight > span');
            expect(selectedTab.textContent).toBe('Все');

            const items = screen.getAllByTestId(ETestIdCommon.LIST_ITEM);

            expect(items.length).toBe(2);
        })

        it('Нажатие на кнопку очистки', async () => {
            const button = screen.getByTestId(ETestIdCommon.CLEAR_COMPLETED_TASKS);
        
            expect(button).toBeDefined();

            await userEvent.click(button);
        })

        it('Проверка отображения задач на вкладке Активные после взаимодействия с кнопкой очистки', async () => {
            const tabs = screen.getByTestId(ETestIdCommon.TABS);
            const tab = screen.getByText('Активные');
        
            await userEvent.click(tab.closest('.p-button'))

            const selectedTab = tabs.querySelector('.p-highlight > span');
            expect(selectedTab.textContent).toBe('Активные');

            const items = screen.getAllByTestId(ETestIdCommon.LIST_ITEM);

            expect(items.length).toBe(1);
        })

        it('Проверка отображения задач на вкладке Завершенные после взаимодействия с задачами', async () => {
            const tabs = screen.getByTestId(ETestIdCommon.TABS);
            const tab = screen.getByText('Завершенные');

            await userEvent.click(tab.closest('.p-button'))

            const selectedTab = tabs.querySelector('.p-highlight > span');
            expect(selectedTab.textContent).toBe('Завершенные');

            const items = screen.queryAllByTestId(ETestIdCommon.LIST_ITEM);

            expect(items.length).toBe(0);
        })

        it('Проверка отображения задач на вкладке Все после взаимодействия с задачами', async () => {
            const tabs = screen.getByTestId(ETestIdCommon.TABS);
            const tab = screen.getByText('Все');
        
            await userEvent.click(tab.closest('.p-button'))

            const selectedTab = tabs.querySelector('.p-highlight > span');
            expect(selectedTab.textContent).toBe('Все');

            const items = screen.getAllByTestId(ETestIdCommon.LIST_ITEM);

            expect(items.length).toBe(1);
        })
    });
    
})