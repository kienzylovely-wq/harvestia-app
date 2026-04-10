import { useTonConnectUI } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';

function App() {
  const [tonConnectUI] = useTonConnectUI();
  const [connected, setConnected] = useState(false);
  const [balance] = useState(0.124);

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      setConnected(!!wallet);
    });
    return () => unsubscribe();
  }, [tonConnectUI]);

  const handleConnect = () => {
    tonConnectUI.openModal();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-8 font-sans">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <div className="pt-12 text-center">
          <h1 className="text-6xl font-bold tracking-tighter text-yellow-300">Harvestia</h1>
          <p className="text-xl text-gray-400 mt-2">Farm Real TON</p>
        </div>

        {/* Balance Card */}
        <div className="mt-10 bg-zinc-900 rounded-3xl p-8 text-center shadow-inner">
          <p className="uppercase text-xs tracking-widest text-gray-500">Your Balance</p>
          <p className="text-6xl font-semibold mt-3">
            {balance} <span className="text-3xl text-yellow-400">TON</span>
          </p>
        </div>

        {!connected ? (
          <button
            onClick={handleConnect}
            className="mt-8 w-full py-5 bg-emerald-600 hover:bg-emerald-500 transition-colors text-white text-xl font-semibold rounded-2xl shadow-lg active:scale-95"
          >
            Connect TON Wallet
          </button>
        ) : (
          <div className="mt-8">
            <div className="text-center mb-6">
              <span className="px-4 py-1.5 bg-green-900 text-green-400 text-sm rounded-full">✅ Wallet Connected</span>
            </div>

            {/* Farming UI */}
            <div className="bg-zinc-900 rounded-3xl p-6">
              <h2 className="text-center text-lg font-medium mb-6">Farm Kamu</h2>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-zinc-800 rounded-2xl p-4 flex flex-col items-center">
                  <span className="text-5xl mb-2">🌾</span>
                  <p className="font-medium text-sm">Gandum</p>
                </div>
                <div className="bg-zinc-800 rounded-2xl p-4 flex flex-col items-center">
                  <span className="text-5xl mb-2">🌽</span>
                  <p className="font-medium text-sm">Jagung</p>
                </div>
                <div className="bg-zinc-800 rounded-2xl p-4 flex flex-col items-center">
                  <span className="text-5xl mb-2">🐮</span>
                  <p className="font-medium text-sm">Sapi</p>
                </div>
              </div>

              <button 
                className="mt-8 w-full bg-yellow-400 hover:bg-yellow-300 text-black py-4 rounded-2xl font-bold text-lg active:scale-95 transition-all"
              >
                Panen & Jual (+0.035 TON)
              </button>
              
              <button className="mt-3 w-full py-4 bg-zinc-800 hover:bg-zinc-700 transition rounded-2xl font-medium">
                🛒 Shop Bibit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;