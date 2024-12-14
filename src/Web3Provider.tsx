import { ReactNode } from "react"; 
import { WagmiProvider, createConfig, http } from 'wagmi'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'; 
import { mainnet, sepolia} from 'wagmi/chains';  

const config = createConfig(
  getDefaultConfig({
    chains: [mainnet, sepolia], 
    transports: {
      [mainnet.id]: http(mainnet.rpcUrls.default.http[0]),
      [sepolia.id]: http(sepolia.rpcUrls.default.http[0]),
   
    },
    walletConnectProjectId: '5d73160471ad9e4c0707a901a089044c',
    appName: 'Your App Name',
  })
);

const queryClient = new QueryClient();  

export const Web3Provider = ({ children }: { children: ReactNode }) => {   
  return (     
    <WagmiProvider config={config}>       
      <QueryClientProvider client={queryClient}>         
        <ConnectKitProvider>{children}</ConnectKitProvider>       
      </QueryClientProvider>     
    </WagmiProvider>   
  ); 
};