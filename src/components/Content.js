import React, { useRef, useState } from "react";
import { Input, ToggleButton } from "@fluentui/react-components";
import { Add20Regular } from "@fluentui/react-icons";
import { DateFormattor } from "../helpers/utils";

const Content = (props) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const onInputClick = () => {
    inputRef.current.focus();
  };

  const onInputEnter = (value) => {
    props?.value && props?.value(value);
    setInputValue("");
  };

  return (
    <>
      {props.header && (
        <div className={`m-0 pt-4 pb-2 px-5 task-header`}>
          <div className="p-0 m-0">
            <h3>
              {props?.icon && React.cloneElement(props?.icon, {})}
              {props.title || ""}
            </h3>
            {props.date && (
              <p className="p-0 ms-4 ps-3">{DateFormattor(new Date())}</p>
            )}
          </div>
          {props?.customizeTheme && (
            <ToggleButton
              appearance="transparent"
              size="medium"
              className="dot-button fw-bold"
            >
              ...
            </ToggleButton>
          )}
        </div>
      )}
      <div
        className={`task-body p-3 ${!props?.date ? "task-body-no-date" : ""}`}
      >
        {props.children}
      </div>
      {props.footer && (
        <div className="task-footer pt-2 pb-5 px-5">
          <div className="m-0 p-0" onClick={onInputClick}>
            <Input
              id="task-input"
              ref={inputRef}
              value={inputValue}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  onInputEnter(e.target.value);
                }
              }}
              onChange={(e) => setInputValue(e.target.value)}
              contentBefore={<Add20Regular className="me-3" />}
              className="w-100 py-3 task-input"
              placeholder="Add a task"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Content;
