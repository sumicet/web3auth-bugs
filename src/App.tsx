import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function App() {
    const { isConnected, address, isConnecting } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();

    return (
        <>
            <h1>wagmi + web3auth modal</h1>

            {!isConnected ? (
                <button onClick={() => connect({ connector: connectors[0] })}>
                    {isConnecting ? 'Loading...' : 'Connect'}
                </button>
            ) : (
                <button onClick={() => disconnect()}>Disconnect</button>
            )}
        </>
    );
}
