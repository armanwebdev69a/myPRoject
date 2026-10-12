import React, { useEffect, useState } from "react"
import "./index.css"

interface Todo {
  text: string
  hasDone: boolean
  id: string
}

function App() {
  const [todos, setTodo] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos")
    return saved ? JSON.parse(saved) : []
  })

  const [inputText, setInputText] = useState<string>("")

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputText.trim()) return
    const newTodo: Todo = {
      text: inputText,
      hasDone: false,
      id: crypto.randomUUID(),
    }
    setTodo([...todos, newTodo])
    setInputText("")
  }

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, hasDone: !item.hasDone }
      }
      return item
    })
    setTodo(updatedTodos)
  }

  const deleteTodo = (id: string) => {
    setTodo(todos.filter((t) => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center pt-16 px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
        <h1 className="text-xl font-bold mb-6 text-center text-emerald-400">Todo List</h1>

        <form className="flex gap-2 mb-8" onSubmit={addTodo}>
          <input
            type="text"
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-500"
            placeholder="new work..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold px-4 py-2 rounded-xl text-sm transition-colors cursor-pointer"
          >
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl hover:border-zinc-600 transition-all"
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                className={`text-sm cursor-pointer select-none transition-all ${
                  todo.hasDone
                    ? "line-through text-zinc-500"
                    : "text-zinc-200"
                }`}
              >
                {todo.text}
              </span>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-zinc-600 text-xs mt-4">you have nothing to do</p>
        )}
      </div>
    </div>
  )
}

export default App
