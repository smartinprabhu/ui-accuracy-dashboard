
import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import KPICards from "@/components/KPICards";
import EnergyConsumptionChart from "@/components/EnergyConsumptionChart";
import VisualizationControls from "@/components/VisualizationControls";
import KeyMetrics from "@/components/KeyMetrics";
import RateConfiguration from "@/components/RateConfiguration";
import Footer from "@/components/Footer";

const Index = () => {
  const [activeTab, setActiveTab] = useState("Descriptive");
  const [activePeriod, setActivePeriod] = useState("Day");
  const [traces, setTraces] = useState({
    temperature: true,
    average: true,
    minimum: true,
    maximum: true,
  });
  
  const [traceColors, setTraceColors] = useState({
    temperature: '#FF6B4A',
    minimum: '#50C878',
    maximum: '#1E90FF',
    average: '#9370DB'
  });

  const handleColorChange = (trace: string, color: string) => {
    setTraceColors(prev => ({
      ...prev,
      [trace]: color
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1f2c]">
      <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="p-4 flex-grow">
        <KPICards />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
          <div className="lg:col-span-3 bg-[#242836] rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-gray-300 text-xl font-semibold">Energy Consumption Trend</h2>
              <div className="flex space-x-2">
                <button 
                  className={`px-4 py-1 rounded-md text-sm ${activePeriod === "Day" ? "bg-black text-white" : "bg-gray-700 text-gray-300"}`}
                  onClick={() => setActivePeriod("Day")}
                >
                  Day
                </button>
                <button 
                  className={`px-4 py-1 rounded-md text-sm ${activePeriod === "Week" ? "bg-black text-white" : "bg-gray-700 text-gray-300"}`}
                  onClick={() => setActivePeriod("Week")}
                >
                  Week
                </button>
                <button 
                  className={`px-4 py-1 rounded-md text-sm ${activePeriod === "Month" ? "bg-black text-white" : "bg-gray-700 text-gray-300"}`}
                  onClick={() => setActivePeriod("Month")}
                >
                  Month
                </button>
                <button 
                  className={`px-4 py-1 rounded-md text-sm ${activePeriod === "Year" ? "bg-black text-white" : "bg-gray-700 text-gray-300"}`}
                  onClick={() => setActivePeriod("Year")}
                >
                  Year
                </button>
              </div>
            </div>
            <EnergyConsumptionChart 
              period={activePeriod} 
              traces={traces} 
            />
          </div>
          
          <div className="lg:col-span-1">
            <VisualizationControls 
              traces={traces} 
              setTraces={setTraces} 
              traceColors={traceColors}
              onColorChange={handleColorChange}
            />
            <KeyMetrics />
            <RateConfiguration />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
