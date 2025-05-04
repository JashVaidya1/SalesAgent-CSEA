import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Chats from "layouts/chats";
import { BsCreditCardFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { IoHome } from "react-icons/io5";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
  },
  
  {
    type: "collapse",
    name: "Customers",
    key: "customers",
    route: "/customers",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Tables,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Call Summary",
    key: "callsummary",
    route: "/callsummary",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    component: Billing,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Chats",
    key: "chats",
    route: "/chats",
    icon: <IoHome size="15px" color="inherit" />,
    component: Chats, 
    noCollapse: true,
  }
 
];

export default routes;
