import { routes, RouteModal } from "./sites";

export interface DomRouteModal {
  path: string,
  exact?: boolean,
  component: React.ComponentType<any>
}

export const getRouteList = ():Array<DomRouteModal> => {
  return routes
    .map((route):DomRouteModal => {
    return ({
      path: route.path,
      exact: route.exact,
      component: route.component
    })
  });
}
