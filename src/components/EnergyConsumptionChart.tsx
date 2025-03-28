
import { useEffect, useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Line, 
  ComposedChart 
} from "recharts";
import { Camera, ZoomIn, PlusCircle, BarChart3, LayoutGrid, Maximize, Circle } from "lucide-react";

interface ChartProps {
  period: string;
  traces: {
    temperature: boolean;
    average: boolean;
    minimum: boolean;
    maximum: boolean;
  };
}

const EnergyConsumptionChart: React.FC<ChartProps> = ({ period, traces }) => {
  // Generate hourly data for the current day
  const generateHourlyData = () => {
    const data = [];
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    for (let i = 0; i < 24; i++) {
      const hour = i;
      const consumption = Math.floor(Math.random() * 400) + 100;
      const temperature = Math.floor(Math.random() * 15) + 15;

      const hourFormat = hour.toString().padStart(2, '0') + ':00';
      const dayFormat = 'Mar ' + (date.getDate() + (hour >= 0 ? 0 : 1)) + ', 2025';

      data.push({
        time: hourFormat,
        day: dayFormat,
        consumption: consumption,
        temperature: temperature
      });
    }
    return data;
  };

  const [data, setData] = useState(generateHourlyData());
  const [tooltip, setTooltip] = useState({
    visible: false,
    max: 0,
    min: 0,
    avg: 0,
    peak: ""
  });

  useEffect(() => {
    // Update tooltip data
    const consumptionValues = data.map(item => item.consumption);
    const max = Math.max(...consumptionValues);
    const min = Math.min(...consumptionValues);
    const avg = Math.round(consumptionValues.reduce((a, b) => a + b, 0) / consumptionValues.length * 100) / 100;
    
    const maxIndex = consumptionValues.indexOf(max);
    const peakHour = data[maxIndex]?.time || "";
    
    setTooltip({
      visible: true,
      max,
      min,
      avg,
      peak: peakHour
    });
  }, [data]);

  return (
    <div className="h-[500px] relative">
      <ResponsiveContainer width="100%" height="85%">
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis 
            dataKey="time" 
            stroke="#666" 
            tick={{ fill: '#999' }}
            label={{ 
              value: data[0]?.day || 'Mar 25, 2025', 
              position: 'insideBottom', 
              offset: -5,
              fill: '#999'
            }} 
          />
          <YAxis 
            yAxisId="left" 
            orientation="left" 
            stroke="#666" 
            tick={{ fill: '#999' }}
            label={{ 
              value: 'Consumption', 
              angle: -90, 
              position: 'insideLeft',
              fill: '#999'
            }}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            stroke="#666" 
            tick={{ fill: '#999' }}
            label={{ 
              value: 'Temperature', 
              angle: 90, 
              position: 'insideRight',
              fill: '#999'
            }}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-black border border-gray-700 p-2 rounded">
                    <p className="text-white">{`Time: ${payload[0].payload.time}`}</p>
                    <p className="text-blue-400">{`Consumption: ${payload[0].value} kWh`}</p>
                    {traces.temperature && (
                      <p className="text-orange-400">{`Temperature: ${payload[1]?.value}°C`}</p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend iconType="circle" />
          <Bar yAxisId="left" dataKey="consumption" name="Consumption (1D)" fill="#4169E1" barSize={20} />
          {traces.temperature && <Line yAxisId="right" type="monotone" dataKey="temperature" name="Temperature (1D)" stroke="#FF6B4A" strokeWidth={2} dot={{ r: 1 }} />}
        </ComposedChart>
      </ResponsiveContainer>
      
      {tooltip.visible && (
        <div className="absolute top-10 right-10 bg-black border border-gray-700 p-2 rounded text-xs text-white">
          <p className="text-white">Max: {tooltip.max} (24 Mar 25, 02 PM)</p>
          <p className="text-white">Min: {tooltip.min} (24 Mar 25, 09 PM)</p>
          <p className="text-white">Avg: {tooltip.avg}</p>
          <p className="text-white">Peak Hour: 11 AM</p>
        </div>
      )}
      
      <div className="absolute top-3 right-3 flex space-x-2">
        <button className="text-gray-400 hover:text-white">
          <Camera size={18} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <ZoomIn size={18} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <PlusCircle size={18} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <BarChart3 size={18} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <Circle size={18} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <LayoutGrid size={18} />
        </button>
        <button className="text-gray-400 hover:text-white">
          <Maximize size={18} />
        </button>
      </div>

      {/* Secondary small chart at the bottom */}
      <div className="h-[15%] mt-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
            <Bar dataKey="consumption" fill="#4169E1" barSize={10} />
            <Line type="monotone" dataKey="temperature" stroke="#FF6B4A" strokeWidth={1} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EnergyConsumptionChart;
