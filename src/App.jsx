import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSideBar from "./components/ProjectSideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProject: undefined,
    project: [],
    tasks: [],
  });

  function handleAddTask(task) {
    setProjectState((prevState) => {
      const newTaskId = Math.random();
      const newTask = {
        text: task,
        projectId: prevState.selectedProject,
        id: newTaskId,
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((eachTask) => eachTask.id !== id),
      };
    });
  }

  function handleSelectProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProject: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProject: null,
      };
    });
  }

  function handleCancelProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProject: undefined,
      };
    });
  }

  function handleDeleteProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        project: prevState.project.filter(
          (eachProject) => eachProject.id !== prevState.selectedProject
        ),
        selectedProject: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevState,
        selectedProject: undefined,
        project: [...prevState.project, newProject],
      };
    });
  }
  const selectedProject = projectState.project.find(
    (project) => project.id === projectState.selectedProject
  );
  // let selectedTasks = projectState.tasks.find(
  //   (eachTask) => eachTask.projectId === projectState.selectedProject
  // );
  // if (selectedTasks === undefined) {
  //   selectedTasks = [];
  // }
  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      selectedTask={projectState.tasks}
    />
  );
  if (projectState.selectedProject === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelProject} />
    );
  } else if (projectState.selectedProject === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ProjectSideBar
          onStartAddProject={handleStartAddProject}
          projects={projectState.project}
          onSelectProject={handleSelectProject}
          selectedProjectId={projectState.selectedProject}
        />
        {content}
      </main>
    </>
  );
}

export default App;
