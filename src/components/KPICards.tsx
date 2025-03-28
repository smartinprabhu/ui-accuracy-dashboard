
import { Zap, Target, DollarSign, CloudRain, Thermometer } from "lucide-react";

const KPICards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Total Consumption Card */}
      <div className="bg-[#242836] p-4 rounded-lg">
        <p className="text-gray-400 text-sm">Total Consumption</p>
        <div className="flex items-center my-2">
          <Zap className="text-yellow-400 mr-2" size={24} />
          <span className="text-white text-2xl font-bold">245.8 kWh</span>
        </div>
        <div className="flex items-center text-orange-500">
          <span className="text-sm">↑ 3.2%</span>
        </div>
      </div>

      {/* Energy Intensity Card */}
      <div className="bg-[#242836] p-4 rounded-lg">
        <p className="text-gray-400 text-sm">Energy Intensity</p>
        <div className="flex items-center my-2">
          <Target className="text-yellow-400 mr-2" size={24} />
          <span className="text-white text-2xl font-bold">0.42 kWh/Sqft</span>
        </div>
        <div className="flex mt-2 space-x-2">
          <button className="bg-[#323548] text-xs px-3 py-1 rounded-md text-gray-300">
            Intensity / Sqft
          </button>
          <button className="bg-[#323548] text-xs px-3 py-1 rounded-md text-gray-300">
            Intensity / Capita
          </button>
        </div>
      </div>

      {/* Total Cost Card */}
      <div className="bg-[#242836] p-4 rounded-lg">
        <p className="text-gray-400 text-sm">Total Cost</p>
        <div className="flex items-center my-2">
          <DollarSign className="text-yellow-400 mr-2" size={24} />
          <span className="text-white text-2xl font-bold">$328.45</span>
        </div>
        <div className="flex items-center text-orange-500">
          <span className="text-sm">↑ 3.2%</span>
        </div>
      </div>

      {/* CO2e Emissions Card */}
      <div className="bg-[#242836] p-4 rounded-lg">
        <p className="text-gray-400 text-sm">CO2e Emissions</p>
        <div className="flex items-center my-2">
          <CloudRain className="text-yellow-400 mr-2" size={24} />
          <span className="text-white text-2xl font-bold">0.156 tCO2e</span>
        </div>
        <div className="flex items-center text-orange-500">
          <span className="text-sm">↑ 3.2%</span>
        </div>
      </div>

      {/* Average Temperature Card */}
      <div className="bg-[#242836] p-4 rounded-lg">
        <p className="text-gray-400 text-sm">Average Temperature</p>
        <div className="flex items-center my-2">
          <Thermometer className="text-yellow-400 mr-2" size={24} />
          <span className="text-white text-2xl font-bold">25.6 °C</span>
        </div>
        <div className="flex items-center text-orange-500">
          <span className="text-sm">↑ (+1.2°C)</span>
        </div>
      </div>
    </div>
  );
};

export default KPICards;
