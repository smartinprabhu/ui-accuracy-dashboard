
import { useEffect, useState, useRef } from "react";
import Plotly from "plotly.js-dist-min";
import { Camera, ZoomIn, PlusCircle, BarChart3, LayoutGrid, Maximize, Circle } from "lucide-react";

interface ChartProps {
  period: string;
  traces: {
    temperature: boolean;
    average: boolean;
    minimum: boolean;
    maximum: boolean;
  };
  traceColors?: {
    temperature: string;
    minimum: string;
    maximum: string;
    average: string;
  };
}

const EnergyConsumptionChart: React.FC<ChartProps> = ({ 
  period, 
  traces,
  traceColors = {
    temperature: '#FF6B4A',
    minimum: '#50C878',
    maximum: '#1E90FF',
    average: '#9370DB'
  }
}) => {
  const mainChartRef = useRef<HTMLDivElement>(null);
  const miniChartRef = useRef<HTMLDivElement>(null);
  
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
    visible: true,
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

  useEffect(() => {
    if (mainChartRef.current && miniChartRef.current) {
      renderCharts();
    }
  }, [data, traces, traceColors]);

  const renderCharts = () => {
    if (!mainChartRef.current || !miniChartRef.current) return;

    // Prepare data for consumption bars
    const times = data.map(item => item.time);
    const consumption = data.map(item => item.consumption);
    const temperatures = data.map(item => item.temperature);

    // Main chart data
    const mainChartData: Partial<Plotly.Data>[] = [
      {
        x: times,
        y: consumption,
        type: 'bar',
        name: 'Consumption (kWh)',
        marker: {
          color: '#4169E1'
        }
      }
    ];

    // Add temperature line if enabled
    if (traces.temperature) {
      mainChartData.push({
        x: times,
        y: temperatures,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Temperature (°C)',
        marker: { color: traceColors.temperature, size: 4 },
        line: { color: traceColors.temperature, width: 2 },
        yaxis: 'y2'
      });
    }

    // Add reference lines for min, max, avg if enabled
    if (traces.minimum) {
      mainChartData.push({
        x: times,
        y: Array(times.length).fill(tooltip.min),
        type: 'scatter',
        mode: 'lines',
        name: 'Minimum',
        line: { color: traceColors.minimum, width: 2, dash: 'dash' }
      });
    }

    if (traces.maximum) {
      mainChartData.push({
        x: times,
        y: Array(times.length).fill(tooltip.max),
        type: 'scatter',
        mode: 'lines',
        name: 'Maximum',
        line: { color: traceColors.maximum, width: 2, dash: 'dash' }
      });
    }

    if (traces.average) {
      mainChartData.push({
        x: times,
        y: Array(times.length).fill(tooltip.avg),
        type: 'scatter',
        mode: 'lines',
        name: 'Average',
        line: { color: traceColors.average, width: 2, dash: 'dash' }
      });
    }

    // Main chart layout
    const mainChartLayout: Partial<Plotly.Layout> = {
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      margin: { t: 10, r: 50, l: 50, b: 50 },
      height: 400,
      grid: { rows: 1, columns: 1, pattern: 'independent' },
      legend: {
        orientation: 'h',
        y: -0.2,
        x: 0.5,
        xanchor: 'center',
        font: { color: '#999' }
      },
      xaxis: {
        title: data[0]?.day || 'Mar 25, 2025',
        titlefont: { color: '#999' },
        tickfont: { color: '#999' },
        gridcolor: '#333'
      },
      yaxis: {
        title: 'Consumption (kWh)',
        titlefont: { color: '#999' },
        tickfont: { color: '#999' },
        gridcolor: '#333'
      },
      yaxis2: {
        title: 'Temperature (°C)',
        titlefont: { color: '#999' },
        tickfont: { color: '#999' },
        overlaying: 'y',
        side: 'right'
      },
      annotations: []
    };

    // Add annotations for reference lines if enabled
    if (traces.minimum) {
      mainChartLayout.annotations!.push({
        x: times[times.length - 1],
        y: tooltip.min,
        xref: 'x',
        yref: 'y',
        text: 'Min',
        showarrow: false,
        font: { color: traceColors.minimum },
        xanchor: 'left'
      });
    }

    if (traces.maximum) {
      mainChartLayout.annotations!.push({
        x: times[times.length - 1],
        y: tooltip.max,
        xref: 'x',
        yref: 'y',
        text: 'Max',
        showarrow: false,
        font: { color: traceColors.maximum },
        xanchor: 'left'
      });
    }

    if (traces.average) {
      mainChartLayout.annotations!.push({
        x: times[times.length - 1],
        y: tooltip.avg,
        xref: 'x',
        yref: 'y',
        text: 'Avg',
        showarrow: false,
        font: { color: traceColors.average },
        xanchor: 'left'
      });
    }

    // Mini chart data
    const miniChartData: Partial<Plotly.Data>[] = [
      {
        x: times,
        y: consumption,
        type: 'bar',
        name: 'Consumption',
        marker: { color: '#4169E1' },
        showlegend: false,
        hoverinfo: 'none'
      }
    ];

    if (traces.temperature) {
      miniChartData.push({
        x: times,
        y: temperatures,
        type: 'scatter',
        mode: 'lines',
        name: 'Temperature',
        line: { color: traceColors.temperature, width: 1 },
        showlegend: false,
        hoverinfo: 'none'
      });
    }

    // Mini chart layout
    const miniChartLayout: Partial<Plotly.Layout> = {
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      margin: { t: 0, r: 30, l: 30, b: 0 },
      height: 75,
      showlegend: false,
      xaxis: {
        showticklabels: false,
        showgrid: false
      },
      yaxis: {
        showticklabels: false,
        showgrid: false
      }
    };

    // Config options for both charts
    const config: Partial<Plotly.Config> = {
      displayModeBar: false,
      responsive: true
    };

    // Render both charts
    Plotly.newPlot(mainChartRef.current, mainChartData, mainChartLayout, config);
    Plotly.newPlot(miniChartRef.current, miniChartData, miniChartLayout, config);
  };

  return (
    <div className="h-[500px] relative">
      <div ref={mainChartRef} className="h-[85%]"></div>
      
      {tooltip.visible && (
        <div className="absolute top-10 right-10 bg-black border border-gray-700 p-2 rounded text-xs text-white">
          <p className="text-white">Max: {tooltip.max} (24 Mar 25, 02 PM)</p>
          <p className="text-white">Min: {tooltip.min} (24 Mar 25, 09 PM)</p>
          <p className="text-white">Avg: {tooltip.avg}</p>
          <p className="text-white">Peak Hour: {tooltip.peak}</p>
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
      <div ref={miniChartRef} className="h-[15%] mt-1"></div>
    </div>
  );
};

export default EnergyConsumptionChart;
