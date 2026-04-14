import React, { useState, useEffect, useRef } from 'react';

// අලුත් Hugging Face Backend Link එක
const BASE_URL = "https://sgrlvijerathna-nexa-backend.hf.space";

export default function App() {
  const [niche, setNiche] = useState("Hotels & Resorts");
  const [location, setLocation] = useState("Maldives");
  const [emailCount, setEmailCount] = useState(5);
  
  const [status, setStatus] = useState({ is_running: false, logs: [], results: [] });
  const [error, setError] = useState(null);
  const logsEndRef = useRef(null);

  const fetchStatus = async () => {
    try {
      const res = await fetch(`${BASE_URL}/status`);
      if (!res.ok) throw new Error("Backend error");
      const data = await res.json();
      setStatus(data);
      setError(null);
    } catch (err) {
      setError("Backend error. Please check if Hugging Face Space is running.");
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [status.logs]);

  const handleStart = async () => {
    try {
      const res = await fetch(`${BASE_URL}/start-assistant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, location, emailCount: parseInt(emailCount) })
      });
      if (!res.ok) throw new Error("Failed to start");
      fetchStatus();
    } catch (err) {
      alert("Error starting campaign: " + err.message);
    }
  };

  const handleStop = async () => {
    try {
      await fetch(`${BASE_URL}/stop-assistant`, { method: "POST" });
      fetchStatus();
    } catch (err) {
      alert("Error stopping campaign");
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-gray-200 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 flex justify-between items-center shadow-lg">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Digital Nexa Assistant</h1>
            <p className="text-gray-400">Automated Lead Generation & Pitching Engine</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`px-4 py-2 rounded-full flex items-center space-x-2 border ${status.is_running ? 'bg-blue-900/30 border-blue-500 text-blue-400' : 'bg-gray-800 border-gray-600 text-gray-300'}`}>
              <div className={`w-3 h-3 rounded-full ${status.is_running ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="font-medium">{status.is_running ? 'System Running' : 'System Online'}</span>
            </div>
          </div>
        </div>

        {/* Error Popup */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg flex justify-between items-center">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)} className="bg-red-800 px-3 py-1 rounded text-sm hover:bg-red-700">OK</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Controls Section (Left Side) */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 shadow-lg h-fit">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              🔍 නව සෙවුමක්
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-400 mb-2">💼 ක්ෂේත්‍රය (Niche)</label>
                <select value={niche} onChange={(e) => setNiche(e.target.value)} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all">
                  <option value="Hotels & Resorts">Hotels & Resorts</option>
                  <option value="Real Estate Developers">Real Estate Developers</option>
                  <option value="Architecture Firms">Architecture Firms</option>
                  <option value="Travel & Tour Agencies">Travel & Tour Agencies</option>
                  <option value="Luxury Spas & Wellness">Luxury Spas & Wellness</option>
                  <option value="Private Yacht Charters">Private Yacht Charters</option>
                  <option value="Fine Dining Restaurants">Fine Dining Restaurants</option>
                  <option value="Corporate Event Planners">Corporate Event Planners</option>
                  <option value="Premium Car Rentals">Premium Car Rentals</option>
                  <option value="Boutique Law Firms">Boutique Law Firms</option>
                  <option value="Wealth Management Firms">Wealth Management Firms</option>
                  <option value="High-End Interior Designers">High-End Interior Designers</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">📍 ස්ථානය (Location)</label>
                <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all">
                  <option value="Maldives">Maldives</option>
                  <option value="Dubai, UAE">Dubai, UAE</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Doha, Qatar">Doha, Qatar</option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Mauritius">Mauritius</option>
                  <option value="Bali, Indonesia">Bali, Indonesia</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Monaco">Monaco</option>
                  <option value="London, UK">London, UK</option>
                  <option value="New York, USA">New York, USA</option>
                  <option value="Paris, France">Paris, France</option>
                  <option value="Tokyo, Japan">Tokyo, Japan</option>
                  <option value="Sydney, Australia">Sydney, Australia</option>
                  <option value="Toronto, Canada">Toronto, Canada</option>
                  <option value="Berlin, Germany">Berlin, Germany</option>
                  <option value="Rome, Italy">Rome, Italy</option>
                  <option value="Barcelona, Spain">Barcelona, Spain</option>
                  <option value="Amsterdam, Netherlands">Amsterdam, Netherlands</option>
                  <option value="Stockholm, Sweden">Stockholm, Sweden</option>
                  <option value="Copenhagen, Denmark">Copenhagen, Denmark</option>
                  <option value="Riyadh, Saudi Arabia">Riyadh, Saudi Arabia</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">✉️ දිනකට යවන ඊමේල් ගණන</label>
                <input 
                  type="number" 
                  value={emailCount} 
                  onChange={(e) => setEmailCount(e.target.value)} 
                  min="1" 
                  max="50"
                  className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div className="pt-4">
                {!status.is_running ? (
                  <button onClick={handleStart} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <span>▶️ Assistant ක්‍රියාත්මක කරන්න</span>
                  </button>
                ) : (
                  <button onClick={handleStop} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <span>⏹️ නවත්වන්න (Stop)</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Terminal / Logs Section (Right Side) */}
          <div className="md:col-span-2 bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              &gt;_ Live System Feed
            </h2>
            <div className="bg-[#050505] border border-gray-800 rounded-lg p-4 font-mono text-sm overflow-y-auto h-[400px] flex-grow">
              {status.logs.length === 0 ? (
                <div className="text-gray-500 italic">Waiting for command... System idle.</div>
              ) : (
                <div className="space-y-2">
                  {status.logs.map((log, index) => (
                    <div key={index} className="text-green-400 break-words">
                      <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span> {log}
                    </div>
                  ))}
                  <div ref={logsEndRef} />
                </div>
              )}
            </div>

            {/* Results Counter */}
            <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center text-sm text-gray-400">
              <div>Successfully Sent: <span className="text-white font-bold">{status.results.filter(r => r.status === "Sent").length}</span></div>
              <div>Total Scanned: <span className="text-white font-bold">{status.results.length}</span></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
