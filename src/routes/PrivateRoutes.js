import React, { Fragment } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { getAllowedRoutes, isLoggedIn } from '../utils';
import PrivateRoutesConfig  from '../config/PrivateRoutesConfig';
import TopNav from './TopNav';
import MapAllowedRoutes from './MapAllowedRoutes';

function PrivateRoutes() {
 const match = useRouteMatch('/app');
 let allowedRoutes = [];

 if (isLoggedIn()) {
   allowedRoutes = getAllowedRoutes(PrivateRoutesConfig);
 } else {
   return <Redirect to="/" />;
 }

 return (
  <Fragment>
   <TopNav 
     routes={allowedRoutes} 
     path={match.path}
   >
    <MapAllowedRoutes 
      routes={allowedRoutes} 
      basePath="/app" 
      isAddNotFound 
    />
   </TopNav>
  </Fragment>
 );
}

export default PrivateRoutes;
