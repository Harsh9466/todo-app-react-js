import React, { useMemo } from "react";
import {
  makeStyles,
  tokens,
  MenuList,
  MenuItem,
  Input,
  Divider,
} from "@fluentui/react-components";
import {
  Home24Regular,
  Star24Regular,
  WeatherSunny24Regular,
  Search16Regular,
  CalendarCheckmark24Regular,
} from "@fluentui/react-icons";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground3,
    // width: "215px",
    height: "100vh",
    boxShadow: `${tokens.shadow16}`,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "sticky",
    top: 0,
    left: 0,
  },
});

const menuItems = [
  {
    title: "My Day",
    link: "/",
    Icon: <WeatherSunny24Regular />,
  },
  {
    title: "Important",
    link: "/important",
    Icon: <Star24Regular />,
  },
  {
    title: "Tasks",
    link: "/tasks",
    Icon: <Home24Regular />,
  },
  {
    title: "Completed",
    link: "/completed",
    divider: true,
    Icon: <CalendarCheckmark24Regular />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const styles = useStyles();
  const path = useMemo(() => location.pathname, [location]);

  return (
    <>
      <div className={styles.container}>
        <Input
          contentAfter={<Search16Regular />}
          className="mx-3 mt-3"
          style={{ width: "85%" }}
          placeholder="Search"
        />
        <MenuList className="pt-3 px-3" style={{ width: "100%" }}>
          {menuItems.map((menuItem) => (
            <>
              {menuItem.divider && <Divider className="my-2" />}
              <Link
                key={menuItem.link}
                to={menuItem.link}
                className="text-decoration-none"
              >
                <MenuItem
                  className={`menu-item mt-1 ${
                    path === menuItem.link ? "active" : ""
                  }`}
                >
                  {React.cloneElement(menuItem.Icon)}
                  <span className="fw-normal h6 ms-2">{menuItem.title}</span>
                </MenuItem>
              </Link>
            </>
          ))}
        </MenuList>
      </div>
    </>
  );
};

export default Sidebar;
