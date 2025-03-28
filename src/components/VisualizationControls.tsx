
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
  traceColors?: {
    temperature: string;
    minimum: string;
    maximum: string;
    average: string;
  };
  onColorChange?: (trace: string, color: string) => void;
}

const VisualizationControls: React.FC<VisualizationControlsProps> = ({ 
  traces, 
  setTraces, 
  traceColors = {
    temperature: '#FF6B4A',
    minimum: '#50C878',
    maximum: '#1E90FF',
    average: '#9370DB'
  },
  onColorChange 
}) => {
  const toggleTrace = (trace: keyof typeof traces) => {
    setTraces(prev => ({
      ...prev,
      [trace]: !prev[trace]
    }));
  };

  const handleColorChange = (trace: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (onColorChange) {
      onColorChange(trace, e.target.value);
    }
  };

  return (
    <div className="bg-[#242836] p-4 rounded-lg mb-4">
      <h3 className="text-gray-300 text-lg font-medium mb-4">Visualization Controls</h3>
      
      <div className="grid grid-cols-1 gap-3">
        <div 
          className={`flex items-center justify-between ${traces.temperature ? 'bg-[#1a1c28]' : 'bg-[#323548]'} p-3 rounded-md cursor-pointer border ${traces.temperature ? 'border-red-500' : 'border-transparent'}`}
          onClick={() => toggleTrace('temperature')}
        >
          <div className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full mr-2" 
              style={{ backgroundColor: traces.temperature ? traceColors.temperature : '#6b7280' }}
            ></div>
            <span className="text-gray-300 text-sm flex items-center">
              <Thermometer size={14} className="mr-1" />
              Temperature
            </span>
          </div>
          {traces.temperature && onColorChange && (
            <div className="flex items-center relative">
              <input 
                type="color" 
                value={traceColors.temperature}
                onChange={(e) => handleColorChange('temperature', e)}
                onClick={e => e.stopPropagation()}
                className="absolute opacity-0 w-6 h-6 cursor-pointer"
              />
              <div 
                className="w-6 h-6 rounded-full cursor-pointer" 
                style={{ backgroundColor: traceColors.temperature }}
              ></div>
            </div>
          )}
        </div>
        
        <div 
          className={`flex items-center justify-between ${traces.minimum ? 'bg-[#1a1c28]' : 'bg-[#323548]'} p-3 rounded-md cursor-pointer border ${traces.minimum ? 'border-green-500' : 'border-transparent'}`}
          onClick={() => toggleTrace('minimum')}
        >
          <div className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full mr-2" 
              style={{ backgroundColor: traces.minimum ? traceColors.minimum : '#6b7280' }}
            ></div>
            <span className="text-gray-300 text-sm flex items-center">
              <TrendingDown size={14} className="mr-1" />
              Minimum
            </span>
          </div>
          {traces.minimum && onColorChange && (
            <div className="flex items-center relative">
              <input 
                type="color" 
                value={traceColors.minimum}
                onChange={(e) => handleColorChange('minimum', e)}
                onClick={e => e.stopPropagation()}
                className="absolute opacity-0 w-6 h-6 cursor-pointer"
              />
              <div 
                className="w-6 h-6 rounded-full cursor-pointer" 
                style={{ backgroundColor: traceColors.minimum }}
              ></div>
            </div>
          )}
        </div>
        
        <div 
          className={`flex items-center justify-between ${traces.average ? 'bg-[#1a1c28]' : 'bg-[#323548]'} p-3 rounded-md cursor-pointer border ${traces.average ? 'border-purple-500' : 'border-transparent'}`}
          onClick={() => toggleTrace('average')}
        >
          <div className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full mr-2" 
              style={{ backgroundColor: traces.average ? traceColors.average : '#6b7280' }}
            ></div>
            <span className="text-gray-300 text-sm flex items-center">
              <Activity size={14} className="mr-1" />
              Average
            </span>
          </div>
          {traces.average && onColorChange && (
            <div className="flex items-center relative">
              <input 
                type="color" 
                value={traceColors.average}
                onChange={(e) => handleColorChange('average', e)}
                onClick={e => e.stopPropagation()}
                className="absolute opacity-0 w-6 h-6 cursor-pointer"
              />
              <div 
                className="w-6 h-6 rounded-full cursor-pointer" 
                style={{ backgroundColor: traceColors.average }}
              ></div>
            </div>
          )}
        </div>
        
        <div 
          className={`flex items-center justify-between ${traces.maximum ? 'bg-[#1a1c28]' : 'bg-[#323548]'} p-3 rounded-md cursor-pointer border ${traces.maximum ? 'border-blue-500' : 'border-transparent'}`}
          onClick={() => toggleTrace('maximum')}
        >
          <div className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full mr-2" 
              style={{ backgroundColor: traces.maximum ? traceColors.maximum : '#6b7280' }}
            ></div>
            <span className="text-gray-300 text-sm flex items-center">
              <TrendingUp size={14} className="mr-1" />
              Maximum
            </span>
          </div>
          {traces.maximum && onColorChange && (
            <div className="flex items-center relative">
              <input 
                type="color" 
                value={traceColors.maximum}
                onChange={(e) => handleColorChange('maximum', e)}
                onClick={e => e.stopPropagation()}
                className="absolute opacity-0 w-6 h-6 cursor-pointer"
              />
              <div 
                className="w-6 h-6 rounded-full cursor-pointer" 
                style={{ backgroundColor: traceColors.maximum }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualizationControls;
