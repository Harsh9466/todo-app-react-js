import React, { useMemo, useRef, useState } from "react";
import {
  Divider,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import {
  Add20Regular,
  TextBulletListLtr24Regular,
} from "@fluentui/react-icons";
import { DateFormattor } from "../helpers/utils";
import { menuItems } from "./Sidebar";
import { Link, useLocation } from "react-router-dom";

const Content = (props) => {
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");
  const path = useMemo(() => location.pathname, [location]);
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
          <div className="d-block d-md-none">
            <Menu>
              <MenuTrigger>
                <MenuButton
                  icon={<TextBulletListLtr24Regular />}
                  appearance="transparent"
                />
              </MenuTrigger>
              <MenuPopover>
                <MenuList className="pt-3 px-3" style={{ width: "250px" }}>
                  {menuItems.map((menuItem) => (
                    <React.Fragment key={menuItem.link}>
                      {menuItem.divider && <Divider className="my-2" />}
                      <Link to={menuItem.link} className="text-decoration-none">
                        <MenuItem
                          className={`menu-item mt-1 ${
                            path === menuItem.link ? "active" : ""
                          }`}
                        >
                          {React.cloneElement(menuItem.Icon)}
                          <span className="fw-normal h6 ms-2">
                            {menuItem.title}
                          </span>
                        </MenuItem>
                      </Link>
                    </React.Fragment>
                  ))}
                </MenuList>
              </MenuPopover>
            </Menu>
          </div>
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
