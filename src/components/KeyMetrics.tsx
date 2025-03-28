
import { Info } from "lucide-react";

const KeyMetrics = () => {
  const metrics = [
    { name: "Mean", value: "82.3 kWh" },
    { name: "Mean Variability", value: "±3.2 kWh" },
    { name: "Median", value: "80.1 kWh" },
    { name: "Standard Deviation", value: "12.6 kWh" },
    { name: "Range", value: "51 kWh (35-86 kWh)" },
    { name: "Skewness", value: "0.42 (Right-skewed)" },
    { name: "Kurtosis", value: "2.8 (Platykurtic)" }
  ];

  return (
    <div className="bg-[#242836] p-4 rounded-lg mb-4">
      <h3 className="text-gray-300 text-lg font-medium mb-4">Key Metrics & Insights</h3>
      
      <div className="space-y-3">
        {metrics.map((metric, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">{metric.name}</span>
            <div className="flex items-center">
              <span className="text-white text-sm mr-2">{metric.value}</span>
              <Info size={16} className="text-gray-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyMetrics;
