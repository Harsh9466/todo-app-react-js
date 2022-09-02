import React, { useEffect, useMemo, useRef, useState } from "react";
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
  // Settings24Regular,
} from "@fluentui/react-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";

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

export const menuItems = [
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
  // {
  //   title: "Settings",
  //   link: "/settings",
  //   divider: true,
  //   Icon: <Settings24Regular />,
  // },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const styles = useStyles();
  const path = useMemo(() => location.pathname, [location]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    navigate(location.pathname);
    setSearch("");
  }, [navigate, location.pathname]);

  const onEnter = (value) => {
    onSearch(value);
    searchInputRef.current.blur();
  };

  const onSearch = (value) => {
    if (!value) {
      navigate(location.pathname);
      return;
    }
    navigate("?search=" + value.trim());
  };

  return (
    <>
      <div className={styles.container}>
        {/* {console.log(search)} */}
        <Input
          type="search"
          ref={searchInputRef}
          contentAfter={!search && <Search16Regular />}
          className="mx-3 mt-3"
          style={{ width: "85%" }}
          placeholder="Search"
          value={search}
          disabled={location.pathname === "/completed"}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onEnter(e.target.value);
            }
          }}
          onChange={(e) => {
            setSearch(e.target.value);
            debounce(() => {
              onSearch(e.target.value);
            }, 800)();
          }}
        />
        <MenuList className="pt-3 px-3" style={{ width: "100%" }}>
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
                  <span className="fw-normal h6 ms-2">{menuItem.title}</span>
                </MenuItem>
              </Link>
            </React.Fragment>
          ))}
        </MenuList>
      </div>
    </>
  );
};

export default Sidebar;
