import NewTask from "./NewTask";

export default function Tasks({ tasks, onAddTask, onDeleteTask, projectId }) {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
        <NewTask onAddTask={onAddTask} onDeleteTask={onDeleteTask} />
        {tasks.filter((task) => task.projectId === projectId).length === 0 ? (
          <p className="text-stone-800 my-4">
            This project does not have any Tasks yet.
          </p>
        ) : (
          <ul className="p-4 mt-8 rounded-md bg-stone-100 ">
            {tasks
              .filter((task) => task.projectId === projectId)
              .map((task) => (
                <li key={task.id} className="flex justify-between my-4 ">
                  <span>{task.text}</span>
                  <button
                    className="text-stone hover:text-red-500"
                    onClick={() => {
                      onDeleteTask(task.id);
                    }}
                  >
                    Clear
                  </button>
                </li>
              ))}
          </ul>
        )}
      </section>
    </>
  );
}
