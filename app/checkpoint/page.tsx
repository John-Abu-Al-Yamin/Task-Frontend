"use client";
import { useState, useEffect } from "react";
import ProtectedRoute from "../src/components/ProtectedRoute";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import {
  useGetTicketQuery,
  useCheckoutMutation,
  useGetSubscriptionQuery,
} from "../src/services/api";
import Tabs from "../src/components/checkpoint/Tabs";
import TicketInput from "../src/components/checkpoint/TicketInput";
import TicketDetails from "../src/components/checkpoint/TicketDetails";
import SubscriptionDetails from "../src/components/checkpoint/SubscriptionDetails";
import Actions from "../src/components/checkpoint/Actions";
import InvoiceDetails from "../src/components/checkpoint/InvoiceDetails";

const formatCurrency = (amount: number) => {
  return `$${amount.toFixed(2)}`;
};

const Checkpoint = () => {
  const [activeTab, setActiveTab] = useState<"visitor" | "subscriber">(
    "visitor"
  );

  // فصل input عن query
  const [ticketInput, setTicketInput] = useState("");
  const [ticketToFetch, setTicketToFetch] = useState("");

  const [invoiceData, setInvoiceData] = useState<any>(null);

  const {
    data: ticket,
    isLoading,
    isError,
  } = useGetTicketQuery(ticketToFetch, {
    skip: !ticketToFetch,
  });

  const subscriptionId = ticket?.subscriptionId ?? "";

  const {
    data: subscription,
    isLoading: isSubscriptionLoading,
    isError: isSubscriptionError,
  } = useGetSubscriptionQuery(subscriptionId, {
    skip: !subscriptionId,
  });

  const [checkout, { isLoading: isCheckoutLoading }] = useCheckoutMutation();

  useEffect(() => {
    if (ticket?.subscriptionId && !subscription && !isSubscriptionLoading) {
      // Subscription will be automatically fetched by the query hook
      console.log(
        "[v0] Ticket has subscription ID, fetching subscription data..."
      );
    }
  }, [ticket?.subscriptionId, subscription, isSubscriptionLoading]);

  useEffect(() => {
    if (ticket) {
      setActiveTab(ticket.type as "visitor" | "subscriber");
    }
  }, [ticket]);

  const handleFetch = () => {
    if (!ticketInput) return;
    setTicketToFetch(ticketInput);
  };

  const handleCheckout = async (forceConvert?: boolean) => {
    const currentTicketId = ticket?.id ?? ticketToFetch;
    if (!currentTicketId) return;

    try {
      const res = await checkout({
        ticketId: currentTicketId,
        forceConvertToVisitor: forceConvert,
      }).unwrap();

      setInvoiceData(res);

      toast.success("Checkout done ✅", {
        description: `Ticket ${
          res.ticketId
        } checked out. Amount: ${formatCurrency(res.amount)}`,
      });
    } catch (err: any) {
      console.log(err);
      toast.error("Checkout failed ❌", {
        description: err?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <ProtectedRoute allowedRoles={["employee"]}>
      <div className="min-h-screen bg-gradient-to-br from-[#0a0f0c] via-[#0f1611] to-[#0a0f0c] p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-[#38e07b] to-[#2dd968] rounded-xl flex items-center justify-center shadow-lg shadow-[#38e07b]/20">
              <Sparkles className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Checkpoint
            </h1>
          </div>

          {/* Card */}
          <Card className="bg-[#0a0f0c]/80 border-[#29382f] backdrop-blur-sm shadow-2xl">
            {/* Tabs */}
            <CardHeader className="pb-6">
              <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
            </CardHeader>

            {/* Content */}
            <CardContent className="space-y-8">
              {/* Ticket ID Input */}
              <TicketInput
                ticketInput={ticketInput}
                setTicketInput={setTicketInput}
                onFetch={handleFetch}
                isLoading={isLoading}
              />

              {/* Ticket Details */}
              {ticket && !isError && (
                <>
                  <TicketDetails ticket={ticket} />

                  {/* Subscription Details */}
                  {ticket.subscriptionId && (
                    <SubscriptionDetails
                      subscription={subscription as any} 
                      ticketPlateNumber={ticket.plateNumber}
                      isSubscriptionLoading={isSubscriptionLoading}
                      isSubscriptionError={isSubscriptionError}
                    />
                  )}

                  {/* Actions */}
                  <Actions
                    ticketType={ticket.type}
                    onCheckout={handleCheckout}
                    isCheckoutLoading={isCheckoutLoading}
                  />
                </>
              )}

              {/* Invoice Details */}
              <InvoiceDetails invoiceData={invoiceData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Checkpoint;
