import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TodayTasks from "./pages/TodayTasks";
import ImportantTasks from "./pages/ImportantTasks";
import AllTasks from "./pages/AllTasks";
import CompletedTasks from "./pages/CompletedTasks";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const onAddNewTask = (task) => {
    setTasks((p) => [task, ...p]);
  };

  const onUpdateTask = (id, v, field) => {
    let cloneTasks = [...tasks];
    let index = cloneTasks.findIndex((v) => v.id === id);
    cloneTasks[index][field] = v;
    setTasks(cloneTasks);
  };

  return (
    <>
      <BrowserRouter>
        <div className="content">
          <div className="sidebar-wrapper">
            <Sidebar />
          </div>
          <div className="task-wrapper">
            <Routes>
              <Route
                path="/"
                element={
                  <TodayTasks
                    tasks={tasks}
                    onAddNewTask={onAddNewTask}
                    onUpdateTask={onUpdateTask}
                  />
                }
              />
              <Route
                path="/important"
                element={
                  <ImportantTasks
                    tasks={tasks}
                    onAddNewTask={onAddNewTask}
                    onUpdateTask={onUpdateTask}
                  />
                }
              />
              <Route
                path="/tasks"
                element={
                  <AllTasks
                    tasks={tasks}
                    onAddNewTask={onAddNewTask}
                    onUpdateTask={onUpdateTask}
                  />
                }
              />
              <Route
                path="/completed"
                element={
                  <CompletedTasks
                    tasks={tasks}
                    onAddNewTask={onAddNewTask}
                    onUpdateTask={onUpdateTask}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
