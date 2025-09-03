import React from 'react';
import { Button } from "@/components/ui/button";

interface ActionsProps {
  ticketType: string;
  onCheckout: (forceConvert?: boolean) => void;
  isCheckoutLoading: boolean;
}

const Actions: React.FC<ActionsProps> = ({
  ticketType,
  onCheckout,
  isCheckoutLoading
}) => {
  return (
    <div className="flex items-center justify-end gap-4 pt-6 border-t border-[#29382f]">
      {/* Convert to Visitor Button */}
      {ticketType === "subscriber" && (
        <Button
          variant="outline"
          className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500 transition-all duration-200 bg-transparent"
          onClick={() => onCheckout(true)}
          disabled={isCheckoutLoading}
        >
          Convert to Visitor
        </Button>
      )}
      <Button
        onClick={() => onCheckout(false)}
        disabled={isCheckoutLoading}
        className="bg-gradient-to-r from-[#38e07b] to-[#2dd968] hover:from-[#2dd968] hover:to-[#38e07b] text-black font-bold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-[#38e07b]/25"
      >
        {isCheckoutLoading ? "Processing..." : "Confirm Checkout"}
      </Button>
    </div>
  );
};

export default Actions;