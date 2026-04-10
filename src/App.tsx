import { useTonConnectUI } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Telegram?: any;
  }
}

function App() {
  const [tonConnectUI] = useTonConnectUI();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Paksa Telegram buka full screen
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.MainButton.setText("🌾 Panen Sekarang");
      window.Telegram.WebApp.MainButton.show();
    }

    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      setConnected(!!wallet);
    });
    return () => unsubscribe();
  }, [tonConnectUI]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <h1 className="text-5xl font-bold text-yellow-300 text-center mb-8">Harvestia</h1>
      <p className="text-center text-green-400 text-xl mb-10">Farm Real TON</p>

      {!connected ? (
        <button
          onClick={() => tonConnectUI.openModal()}
          className="w-full py-6 bg-emerald-600 rounded-3xl text-xl font-bold"
        >
          Connect TON Wallet
        </button>
      ) : (
        <div className="text-center">
          <div className="text-7xl mb-6">🌾🌽🐮</div>
          <p className="text-2xl font-medium">Farming UI Ready!</p>
          <p className="text-green-400 mt-4">Wallet Connected ✅</p>
        </div>
      )}
    </div>
  );
}

export default App;
