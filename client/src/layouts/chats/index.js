import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";

// Data
import CustomerTableData from "layouts/chats/data/authorsTableData.js";
const BASE_URL = "https://pitchnova.onrender.com/api/v1"; 

function Tables() {
  // State for chat modal
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [callId, setCallId] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: "Customer",
    id: null
  });

  const handleOpenChat = useCallback((id) => {
    console.log("hello button clicked!!", id);
    setCallId(id);
    setOpen(true);
    
    // Set loading state
    setLoading(true);
    setError(null);
    
    fetchChatData(id);
  }, []);
  const fetchChatData = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/calls/getallcalls`);
      console.log("all calls data is: ", response);
      const callData = response.data.find(call => call.callid === id);
      console.log("call data is: ", callData);
      if (callData) {
        const formattedMessages = callData.chats.map((chat, index) => ({
          id: index, 
          sender: chat.role, 
          message: chat.content,
          timestamp: new Date(callData.datetime).toLocaleTimeString() 
        }));
        

        setChatMessages(formattedMessages);
        setCustomerInfo({
          name: callData.name || "Customer",
          id: callData.userid || null
        });
      } else {
        setChatMessages([]);
        setError("No chat data found for this call.");
      }
    } catch (err) {
      console.error("Failed to fetch chat data:", err);
      setError("Failed to load chat data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Use useCallback for handleClose to prevent recreation on each render
  const handleClose = useCallback(() => {
    setOpen(false);
    setError(null);
    // Don't reset messages and callId immediately for better UX
  }, []);

  // Get table data ONCE with memoized handlers
  const tableData = CustomerTableData(handleOpenChat);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={0}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="lg" color="white">
                Customer Chats
              </VuiTypography>
            </VuiBox>
            <VuiBox
              sx={{
                "& th": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                      `${borderWidth[1]} solid ${grey[700]}`,
                  },
                },
                "& .MuiTableRow-root": {
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                },
              }}
            >
              <Table 
                columns={tableData.columns} 
                rows={tableData.rows}
                entriesPerPage={{ defaultValue: 5, entries: [5, 10, 15, 20] }}
                // Use inline function that just calls memoized handler to prevent recreation
                onRowClick={(rowIndex) => {
                  const id = tableData.rows[rowIndex].callId;
                  if (id) {
                    handleOpenChat(id);
                  }
                }}
              />
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>

      {/* Chat Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="chat-modal-title"
        aria-describedby="chat-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '900px',
            height: '90%',
            bgcolor: '#0f1535', // Dark background matching theme
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Chat Header */}
          <VuiBox 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            px={3} 
            py={2}
            sx={{
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <VuiBox display="flex" alignItems="center">
              <VuiTypography variant="lg" color="white" fontWeight="bold">
                {customerInfo.name}
              </VuiTypography>
              <VuiTypography 
                variant="caption" 
                color="text"
                sx={{ ml: 2, opacity: 0.7 }}
              >
                Call ID: {callId}
              </VuiTypography>
            </VuiBox>
            <IconButton 
              onClick={handleClose} 
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </VuiBox>
          
          {/* Chat Messages Container */}
          <VuiBox
            sx={{
              flexGrow: 1,
              overflow: 'auto',
              py: 2,
              px: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              backgroundColor: 'transparent',
            }}
          >
            {loading ? (
              <VuiBox display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress color="info" />
              </VuiBox>
            ) : error ? (
              <VuiBox display="flex" justifyContent="center" alignItems="center" height="100%">
                <VuiTypography color="error" variant="button">
                  {error}
                </VuiTypography>
              </VuiBox>
            ) : chatMessages.length > 0 ? (
              <>
                {/* Date Separator */}
                <VuiBox
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    my: 2,
                  }}
                >
                  <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <VuiTypography 
                    variant="caption" 
                    color="text" 
                    sx={{ px: 2, opacity: 0.7 }}
                  >
                    Today
                  </VuiTypography>
                  <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                </VuiBox>
                
                {/* Chat Messages */}
                {chatMessages.map((message) => (
                  <VuiBox
                    key={message.id}
                    sx={{
                      display: 'flex',
                      justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                      width: '100%',
                    }}
                  >
                    <VuiBox
                      sx={{
                        maxWidth: '70%',
                        borderRadius: message.sender === 'user' 
                          ? '16px 16px 0 16px'  // User message shape
                          : '16px 16px 16px 0', // System message shape
                        padding: '12px 16px',
                        backgroundColor: message.sender === 'user' 
                          ? '#0075ff' // Blue for user messages
                          : 'rgba(52, 71, 103, 0.7)', // Darker gray with transparency for system
                        boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <VuiTypography variant="button" color="white">
                        {message.message}
                      </VuiTypography>
                      <VuiTypography 
                        variant="caption" 
                        color="text" 
                        sx={{ 
                          display: 'block', 
                          textAlign: message.sender === 'user' ? 'right' : 'left', 
                          mt: 1,
                          opacity: 0.7,
                          fontSize: '10px'
                        }}
                      >
                        {message.timestamp}
                      </VuiTypography>
                    </VuiBox>
                  </VuiBox>
                ))}
              </>
            ) : (
              <VuiBox display="flex" justifyContent="center" alignItems="center" height="100%">
                <VuiTypography color="text" variant="button">
                  No messages to display
                </VuiTypography>
              </VuiBox>
            )}
          </VuiBox>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default Tables;