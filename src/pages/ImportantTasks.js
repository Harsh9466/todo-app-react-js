import { Star24Regular } from "@fluentui/react-icons";
import React, { useEffect, useState } from "react";
import Content from "../components/Content";
import NoTasks from "../components/NoTasks";
import TaskItem from "../components/TaskItem";
import * as uuid from "uuid";
import { useLocation } from "react-router-dom";

const ImportantTasks = ({ tasks, onAddNewTask, onUpdateTask }) => {
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get("search");
  const [importantTasks, setImportantTasks] = useState([]);

  useEffect(() => {
    if (tasks) {
      const savedTodayTasks = tasks.filter(
        (v) => v.isImportant === true && v.isCompleted === false
      );
      setImportantTasks(savedTodayTasks);
    }
  }, [tasks]);

  useEffect(() => {
    let regex = "";
    if (searchTerm) {
      regex = new RegExp("(" + searchTerm + ")", "si");
    }
    setImportantTasks(
      tasks.filter(
        (v) =>
          v.isImportant === true &&
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
              searchTerm={searchTerm}
              onImportant={(v) => onUpdateTask(task.id, v, "isImportant")}
              onCompleted={(v) => onUpdateTask(task.id, v, "isCompleted")}
            />
          ))
        ) : (
          <NoTasks
            title={!searchTerm ? "Add important tasks 😃" : "Result not found"}
          />
        )}
      </Content>
    </>
  );
};

export default ImportantTasks;
