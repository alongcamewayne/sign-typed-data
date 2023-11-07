import './App.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSignTypedData } from 'wagmi';

const domain = {
	name: 'Ether Mail',
	chainId: 1,
} as const;

const types = {
	Person: [
		{ name: 'name', type: 'string' },
		{ name: 'wallet', type: 'address' },
	],
	Mail: [
		{ name: 'from', type: 'Person' },
		{ name: 'to', type: 'Person' },
		{ name: 'contents', type: 'string' },
	],
} as const;

const message = {
	from: {
		name: 'Cow',
		wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
	},
	to: {
		name: 'Bob',
		wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
	},
	contents: 'Hello, Bob!',
} as const;

function App() {
	const { address } = useAccount();
	const {
		data: signature,
		isLoading,
		signTypedData,
	} = useSignTypedData({
		domain,
		message,
		primaryType: 'Mail',
		types,
	});

	return (
		<div className="flex min-h-screen items-center justify-center p-10">
			<div className="flex max-w-lg flex-col items-center gap-5 break-all">
				<ConnectButton />

				<button
					onClick={() => signTypedData()}
					disabled={!address || isLoading}
					className="w-fit rounded-xl bg-zinc-900 px-5 py-2 text-white transition disabled:cursor-not-allowed disabled:opacity-40">
					Sign Message
				</button>

				<p>{signature}</p>
			</div>
		</div>
	);
}

export default App;
