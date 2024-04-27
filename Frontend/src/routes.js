/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-circle-08",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Patients",
    icon: "ni ni-ambulance",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Doctors",
    icon: "ni ni-badge",
    component: <Profile />,
    layout: "/admin",
   
  },
  {
    path: "/Appointments",
    name: "Appointment",
    icon: "ni ni-calendar-grid-58",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Prescription",
    icon: "ni ni-single-copy-04",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Payment",
    icon: "ni ni-money-coins",
    component: <Tables/>,
    layout: "/admin",
  },
 
];
export default routes;
