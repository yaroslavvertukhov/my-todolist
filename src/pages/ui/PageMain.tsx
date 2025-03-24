import { Layout } from "../../shared/ui/Layout";
import { Title } from "../../shared/ui/Title";
import { TodoList } from "../../widgets/TodoList/ui";

export function PageMain() {
    return (
        <Layout>
            <Title text="TODO"/>
            <TodoList />
        </Layout>
    )
}