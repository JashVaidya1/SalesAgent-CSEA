import { useEffect, useState } from "react";
import axios from "axios";

// MUI & Custom Components
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import IconButton from "@mui/material/IconButton";

const BASE_URL = "https://pitchnova.onrender.com/api/v1"; 


// -------------------- Main Hook for Table Rows --------------------
function useCustomerData(onChatClick) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/calls/getallcalls`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false, 
      })
      .then((response) => {
        const customerData = Array.isArray(response.data) ? response.data : [response.data];

        const mappedRows = customerData.map((customer, index) => ({
          id: (
            <VuiTypography variant="caption" color="white" fontWeight="medium">
              {index + 1}
            </VuiTypography>
          ),
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
              {new Date(customer.datetime).toLocaleString()}
            </VuiTypography>
          ),
          viewchat: (
            <IconButton 
              onClick={(e) => {
                e.stopPropagation(); // Prevent row click event
                onChatClick(customer.callid);
              }}
              sx={{ 
                p: 0.5,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <ChatBubbleOutlineIcon style={{ fontSize: "20px", color: "white" }} />
            </IconButton>
          ),
          callid: customer.callid
        }));

        setRows(mappedRows);
      })
      .catch((error) => {
        console.error("Failed to fetch customer data:", error);
      });
  }, [onChatClick]);

  return rows;
}

// -------------------- Exported TableData Function --------------------
function CustomerTableData(onChatClick) {
  const rows = useCustomerData(onChatClick);

  return {
    columns: [
      { name: "id", align: "left" },
      { name: "name", align: "left" },
      { name: "contactno", align: "center" },
      { name: "product", align: "center" },
      { name: "dateTime", align: "center" },
      { name: "viewchat", align: "center" },
    ],
    rows,
  };
}

export default CustomerTableData;
