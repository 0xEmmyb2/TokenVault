"use client";

import { useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ICO_ABI, ICO_ADDRESS } from "@/constants/web3";
import { parseEther } from "viem";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TrendingUp, AlertTriangle, Wallet } from "lucide-react";

export const AdminPanel = () => {
  const [newPrice, setNewPrice] = useState("");
  
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });

  // Notifications logic
  useEffect(() => {
    if (hash) toast.info("Transaction broadcasted to the network...");
    if (isConfirmed) {
      toast.success("Transaction Confirmed!");
      setNewPrice(""); 
    }
    if (error) toast.error(error.message.split('\n')[0]);
  }, [hash, isConfirmed, error]);

  const handleUpdatePrice = () => {
    if (!newPrice) return toast.error("Enter a price");
    writeContract({
      address: ICO_ADDRESS,
      abi: ICO_ABI,
      functionName: "updateTokenPrice",
      args: [parseEther(newPrice)],
    });
  };

  const handleWithdraw = () => {
    writeContract({
      address: ICO_ADDRESS,
      abi: ICO_ABI,
      functionName: "withdrawAllTokens",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      
      {/* CARD 1: Price Management */}
      <Card className="bg-[#0B0B0F] border-white/5 hover:border-[#45ef56]/30 transition-colors">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="p-2 bg-[#45ef56]/10 rounded-lg">
            <TrendingUp className="text-[#45ef56]" size={20} />
          </div>
          <CardTitle>ICO Pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Adjust the ETH price per token. This updates live for all buyers.
          </p>
          <div className="space-y-2">
            <input 
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="New price in ETH (e.g. 0.005)"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:ring-1 focus:ring-[#45ef56] outline-none"
            />
          </div>
          <Button 
            onClick={handleUpdatePrice} 
            disabled={isPending || isConfirming}
            className="w-full bg-[#45ef56] text-black hover:bg-[#3bd84d]"
          >
            {isPending || isConfirming ? "Processing..." : "Update Live Price"}
          </Button>
        </CardContent>
      </Card>

      {/* CARD 2: Emergency Withdrawal */}
      <Card className="bg-[#0B0B0F] border-red-500/10 hover:border-red-500/30 transition-colors">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <AlertTriangle className="text-red-500" size={20} />
          </div>
          <CardTitle>Asset Recovery</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Withdraw all unsold tokens from the contract back to your owner wallet.
          </p>
          <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10 flex items-center gap-3">
            <Wallet className="text-red-500/50" size={16} />
            <span className="text-[10px] text-red-500/70 font-mono uppercase tracking-wider">
              Authorized Owner Action Only
            </span>
          </div>
          <Button 
            onClick={handleWithdraw} 
            disabled={isPending || isConfirming}
            variant="outline"
            className="w-full border-red-500/20 text-red-500 hover:bg-red-500/10"
          >
            {isPending || isConfirming ? "Processing..." : "Withdraw Unsold Tokens"}
          </Button>
        </CardContent>
      </Card>

    </div>
  );
};