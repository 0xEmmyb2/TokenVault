import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useICO } from "../hooks/useVault.ts";
import { formatUnits } from "viem";

export const TokenPurchase = () => {
  const { icoData, buyTokens } = useICO();

  return (
    <Card className="bg-[#0B0B0F] border-white/5">
      <CardHeader>
        <CardTitle>Purchase {icoData?.symbol || "Tokens"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-gray-400 text-sm">Current Price</p>
            <h2 className="text-3xl font-bold text-white">
              {icoData ? formatUnits(icoData.price, 18) : "0.00"} ETH
            </h2>
          </div>

          <Button
            onClick={() => buyTokens("1000000000000000")} // Example 0.001 ETH
            variant="primary"
          >
            Buy Now
          </Button>
        </div>

        <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-3 gap-4">
          <div>
            <p className="text-gray-500 text-xs uppercase">Liquidity</p>
            <p className="text-white font-mono">
              {icoData ? formatUnits(icoData.liquidity, icoData.decimals) : "0"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase">Total Sold</p>
            <p className="text-white font-mono">
              {icoData ? formatUnits(icoData.totalSold, icoData.decimals) : "0"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
