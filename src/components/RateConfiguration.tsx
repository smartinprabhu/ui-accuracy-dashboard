
import { useState } from "react";

const RateConfiguration = () => {
  const [cost, setCost] = useState("0.12");
  const [carbon, setCarbon] = useState("0.63");

  return (
    <div className="bg-[#242836] p-4 rounded-lg">
      <h3 className="text-gray-300 text-lg font-medium mb-4">Rate Configuration</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Cost /kW (Rs.)</span>
          <div className="flex items-center w-24">
            <input
              type="text"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="w-full bg-[#323548] text-white text-sm text-right border border-gray-700 p-1 rounded"
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Carbon emission / kW</span>
          <div className="flex items-center w-24">
            <input
              type="text"
              value={carbon}
              onChange={(e) => setCarbon(e.target.value)}
              className="w-full bg-[#323548] text-white text-sm text-right border border-gray-700 p-1 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateConfiguration;
