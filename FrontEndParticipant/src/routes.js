/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import SignIn from "views/SignIn.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Formation from "views/Formation.js";
import UserPage from "views/User.js";
import AjoutDocument from "views/ajoutDocument.js"
import modifierFormation  from "views/modiferFomation.js"
import Participants from "views/Participants.js";
import Accueil from "views/accueil.js"
import  DetailFormationInscrit from "views/DetailFormationInscrit.js"
import checkInscription from "views/checkInscription.js"
import FormationsInscris from "views/FormationsInscris.js"

var routes = [
  {
    path: "login",
    icon: "nc-icon nc-bank",
    component: SignIn,
    layout: "/",
  },
  {
    path: "icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/",
  },
  {
    path: "checkInscription/:id",
    name: "checkInscription",
    icon: "nc-icon nc-diamond",
    component: checkInscription,
    layout: "/",
  },
  {
    path: "formation",
    name: "Formation",
    icon: "nc-paper",
    component: Formation,
    layout: "/",
  },
  {
    path: "participants",
    name: "Participants",
    icon: "nc-paper",
    component: Participants,
    layout: "/",
  },
 
  {
    path: "notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/",
  },
  {
    path: "DetailFormationInscrit/:id",
    name: "DetailFormationInscrit",
    icon: "nc-icon nc-single-02",
    component:  DetailFormationInscrit,
    layout: "/",
  },
 
  {
    path: "user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/",
  },
  {
    path: "accueil",
    name: "Accueil",
    icon: "nc-icon nc-shop",
    component: Accueil,
    layout: "/",
  },
  {
    path: "ajoutDocument/:id",
    name: "Ajout document",
    component: AjoutDocument,
    layout: "/",
  },
  {
    path: "modifierFormation/:id",
    name: "modifier Formation",
    component: modifierFormation,
    layout: "/",
  },
  {
    path: "tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/",
  },{
    path: "FormationsInscris",
    name: "FormationsInscris",
    icon: "nc-paper",
    component: FormationsInscris,
    layout: "/",
  },
  {
    path: "typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/",
  },
 
];
export default routes;
