
export const lineChartDataDashboard = [
  {
    name: "Mobile apps",
    data: [1000, 250, 300, 220, 500, 250, 300, 230, 300, 350, 250, 400],
  },
  {
    name: "Websites",
    data: [200, 230, 300, 350, 370, 420, 550, 350, 400, 500, 330, 550],
  },
];


// lineChartDataDashboard.js

// import axios from 'axios';

// const fetchLineChartData = async () => {
//   try {
//     const response = await axios.get('https://giant-ducks-report.loca.lt/summaryData', {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       withCredentials: false,
//     });

//     const data = response.data;

//     // Initialize arrays for each laptop
//     const laptopXData = Array(12).fill(0);
//     const laptopYData = Array(12).fill(0);

//     data.forEach((entry) => {
//       if (entry.sold === 1) {
//         const date = new Date(entry.datetime);
//         const month = date.getMonth(); // 0 for January, 11 for December

//         if (entry.product_name === 'Laptop X') {
//           laptopXData[month]++;
//         } else if (entry.product_name === 'Laptop Y') {
//           laptopYData[month]++;
//         }
//       }
//     });

//     return [
//       {
//         name: 'Laptop X',
//         data: laptopXData,
//       },
//       {
//         name: 'Laptop Y',
//         data: laptopYData,
//       },
//     ];
//   } catch (error) {
//     console.error('Error fetching line chart data:', error);
//     return [
//       {
//         name: 'Laptop X',
//         data: Array(12).fill(1),
//       },
//       {
//         name: 'Laptop Y',
//         data: Array(12).fill(1),
//       },
//     ];
//   }
// };

// export default fetchLineChartData;
