import React, { memo } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import NotFound from "../common/NotFound";

/*
 * This is the route utility component used for generating
 * routes and child routes it only requires routes array and basePath
 */
function MapAllowedRoutes({ routes, basePath, isAddNotFound }) {
  const match = useRouteMatch(basePath);
  return (
    <Switch>
      {routes.map((route) => {
        const {
          path,
          component: Component,
          children,
          title,
          permission,
          ...rest
        } = route;
        return (
          <Route {...rest} key={path} path={`${match.path}${path}`}>
            <Component children={children} {...rest} />
          </Route>
        );
      })}
      {isAddNotFound && (
        <Route>
          <NotFound />
        </Route>
      )}
    </Switch>
  );
}

export default memo(MapAllowedRoutes);
