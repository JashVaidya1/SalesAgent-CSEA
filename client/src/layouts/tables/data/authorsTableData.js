import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // UUID for generating unique call IDs

import IconButton from "@mui/material/IconButton";
import CallIcon from "@mui/icons-material/Call";
import Tooltip from "@mui/material/Tooltip";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

const BASE_URL = "https://pitchnova.onrender.com/api/v1"; 

// -------------------- Author Component --------------------
function Author({ name, email }) {
  return (
    <VuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {name}
        </VuiTypography>
        <VuiTypography variant="caption" color="text">
          {email}
        </VuiTypography>
      </VuiBox>
    </VuiBox>
  );
}

// -------------------- Interest Summary --------------------
function InterestWithSummary({ summary }) {
  return (
    <VuiBox display="flex" flexDirection="column">
      <VuiTypography variant="caption" color="text">
        {summary}
      </VuiTypography>
    </VuiBox>
  );
}

// -------------------- Call Status --------------------
function CallStatus({ status }) {
  return (
    <VuiBox mt={1} pl={1} style={{ backgroundColor: "#333", padding: "10px", borderRadius: "15px" }}>
      <VuiTypography variant="caption" color="white">
        {status}
      </VuiTypography>
    </VuiBox>
  );
}

// -------------------- Main Hook for Table Rows --------------------
function useCustomerData() {
  const [rows, setRows] = useState([]);
  const [customersData, setCustomersData] = useState([]);

  // -------------------- Call Button --------------------
  function CallButton({ customerdata }) {
    const [callStatus, setCallStatus] = useState(null);

    const handleCall = async () => {
      try {
        // eslint-disable-next-line no-undef
        const customer = customerdata || customersData.find(c => c._id === customerId);
        console.log("customer call click on: ", customerdata); 
        
        if (!customer) {
          console.error("Customer not found");
          setCallStatus("Error: Customer data not found");
          setTimeout(() => setCallStatus(null), 3000);
          return;
        }
    
        const callId = uuidv4();
        const currentDateTime = new Date().toISOString();

        const response1 = await axios.get(`${BASE_URL}/laptops/getalllaptops`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }); 
    
        const laptop_data = response1.data; 
    
        const callData = {
          callid: callId,
          contactno: customer.contactno,
          datetime: currentDateTime,
          name: customer.name,
          product_name: "laptop",
          userid: customer._id,
          last_call_summary: customer.last_call_summary,
          laptop_data: laptop_data, 
        };

        const callData1 = {
          callid: callId,
          contactno: customer.contactno,
          datetime: currentDateTime,
          name: customer.name,
          product_name: "laptop",
          userid: customer._id,
          last_call_summary: customer.last_call_summary,
        };
    
        setCallStatus("📞 Call initiated...");

        // const response5 = await axios.post(`${BASE_URL}/calls/create-new-call`, callData1, {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });

        // console.log("new Call object initiated..", response5.data);

        // const response = await axios.post(`https://3b50-14-139-196-234.ngrok-free.app/start-call`, callData, {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });

        // console.log("✅ Call created:", response.data);
        // setCallStatus("✅ Call in progress...");

        try {
          const response5 = await axios.post(`${BASE_URL}/calls/create-new-call`, callData1, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        
          console.log("🟢 New Call object initiated:", response5.data);
        
          if (response5.status === 200 || response5.status === 201) {
            const response = await axios.post(`https://3b50-14-139-196-234.ngrok-free.app/start-call`, callData, {
              headers: {
                "Content-Type": "application/json",
              },
            });
        
            console.log("✅ Call created:", response.data);
            setCallStatus("✅ Call in progress...");
          } else {
            console.error("❌ Failed to create call object, skipping start-call");
            setCallStatus("Error: Call object not created.");
          }
        
        } catch (error) {
          console.error("💥 Error during call creation/start:", error.message);
          setCallStatus("Call failed, please try again.");
          setTimeout(() => setCallStatus(null), 3000); // Hide error
        }
        
    
       
        
    
      } catch (error) {
        console.error("Call creation failed:", error);
        setCallStatus("Call failed, please try again.");
        setTimeout(() => setCallStatus(null), 3000); // Hide error status
      }
    };
    

    return (
      <VuiBox>
        <Tooltip title="Call Customer">
          <IconButton onClick={handleCall} size="small" sx={{ color: "#ffffffb3" }}>
            <CallIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {callStatus && <CallStatus status={callStatus} />}
      </VuiBox>
    );
  }

  useEffect(() => {
    const dummyCustomers = [
      {
        _id: "dummy_id_1",
        name: "Alice Johnson",
        email: "alice@example.com",
        contactno: "9876543210",
        last_call_summary: "Interested in new laptops with higher RAM."
      },
      {
        _id: "dummy_id_2",
        name: "Bob Smith",
        email: "bob@example.com",
        contactno: "1234567890",
        last_call_summary: "Looking for deals on noise-canceling headphones."
      },
    ];

    setCustomersData(dummyCustomers);

    const dummyRows = dummyCustomers.map((customer) => ({
      author: <Author name={customer.name} email={customer.email} />,
      lastcallsummary: <InterestWithSummary summary={customer.last_call_summary} />,
      contactno: (
        <VuiTypography variant="caption" color="white" fontWeight="medium">
          {customer.contactno}
        </VuiTypography>
      ),
      call: <CallButton customerdata={customer} />,
      callStatus: <CallStatus status="No call initiated yet." />,
    }));

    setRows(dummyRows);

    // Fetch real customer data from API
    axios.get(`${BASE_URL}/customers/getallcustomers`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false,
    })
    .then((response) => {
      const customerData = response.data;
      console.log("Fetched data:", customerData); 

      setCustomersData(prev => [...prev, ...customerData]);

      const apiRows = customerData.map((customer) => ({
        author: <Author name={customer.name} email={customer.email} />,
        lastcallsummary: (
          <InterestWithSummary summary={customer.last_call_summary || "No recent call info available."} />
        ),
        contactno: (
          <VuiTypography variant="caption" color="white" fontWeight="medium">
            {customer.contactno}
          </VuiTypography>
        ),
        call: <CallButton customerdata={customer} />,
        callStatus: <CallStatus status="No call initiated yet." />,
      }));

      setRows(prev => [...prev, ...apiRows]);
    })
    .catch((error) => {
      console.error("Failed to fetch customer data:", error);
    });

  }, []);

  return { rows, customersData };
}

// -------------------- Exported TableData Function --------------------
function CustomerTableData() {
  const { rows, customersData } = useCustomerData();

  return {
    columns: [
      { name: "author", align: "left" },
      { name: "lastcallsummary", align: "left" },
      { name: "contactno", align: "center" },
      { name: "call", align: "center" },
      { name: "callStatus", align: "center" },
    ],
    rows,
    customersData,
  };
}

export default CustomerTableData;
