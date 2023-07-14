import { Web3Auth } from '@web3auth/modal';
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector';
import { Chain } from 'wagmi';

export const web3AuthConnector = (chains: Chain[]) => {
    const web3AuthInstance = new Web3Auth({
        clientId:
            'BKfeYPuAvJ8FLsk3fWbJm4YtC6FOgJX_7Lerg7Pe-B5JgBHgiDbdwdUpi8OLGbMB3OTPiRlTw3fj1L-CKd9zNAI', // Should be in an .env file, but I won't do that for this example since I'm not going to use this key for anything else
        web3AuthNetwork: 'testnet', // Should change according to environment
        chainConfig: {
            chainNamespace: 'eip155',
            chainId: `0x${chains[0].id.toString(16)}`,
        },
        uiConfig: {
            theme: 'dark',
            loginMethodsOrder: ['google', 'discord', 'github', 'twitter', 'twitch'],
            appLogo: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
        },
        enableLogging: false,
        sessionTime: 86400, // 24 hours
        // sessionTime: 5, // 5 seconds
    });

    return new Web3AuthConnector({
        options: {
            web3AuthInstance,
        },
        chains: [
            {
                id: chains[0].id,
                name: chains[0].name,
                rpcUrls: {
                    default: {
                        http: [chains[0].rpcUrls.default.http[0]],
                    },
                    public: {
                        http: [chains[0].rpcUrls.public.http[0]],
                    },
                },
                nativeCurrency: {
                    name: chains[0].nativeCurrency.name,
                    symbol: chains[0].nativeCurrency.symbol,
                    decimals: chains[0].nativeCurrency.decimals,
                },
                network: chains[0].network,
            },
        ],
    });
};
