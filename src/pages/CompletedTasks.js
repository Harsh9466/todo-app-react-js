import React, { useEffect, useState } from "react";
import Content from "../components/Content";
import TaskItem from "../components/TaskItem";
import NoTasks from "../components/NoTasks";
import { CalendarCheckmark24Regular } from "@fluentui/react-icons";
import * as uuid from "uuid";

const CompletedTasks = ({ tasks, onAddNewTask, onUpdateTask }) => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    if (tasks) {
      const savedTodayTasks = tasks.filter((v) => v.isCompleted === true);
      setCompletedTasks(savedTodayTasks);
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
        title="Completed Tasks"
        customizeTheme
        value={onEnterInput}
        disableSearch
        icon={<CalendarCheckmark24Regular className="me-3" />}
      >
        {completedTasks && completedTasks.length > 0 ? (
          completedTasks.map((task, id) => (
            <TaskItem
              key={id}
              task={task}
              onCompleted={(v) => onUpdateTask(task.id, v, "isCompleted")}
            />
          ))
        ) : (
          <NoTasks title="No completed tasks 😒" />
        )}
      </Content>
    </>
  );
};

export default CompletedTasks;
