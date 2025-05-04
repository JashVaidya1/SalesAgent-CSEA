import { useEffect, useState } from "react";
import axios from "axios";

// MUI & Custom Components
import IconButton from "@mui/material/IconButton";
import CallIcon from "@mui/icons-material/Call";
import Tooltip from "@mui/material/Tooltip";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
const BASE_URL = "https://pitchnova.onrender.com"; 

// -------------------- Main Hook for Table Rows --------------------
function useCustomerData() {
  const [rows, setRows] = useState([]);

  // useEffect(() => {
  //   const dummyData = [
  //     {
  //       name: "Bob Smith",
  //       email: "bob@example.com",
  //       product_name: "Wireless Headphones",
  //       contactno: "1234567890",
  //       sentiment_score: 0.75,
  //       sold: "No",
  //       discount: 5,
  //       soldPrice: 25000,
  //       shortDescription: "Interested in offers for noise-canceling headphones.",
  //       datetime : "2023-23-23 12:12:12"
  //     },
  //   ];

  //   const mappedRows = dummyData.map((customer, index) => ({
  //     id: index + 1,
  //     name: (
  //       <VuiTypography variant="caption" color="white" fontWeight="medium">
  //         {customer.name}
  //       </VuiTypography>
  //     ),
  //     contactno: (
  //       <VuiTypography variant="caption" color="white" fontWeight="medium">
  //         {customer.contactno}
  //       </VuiTypography>
  //     ),
  //     product: (
  //       <VuiTypography variant="caption" color="white" fontWeight="medium">
  //         {customer.product_name}
  //       </VuiTypography>
  //     ),
  //     dateTime: (
  //       <VuiTypography variant="caption" color="white" fontWeight="medium">
  //         {customer.datetime}
  //       </VuiTypography>
  //     ),
  //     sentiment: (
  //       <VuiTypography variant="caption" color="white" fontWeight="medium">
  //         {customer.sentiment_score}
  //       </VuiTypography>
  //     ),
  //     sold: (
  //       <VuiTypography variant="caption" color="white" fontWeight="medium">
  //         {customer.sold}
  //       </VuiTypography>
  //     ),
  //     discount: (
  //       <VuiTypography variant="caption" color="white" fontWeight="medium">
  //         {customer.discount}%
  //       </VuiTypography>
  //     ),
  //     soldPrice: (
  //       <VuiTypography variant="caption" color="white" fontWeight="medium">
  //         ₹{customer.soldPrice}
  //       </VuiTypography>
  //     ),
  //     shortDescription: (
  //       <VuiTypography variant="caption" color="white" fontWeight="medium">
  //         {customer.shortDescription}
  //       </VuiTypography>
  //     ),
  //   }));

  //   setRows(mappedRows);
  // }, []);

  useEffect(() => {
     axios.get(`${BASE_URL}/calls/getallcalls`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false, 
    })
      .then((response) => {
        const customerData = response.data;
        console.log("Fetched data:", customerData);
  
        const mappedRows = customerData.map((customer, index) => ({
          id: index + 1,
          name: (
            <VuiTypography variant="caption" color="white" fontWeight="medium">
              {customer.name}
            </VuiTypography>
          ),
          contactno: (
            <VuiTypography variant="caption" color="white" fontWeight="medium">
              {customer.contactno}
            </VuiTypography>
          ),
          product: (
            <VuiTypography variant="caption" color="white" fontWeight="medium">
              {customer.product_name}
            </VuiTypography>
          ),
          dateTime: (
            <VuiTypography variant="caption" color="white" fontWeight="medium">
              {customer.summary.datetime}
            </VuiTypography>
          ),
          sentiment: (
            <VuiTypography variant="caption" color="white" fontWeight="medium">
              {customer.summary.sentiment_score}
            </VuiTypography>
          ),
          sold: (
            <VuiTypography variant="caption" color="white" fontWeight="medium">
              {customer.summary.sold}
            </VuiTypography>
          ),
          discount: (
            <VuiTypography variant="caption" color="white" fontWeight="medium">
              {customer.summary.discount}%
            </VuiTypography>
          ),
          soldPrice: (
            <VuiTypography variant="caption" color="white" fontWeight="medium">
              ₹{customer.summary.soldPrice}
            </VuiTypography>
          ),
          shortDescription: (
            <VuiTypography variant="caption" color="white" fontWeight="medium">
              {customer.summary.shortDescription}
            </VuiTypography>
          ),
        }));
  
        setRows(mappedRows);
      })
      .catch((error) => {
        console.error("Failed to fetch customer data:", error);
      });
  }, []);
  

  return rows;
}

// -------------------- Exported TableData Function --------------------
function CustomerTableData() {
  const rows = useCustomerData();

  return {
    columns: [
      { name: "id", align: "left" },
      { name: "name", align: "left" },
      { name: "contactno", align: "center" },
      { name: "product", align: "center" },
      { name: "dateTime", align: "center" },
      { name: "sentiment", align: "center" },
      { name: "sold", align: "right" },
      { name: "discount", align: "right" },
      { name: "soldPrice", align: "right" },
      { name: "shortDescription", align: "right" },
    ],
    rows,
  };
}

export default CustomerTableData;
