import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Mail, Play, CheckCircle, Loader2, Moon, Sun, Terminal, Square } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [emailCount, setEmailCount] = useState(5);
  const [logs, setLogs] = useState([]);
  const [resultsData, setResultsData] = useState([]);

  // ඔයාගේ අලුත් Replit ලින්ක් එක මෙතන තියෙන්නේ
  const BASE_URL = "https://625c2dd5-4267-4bfd-8be0-37723d364f59-00-3rpkswq2be1v.pike.replit.dev:8080";

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`${BASE_URL}/status`);
          const data = await res.json();
          setLogs(data.logs);
          setResultsData(data.results);
          if (!data.is_running && data.logs.length > 0) {
            setLoading(false);
            setShowResults(true);
            clearInterval(interval);
          }
        } catch (error) {
          console.error("Status fetching error");
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const startAssistant = async (e) => {
    e.preventDefault();
    setShowResults(false);
    setLoading(true);
    setLogs(["Connecting to Digital Nexa Engine..."]);
    setResultsData([]);

    try {
      await fetch(`${BASE_URL}/start-assistant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: "Hotels & Resorts", location: "Maldives", emailCount: parseInt(emailCount) }),
      });
    } catch (error) {
      alert("Backend error. Please check if Replit is running.");
      setLoading(false);
    }
  };

  const stopAssistant = async () => {
    try {
      await fetch(`${BASE_URL}/stop-assistant`, { method: "POST" });
      setLogs(prev => [...prev, "🛑 Stopping campaign... Please wait."]);
    } catch (error) {
      console.error("Error stopping");
    }
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 p-8 font-sans transition-colors duration-300">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-neutral-800 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-neutral-50">Digital Nexa Assistant</h1>
              <p className="text-slate-500 dark:text-neutral-400 mt-2">Automated Lead Generation & Pitching System</p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsDark(!isDark)} className="p-3 bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 rounded-xl hover:bg-slate-200 dark:hover:bg-neutral-700">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex items-center gap-3">
                <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600 dark:bg-blue-500"></span></span>
                <span className="text-blue-700 dark:text-blue-400 font-medium">System Online</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-neutral-800">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-neutral-50 mb-6 flex items-center gap-2"><Search className="w-5 h-5 text-blue-600 dark:text-blue-500" /> නව සෙවුමක්</h2>
              <form onSubmit={startAssistant} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2 flex items-center gap-2"><Briefcase className="w-4 h-4" /> ක්ෂේත්‍රය</label>
                  <select className="w-full p-3 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-700 text-slate-800 dark:text-neutral-200 rounded-lg outline-none"><option>Hotels & Resorts</option></select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2 flex items-center gap-2"><MapPin className="w-4 h-4" /> ස්ථානය</label>
                  <select className="w-full p-3 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-700 text-slate-800 dark:text-neutral-200 rounded-lg outline-none"><option>Maldives</option></select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2 flex items-center gap-2"><Mail className="w-4 h-4" /> දිනකට යවන ඊමේල් ගණන</label>
                  <input type="number" value={emailCount} onChange={(e) => setEmailCount(e.target.value)} min="1" max="50" className="w-full p-3 bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-700 text-slate-800 dark:text-neutral-200 rounded-lg outline-none" />
                </div>
                {!loading ? (
                  <button type="submit" className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 mt-4">
                    <Play className="w-5 h-5 fill-current" /> Assistant ක්‍රියාත්මක කරන්න
                  </button>
                ) : (
                  <button type="button" onClick={stopAssistant} className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 mt-4">
                    <Square className="w-5 h-5 fill-current" /> නවත්වන්න (Stop)
                  </button>
                )}
              </form>
            </div>

            <div className="md:col-span-2 bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-neutral-800 flex flex-col">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-neutral-50 mb-6 flex items-center gap-2"><Terminal className="w-5 h-5" /> Live System Feed</h2>
              {!loading && !showResults && (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-neutral-600">
                  <Search className="w-16 h-16 mb-4 opacity-20" />
                  <p>Assistant ක්‍රියාත්මක කර ඊමේල් යැවීම අරඹන්න</p>
                </div>
              )}
              {(loading || showResults) && (
                <div className="flex-1 flex flex-col mb-6">
                  <div className="bg-slate-950 rounded-xl p-4 font-mono text-sm h-64 overflow-y-auto border border-slate-800 shadow-inner flex flex-col gap-2">
                    {logs.map((log, index) => (
                      <div key={index} className="text-green-400">
                        <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span> <span className={log.includes("Waiting") ? "text-yellow-400" : log.includes("🛑") ? "text-red-400" : ""}>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {showResults && resultsData.length > 0 && (
                <div className="overflow-x-auto border border-slate-200 dark:border-neutral-800 rounded-lg">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-neutral-950/50 text-slate-600 dark:text-neutral-400 border-b border-slate-200 dark:border-neutral-800">
                      <tr><th className="p-4">සමාගම</th><th className="p-4">ඊමේල්</th><th className="p-4">තත්ත්වය</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-neutral-800">
                      {resultsData.map((res, i) => (
                        <tr key={i} className="hover:bg-slate-50 dark:hover:bg-neutral-800/50">
                          <td className="p-4 font-medium text-slate-800 dark:text-neutral-200">{res.company}</td>
                          <td className="p-4 text-slate-600 dark:text-neutral-400">{res.email}</td>
                          <td className="p-4"><span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 px-2 py-1 rounded text-xs font-semibold">{res.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;