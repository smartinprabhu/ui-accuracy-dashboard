
import React from "react";
import { Info } from "lucide-react";

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
          className={`flex items-center bg-[#323548] p-2 rounded-md cursor-pointer`}
          onClick={() => toggleTrace('temperature')}
        >
          <div className={`w-4 h-4 rounded-full bg-red-500 mr-2`}></div>
          <span className="text-gray-300 text-sm">Temperature</span>
        </div>
        
        <div 
          className={`flex items-center bg-[#323548] p-2 rounded-md cursor-pointer`}
          onClick={() => toggleTrace('minimum')}
        >
          <div className={`w-4 h-4 rounded-full bg-green-500 mr-2`}></div>
          <span className="text-gray-300 text-sm">Minimum</span>
        </div>
        
        <div 
          className={`flex items-center bg-[#323548] p-2 rounded-md cursor-pointer`}
          onClick={() => toggleTrace('average')}
        >
          <div className={`w-4 h-4 rounded-full bg-purple-500 mr-2`}></div>
          <span className="text-gray-300 text-sm">Average</span>
        </div>
        
        <div 
          className={`flex items-center bg-[#323548] p-2 rounded-md cursor-pointer`}
          onClick={() => toggleTrace('maximum')}
        >
          <div className={`w-4 h-4 rounded-full bg-blue-500 mr-2`}></div>
          <span className="text-gray-300 text-sm">Maximum</span>
        </div>
      </div>
    </div>
  );
};

export default VisualizationControls;
