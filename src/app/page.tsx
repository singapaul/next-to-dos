import Link from "next/link";
import { prisma } from "@/db";
import { TodoItem } from "./components/TodoItem";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";

  console.log(id, complete);

  await prisma.todo.update({ where: { id }, data: { complete } });
}

export default async function Home() {
  // now all the client gets is raw HTML benefits are:
  // 1.Fetch loading state 2. errors 3. All handled by NextJS

  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}

// normally in a react app we would do a useQuery or a fetch request
// but with NextJS 13 we dont need to.
// as long as we are using the app router we can call server code
// from inside our components. With next JS 13 we can call server code from
// inside our components. All we have to do is turn our components into Async Functions
