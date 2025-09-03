import React from "react";

interface TabsProps {
  activeTab: "visitor" | "subscriber";
  onTabChange: (tab: "visitor" | "subscriber") => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-[#29382f]">
      <nav aria-label="Tabs" className="-mb-px flex space-x-8">
        <button
          onClick={() => onTabChange("visitor")}
          className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-base transition-colors ${
            activeTab === "visitor"
              ? "border-[#38e07b] text-[#38e07b]"
              : "border-transparent text-[#9eb7a8] hover:text-[#38e07b] hover:border-[#38e07b]/50"
          }`}
        >
          Visitor
        </button>
        <button
          onClick={() => onTabChange("subscriber")}
          className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-base transition-colors ${
            activeTab === "subscriber"
              ? "border-[#38e07b] text-[#38e07b]"
              : "border-transparent text-[#9eb7a8] hover:text-[#38e07b] hover:border-[#38e07b]/50"
          }`}
        >
          Subscriber
        </button>
      </nav>
    </div>
  );
};

export default Tabs;
