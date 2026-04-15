import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { toast } from "sonner";

export function WalletConnect() {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState<string>("");

  // Check if wallet is already connected
  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          await getBalance(accounts[0]);
        }
      } catch (error) {
        console.error("[v0] Error checking wallet:", error);
      }
    }
  };

  const getBalance = async (address: string) => {
    if (!window.ethereum) return;

    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });
      // Convert from Wei to ETH
      const ethBalance = (parseInt(balance, 16) / 1e18).toFixed(4);
      setBalance(ethBalance);
    } catch (error) {
      console.error("[v0] Error getting balance:", error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask not installed. Please install MetaMask.");
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        await getBalance(accounts[0]);
        toast.success(`Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
      }
    } catch (error) {
      console.error("[v0] Wallet connection error:", error);
      toast.error("Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance("");
    toast.success("Wallet disconnected");
  };

  return (
    <div className="flex items-center gap-2">
      {account ? (
        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
          <Wallet className="h-4 w-4 text-blue-600" />
          <div className="text-sm">
            <p className="font-semibold text-blue-900">
              {account.slice(0, 6)}...{account.slice(-4)}
            </p>
            {balance && <p className="text-xs text-blue-600">{balance} ETH</p>}
          </div>
          <button
            onClick={disconnectWallet}
            className="text-xs text-blue-600 hover:text-blue-800 ml-2"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <Button
          onClick={connectWallet}
          disabled={isConnecting}
          size="sm"
          className="gap-2"
        >
          <Wallet className="h-4 w-4" />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}
    </div>
  );
}

// Extend window interface for MetaMask
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<any>;
      on?: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener?: (event: string, callback: (...args: unknown[]) => void) => void;
    };
  }
}
