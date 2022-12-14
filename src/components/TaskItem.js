import React, { useEffect, useRef, useState } from "react";
import {
  Circle24Regular,
  CheckmarkCircle24Filled,
  Star24Regular,
  Star24Filled,
} from "@fluentui/react-icons";

const TaskItem = (props) => {
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    setCompleted(props?.task?.isCompleted);
    setImportant(props?.task?.isImportant);
  }, [props]);

  const handleOnCompleted = () => {
    setCompleted(!completed);
    props?.onCompleted(!completed);
  };
  const handleOnImportant = () => {
    setImportant(!important);
    props?.onImportant(!important);
  };

  const searchTermBolder = (string) => {
    if (!props?.searchTerm) return string;

    if (titleRef.current) {
      let regex = new RegExp("(" + props?.searchTerm + ")", "si");
      let newStr = string.replace(regex, "<b>$1</b>");
      titleRef.current.innerHTML = newStr;
    }
  };

  return (
    <div className="bg-white p-3 my-2 rounded d-flex  align-items-center justify-content-between user-select-none">
      <div className="p-0 m-0 d-flex">
        <div>
          {!completed ? (
            <Circle24Regular
              className="cursor-pointer"
              onClick={handleOnCompleted}
            />
          ) : (
            <CheckmarkCircle24Filled
              className="cursor-pointer"
              onClick={handleOnCompleted}
            />
          )}{" "}
        </div>
        {!completed ? (
          <div className="ps-3 pe-4" id="task_title" ref={titleRef}>
            {searchTermBolder(props?.task?.title)}
          </div>
        ) : (
          <del className="ps-3 pe-4">{props?.task?.title}</del>
        )}
      </div>
      <div className="p-0 m-0">
        {!important ? (
          <Star24Regular
            className={!completed ? "cursor-pointer" : ""}
            onClick={() => {
              if (!completed) handleOnImportant();
            }}
          />
        ) : (
          <Star24Filled
            className={!completed ? "cursor-pointer" : ""}
            color="orange"
            onClick={() => {
              if (!completed) handleOnImportant();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TaskItem;
