import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../component/login";
import NotFound from "../common/NotFound";

function PublicRoutes() {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default PublicRoutes;
