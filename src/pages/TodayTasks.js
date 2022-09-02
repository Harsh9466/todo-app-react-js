import React, { useEffect, useState } from "react";
import Content from "../components/Content";
import TaskItem from "../components/TaskItem";
import NoTasks from "../components/NoTasks";
import { WeatherSunny24Regular } from "@fluentui/react-icons";
import * as uuid from "uuid";
import { useLocation } from "react-router-dom";

const TodayTasks = ({ tasks, onAddNewTask, onUpdateTask }) => {
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get("search");
  const [todayTasks, setTodayTasks] = useState([]);

  useEffect(() => {
    if (tasks) {
      const savedTodayTasks = tasks.filter(
        (v) =>
          new Date(v.createdAt).toLocaleDateString() ===
            new Date().toLocaleDateString() &&
          v.addedFrom === "My Day" &&
          v.isCompleted === false
      );
      setTodayTasks(savedTodayTasks);
    }
  }, [tasks]);

  useEffect(() => {
    let regex = "";
    if (searchTerm) {
      regex = new RegExp("(" + searchTerm + ")", "si");
    }
    setTodayTasks(
      tasks.filter(
        (v) =>
          new Date(v.createdAt).toLocaleDateString() ===
            new Date().toLocaleDateString() &&
          v.addedFrom === "My Day" &&
          v.isCompleted === false &&
          v.title.match(regex)
      )
    );
  }, [tasks, searchTerm]);

  const onEnterInput = (inputValue) => {
    const newTask = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
      isImportant: false,
      addedFrom: "My Day",
      createdAt: new Date(),
    };
    onAddNewTask(newTask);
  };

  return (
    <>
      <Content
        header
        footer
        title="My Day"
        date
        value={onEnterInput}
        icon={<WeatherSunny24Regular className="me-3" />}
      >
        {todayTasks && todayTasks.length > 0 ? (
          todayTasks.map((task, id) => (
            <TaskItem
              key={id}
              task={task}
              searchTerm={searchTerm}
              onImportant={(v) => onUpdateTask(task.id, v, "isImportant")}
              onCompleted={(v) => onUpdateTask(task.id, v, "isCompleted")}
            />
          ))
        ) : (
          <NoTasks
            title={!searchTerm ? "Add Your Today Tasks 😄" : "Result not found"}
          />
        )}
      </Content>
    </>
  );
};

export default TodayTasks;
