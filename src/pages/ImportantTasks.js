import { Star24Regular } from "@fluentui/react-icons";
import React, { useEffect, useState } from "react";
import Content from "../components/Content";
import NoTasks from "../components/NoTasks";
import TaskItem from "../components/TaskItem";
import * as uuid from "uuid";

const ImportantTasks = ({ tasks, onAddNewTask, onUpdateTask }) => {
  const [importantTasks, setImportantTasks] = useState([]);

  useEffect(() => {
    if (tasks) {
      const savedTodayTasks = tasks.filter(
        (v) => v.isImportant === true && v.isCompleted === false
      );
      setImportantTasks(savedTodayTasks);
    }
  }, [tasks]);

  const onEnterInput = (inputValue) => {
    const newTask = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
      isImportant: true,
      addedFrom: "Imporatant",
      createdAt: new Date(),
    };
    onAddNewTask(newTask);
  };

  return (
    <>
      <Content
        header
        footer
        title="Important"
        customizeTheme
        icon={<Star24Regular className="me-3" />}
        value={onEnterInput}
      >
        {importantTasks?.length > 0 ? (
          importantTasks.map((task, id) => (
            <TaskItem
              key={id}
              task={task}
              onImportant={(v) => onUpdateTask(task.id, v, "isImportant")}
              onCompleted={(v) => onUpdateTask(task.id, v, "isCompleted")}
            />
          ))
        ) : (
          <NoTasks title="Add important tasks 😃" />
        )}
      </Content>
    </>
  );
};

export default ImportantTasks;
