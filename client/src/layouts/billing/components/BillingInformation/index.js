import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import Bill from "layouts/billing/components/Bill";

function BillingInformation() {
  return (
    <Card id="call-summary-card" sx={{ width: '100%' }}>
      <VuiBox px={3} py={2}>
        <VuiTypography variant="h4" color="white" fontWeight="bold">
          Call Summary
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Bill
            name="Oliver Liam"
            contactNo="123-456-7890"
            product="Viking Burrito"
            sentiment="0.84"
            sold={true}
            discount={15}
            shortDescription="Customer showed great interest in the product."
            soldPrice={2999}
            dateTime="2025-04-20 10:30 AM"
          />
          <Bill
            name="Lucas Harper"
            contactNo="987-654-3210"
            product="Stone Tech Zone"
            sentiment="0.55"
            sold={false}
            discount={5}
            shortDescription="Customer asked for more details but didn't purchase."
            soldPrice={0}
            dateTime="2025-04-19 5:30 PM"
          />
          <Bill
            name="Ethan James"
            contactNo="555-555-5555"
            product="Fiber Notion"
            sentiment="0.25"
            sold={false}
            discount={20}
            shortDescription="Customer was not satisfied with the offer."
            soldPrice={0}
            dateTime="2025-04-18 12:00 PM"
            noGutter
          />
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default BillingInformation;