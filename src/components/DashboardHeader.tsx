
import React from "react";

interface DashboardHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ["Descriptive", "Diagnostic", "Predictive", "Prescriptive"];
  
  return (
    <header className="bg-[#372f9e] px-6 py-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-white">ENERGY</h1>
      <div className="flex space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md text-sm ${
              activeTab === tab ? "bg-black text-white" : "bg-gray-600 text-gray-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </header>
  );
};

export default DashboardHeader;
