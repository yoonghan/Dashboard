`use strict`

import * as React from 'react';
import Setting from "../components/routable/Setting";
import Home from "../components/routable/Home";
import Inventory from "../components/routable/Inventory";
import ServerInfo from "../components/routable/ServerInfo";
import NotificationAlert from "../components/routable/Notification/Alert";
import NotificationWarning from "../components/routable/Notification/Warning";
import NotificationMail from "../components/routable/Notification/Mail";

export interface RouteModal {
  path: string; //Url path
  label: string; //Display Label in Menu
  keywords: Array<string>; //Search string matching
  tags: Array<string>; //Tagging - unimplemented
  exact?: boolean;  //Menu match, e.g. /menu/search should match /menu or /menu/search
  isNotMenuItem?: boolean; //Valid route, but will not be a menu
  component: React.ComponentType<any>; //React Node Component
}

export const routes:Array<RouteModal> = [
  {
    path: "/setting",
    label: "Setting",
    keywords: ["configuration", "settings"],
    tags: ["modal"],
    exact: true,
    component: Setting
  },
  {
    path: "/inventory",
    label: "Inventory",
    keywords: ["collection", "inventory"],
    tags: ["inventory"],
    exact: true,
    component: Inventory
  },
  {
    path: "/",
    label: "Home",
    keywords: ["root", "home", "network"],
    tags: ["home"],
    exact: true,
    component: Home
  },
  {
    path: "/serverinfo",
    label: "Server Info",
    keywords: ["inventory", "hardware", "software", "info"],
    tags: ["inventory"],
    exact: true,
    component: ServerInfo
  },
  {
    path: "/notification/alert",
    label: "Notification - Alert",
    keywords: ["notification"],
    tags: ["notification"],
    exact: true,
    isNotMenuItem: true,
    component: NotificationAlert
  },
  {
    path: "/notification/warning",
    label: "Notification - Warning",
    keywords: ["notification"],
    tags: ["notification"],
    exact: true,
    isNotMenuItem: true,
    component: NotificationWarning
  },
  {
    path: "/notification/mail",
    label: "Notification - Mail",
    keywords: ["notification", "mail"],
    tags: ["notification"],
    exact: true,
    isNotMenuItem: true,
    component: NotificationMail
  },
];
