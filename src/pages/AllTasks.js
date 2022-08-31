import { Home24Regular } from "@fluentui/react-icons";
import React, { useEffect, useState } from "react";
import Content from "../components/Content";
import NoTasks from "../components/NoTasks";
import TaskItem from "../components/TaskItem";
import * as uuid from "uuid";

const AllTasks = ({ tasks, onAddNewTask, onUpdateTask }) => {
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    if (tasks) {
      const savedTodayTasks = tasks.filter((v) => v.isCompleted === false);
      setAllTasks(savedTodayTasks);
    }
  }, [tasks]);

  const onEnterInput = (inputValue) => {
    const newTask = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
      isImportant: false,
      addedFrom: "All Tasks",
      createdAt: new Date(),
    };
    onAddNewTask(newTask);
  };

  return (
    <Content
      header
      footer
      title="Tasks"
      customizeTheme
      value={onEnterInput}
      icon={<Home24Regular className="me-3" />}
    >
      {allTasks?.length > 0 ? (
        allTasks.map((task, id) => (
          <TaskItem
            key={id}
            task={task}
            onImportant={(v) => onUpdateTask(task.id, v, "isImportant")}
            onCompleted={(v) => onUpdateTask(task.id, v, "isCompleted")}
          />
        ))
      ) : (
        <NoTasks title="No tasks yet ☹️" />
      )}
    </Content>
  );
};

export default AllTasks;
