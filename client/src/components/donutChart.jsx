import { Pie } from 'react-chartjs-2'; // Use 'Doughnut' instead of 'DonutChart' if available
import { 
    Chart as ChartJS, 
    ArcElement, 
    Tooltip, 
    Legend ,
} from 'chart.js';    
    export function DonutChartComponent({val1, val2, Bgs,  brs,  className}){
    ChartJS.register(ArcElement, Tooltip, Legend);

            const data = {
      labels: val1,
      datasets: [
        {
          label: 'Students counts',
          data: val2,
          backgroundColor: Bgs,
                borderColor: brs,
          borderWidth: 1,
        },
      ],
    };

    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: true,          // Ensure it's visible
            position: 'bottom',     // Place it at the bottom
            align: 'center',        // Center the whole legend block
            labels: {
                padding: 20,        // Add more space between legend items
                font: {
                    size: 14,       // Increase the font size
                },
                usePointStyle: true, // Use a circle icon instead of a box
            }
        },
          title: {
            display: true,
            text: 'My Bar Chart',
          },
        },
      };

        return(
        <div className={`flex items-center justify-between rounded-2xl  shadow-md  shadow-gray-200 dark:shadow-gray-500 p-5 transition hover:shadow-lg ${className}`}>
    
                <Pie
                className=""
                   data={data}
                   options={options} 
                />
                    

        </div>)
}