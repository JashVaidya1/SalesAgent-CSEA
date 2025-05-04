// React and State Management
import React, { useEffect, useState } from "react";

// MUI Components
import Grid from "@mui/material/Grid";
import { Card, LinearProgress, Stack } from "@mui/material";

// Icons
import { IoIosRocket } from "react-icons/io";
import { IoGlobe, IoBuild, IoWallet, IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

// Theme and UI Utilities
import colors from "assets/theme/base/colors";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Layout Containers
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Cards
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

// Dashboard Components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";
import Sentiment from "layouts/dashboard/components/Sentiment";

// Chart Components and Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";

// Axios for API requests
import axios from "axios";

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;

  const [summaryData, setSummaryData] = useState([]);
  const [totalInventorySold, setTotalInventorySold] = useState(0);
  const [totalUsersContacted, setTotalUsersContacted] = useState(0);
  const [averageDiscount, setAverageDiscount] = useState(0);
  const [totalSoldCurrentMonth, setTotalSoldCurrentMonth] = useState(0);

  useEffect(() => {
    axios
      .get("https://pitchnova.onrender.com/api/v1/calls/getallcalls", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      })
      .then((response) => {
        const data = response.data;
        setSummaryData(data);

        // ntory Sold
        const inventorySold = data.filter((item) => item.summary.sold === 1).length;
        setTotalInventorySold(inventorySold);

        // Total Users Contacted
        setTotalUsersContacted(data.length);

        // Average Discount Given
        const totalDiscount = data.reduce((acc, item) => acc + (item.summary.discount || 0), 0);
        const avgDiscount = data.length > 0 ? totalDiscount / data.length : 0;
        setAverageDiscount(avgDiscount.toFixed(2));

        // Total Sold in Current Month
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const totalSold = data.reduce((acc, item) => {
          const itemDate = new Date(item.datetime);
          if (
            item.summary.sold === 1 &&
            itemDate.getMonth() === currentMonth &&
            itemDate.getFullYear() === currentYear
          ) {
            return acc + (item.summary.soldPrice || 0);
          }
          return acc;
        }, 0);
        setTotalSoldCurrentMonth(totalSold.toFixed(2));
      })
      .catch((error) => {
        console.error("Error fetching summary data:", error);
      });
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
      <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Inventory Sold", fontWeight: "regular" }}
                count={totalInventorySold}
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Users Contacted" }}
                count={totalUsersContacted}
                icon={{ color: "info", component: <IoGlobe size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Average Discount Given (%)" }}
                count={`${averageDiscount}%`}
                icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Sold This Month (₹)" }}
                count={`₹${totalSoldCurrentMonth}`}
                icon={{ color: "info", component: <FaShoppingCart size="20px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox>


        {/* <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total inventry sold", fontWeight: "regular" }}
                count="$53,000"
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's users" }}
                count="2,300"
                icon={{ color: "info", component: <IoGlobe size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "total clients" }}
                count="+3,462"
                icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "total sales" }}
                count="$103,430"
                icon={{ color: "info", component: <FaShoppingCart size="20px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox> */}


        <VuiBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ReferralTracking />
          </Grid>
          <Grid item xs={12} md={6}>
            <Sentiment />
          </Grid>
        </Grid>
      </VuiBox>

        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={7}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Sales Overview
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      +5% more{" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        in 2024
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                    <LineChart
                      lineChartData={lineChartDataDashboard}
                      lineChartOptions={lineChartOptionsDashboard}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
              <Card>
                <VuiBox>
                  <VuiBox
                    mb="24px"
                    height="220px"
                    sx={{
                      background: linearGradient(
                        cardContent.main,
                        cardContent.state,
                        cardContent.deg
                      ),
                      borderRadius: "20px",
                    }}
                  >
                    <BarChart
                      barChartData={barChartDataDashboard}
                      barChartOptions={barChartOptionsDashboard}
                    />
                  </VuiBox>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Active Users
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      (+23){" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        than last week
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
        
      </VuiBox>
    </DashboardLayout>
  );
}

export default Dashboard;
