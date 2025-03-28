
import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const RateConfiguration = () => {
  const [cost, setCost] = useState("0.12");
  const [carbon, setCarbon] = useState("0.63");
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Configuration Updated",
      description: `Cost: ${cost} Rs/kW, Carbon: ${carbon} /kW`,
      variant: "default",
    });
  };

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

        <Button 
          variant="default" 
          size="sm"
          className="w-full mt-3 bg-[#323548] hover:bg-[#1a1c28] text-gray-300 border border-gray-700"
          onClick={handleSave}
        >
          <Save size={14} className="mr-1" />
          Apply Changes
        </Button>
      </div>
    </div>
  );
};

export default RateConfiguration;
