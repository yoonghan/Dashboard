`use strict`

import * as React from 'react';
import Setting from "../components/routable/Setting";
import Home from "../components/routable/Home";
import Inventory from "../components/routable/Inventory";
import ServerInfo from "../components/routable/ServerInfo";

export interface RouteModal {
  path: string;
  label: string;
  keywords: Array<string>;
  tags: Array<string>;
  exact?: boolean;
  component: React.ComponentType<any>;
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
];
