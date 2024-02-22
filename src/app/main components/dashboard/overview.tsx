import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jul',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Aug',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Sep',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Oct',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Nov',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Dec',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];
interface DataItem {
  month: string;
  total: number;
}

interface OverviewProps {
  data: DataItem[];
}
export function Overview({ data }: OverviewProps) {
    const prepareDataWithAllMonths = (inputData: DataItem[]): DataItem[] => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "Augst", "September", "October", "November", "December"];
        const dataWithAllMonths = monthNames.map(month => ({
          month: month,
          total: 0 // Initialize all months with 0 total
        }));
      
        inputData.forEach(item => {
          const monthIndex = monthNames.indexOf(item.month);
          if (monthIndex !== -1) {
            // Update the total for months that have data
            dataWithAllMonths[monthIndex].total = item.total;
          }
        });
      
        return dataWithAllMonths;
      };
      const procesData = prepareDataWithAllMonths(data);
      console.log('procesData',procesData);
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={procesData}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `£${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
