import { Connector, configureChains, createConfig } from 'wagmi';
import { goerli, mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { web3AuthConnector } from './connector';

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, ...(import.meta.env?.MODE === 'development' ? [goerli] : [])],
    [publicProvider()]
);

export const config = createConfig({
    autoConnect: true,
    connectors: [web3AuthConnector(chains) as unknown as Connector],
    // connectors: [new InjectedConnector()],
    publicClient,
    webSocketPublicClient,
});
