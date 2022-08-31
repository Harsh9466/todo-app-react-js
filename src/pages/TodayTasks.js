import React, { useEffect, useState } from "react";
import Content from "../components/Content";
import TaskItem from "../components/TaskItem";
import NoTasks from "../components/NoTasks";
import { WeatherSunny24Regular } from "@fluentui/react-icons";
import * as uuid from "uuid";

const TodayTasks = ({ tasks, onAddNewTask, onUpdateTask }) => {
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
        customizeTheme
        value={onEnterInput}
        icon={<WeatherSunny24Regular className="me-3" />}
      >
        {todayTasks && todayTasks.length > 0 ? (
          todayTasks.map((task, id) => (
            <TaskItem
              key={id}
              task={task}
              onImportant={(v) => onUpdateTask(task.id, v, "isImportant")}
              onCompleted={(v) => onUpdateTask(task.id, v, "isCompleted")}
            />
          ))
        ) : (
          <NoTasks title="Add Your Today Tasks 😄" />
        )}
      </Content>
    </>
  );
};

export default TodayTasks;
