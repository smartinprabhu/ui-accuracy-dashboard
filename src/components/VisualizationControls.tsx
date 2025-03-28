
import React from "react";
import { Thermometer, TrendingDown, TrendingUp, Activity } from "lucide-react";

interface VisualizationControlsProps {
  traces: {
    temperature: boolean;
    average: boolean;
    minimum: boolean;
    maximum: boolean;
  };
  setTraces: React.Dispatch<React.SetStateAction<{
    temperature: boolean;
    average: boolean;
    minimum: boolean;
    maximum: boolean;
  }>>;
}

const VisualizationControls: React.FC<VisualizationControlsProps> = ({ traces, setTraces }) => {
  const toggleTrace = (trace: keyof typeof traces) => {
    setTraces(prev => ({
      ...prev,
      [trace]: !prev[trace]
    }));
  };

  return (
    <div className="bg-[#242836] p-4 rounded-lg mb-4">
      <h3 className="text-gray-300 text-lg font-medium mb-4">Visualization Controls</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <div 
          className={`flex items-center ${traces.temperature ? 'bg-[#1a1c28]' : 'bg-[#323548]'} p-2 rounded-md cursor-pointer border ${traces.temperature ? 'border-red-500' : 'border-transparent'}`}
          onClick={() => toggleTrace('temperature')}
        >
          <div className={`w-4 h-4 rounded-full ${traces.temperature ? 'bg-red-500' : 'bg-gray-500'} mr-2`}></div>
          <span className="text-gray-300 text-sm flex items-center">
            <Thermometer size={14} className="mr-1" />
            Temperature
          </span>
        </div>
        
        <div 
          className={`flex items-center ${traces.minimum ? 'bg-[#1a1c28]' : 'bg-[#323548]'} p-2 rounded-md cursor-pointer border ${traces.minimum ? 'border-green-500' : 'border-transparent'}`}
          onClick={() => toggleTrace('minimum')}
        >
          <div className={`w-4 h-4 rounded-full ${traces.minimum ? 'bg-green-500' : 'bg-gray-500'} mr-2`}></div>
          <span className="text-gray-300 text-sm flex items-center">
            <TrendingDown size={14} className="mr-1" />
            Minimum
          </span>
        </div>
        
        <div 
          className={`flex items-center ${traces.average ? 'bg-[#1a1c28]' : 'bg-[#323548]'} p-2 rounded-md cursor-pointer border ${traces.average ? 'border-purple-500' : 'border-transparent'}`}
          onClick={() => toggleTrace('average')}
        >
          <div className={`w-4 h-4 rounded-full ${traces.average ? 'bg-purple-500' : 'bg-gray-500'} mr-2`}></div>
          <span className="text-gray-300 text-sm flex items-center">
            <Activity size={14} className="mr-1" />
            Average
          </span>
        </div>
        
        <div 
          className={`flex items-center ${traces.maximum ? 'bg-[#1a1c28]' : 'bg-[#323548]'} p-2 rounded-md cursor-pointer border ${traces.maximum ? 'border-blue-500' : 'border-transparent'}`}
          onClick={() => toggleTrace('maximum')}
        >
          <div className={`w-4 h-4 rounded-full ${traces.maximum ? 'bg-blue-500' : 'bg-gray-500'} mr-2`}></div>
          <span className="text-gray-300 text-sm flex items-center">
            <TrendingUp size={14} className="mr-1" />
            Maximum
          </span>
        </div>
      </div>
    </div>
  );
};

export default VisualizationControls;
