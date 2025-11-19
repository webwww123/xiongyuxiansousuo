import React, { useState, useEffect, useRef } from 'react';
import { Lock, Unlock, Eye, Radio, Activity, Search, Cpu, Fingerprint, AlertTriangle, Terminal } from 'lucide-react';
import MatrixRain from './components/MatrixRain';
import CodeStream from './components/CodeStream';
import Typewriter from './components/Typewriter';

enum Stage {
  INTRO,
  SCANNING,
  ACCESS_GRANTED,
  INPUT,
  PROCESSING,
  REDIRECT
}

const App: React.FC = () => {
  const [stage, setStage] = useState<Stage>(Stage.INTRO);
  const [inputValue, setInputValue] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Intro sequence flow
  useEffect(() => {
    if (stage === Stage.INTRO) {
      const timer = setTimeout(() => setStage(Stage.SCANNING), 1500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleScanComplete = () => {
    setStage(Stage.ACCESS_GRANTED);
    setTimeout(() => setStage(Stage.INPUT), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setStage(Stage.PROCESSING);
    processFakeData();
  };

  const processFakeData = async () => {
    const fakeLogs = [
      "正在连接 Akashic (阿卡西) 记录...",
      `目标锁定: 熊雨贤 (XIONG_YUXIAN)`,
      "正在暴力破解逻辑防火墙...",
      "绕过大脑皮层防御机制...",
      "ROOT ACCESS: ACQUIRED",
      "下载神经元记忆碎片 (42TB)...",
      "正在通过量子算法解析因果律...",
      "警告: 检索到 1 个终极答案",
      "系统过载: 真相即将溢出",
      ">> 准备注入现实 <<"
    ];

    // 快速生成日志
    for (let i = 0; i < fakeLogs.length; i++) {
      // 越往后越快
      const delay = Math.max(50, 400 - i * 30);
      await new Promise(resolve => setTimeout(resolve, delay));
      setLogs(prev => [...prev, `> [SYSTEM]: ${fakeLogs[i]}`]);
    }

    await new Promise(resolve => setTimeout(resolve, 600));
    setStage(Stage.REDIRECT);
    
    setTimeout(() => {
        const query = encodeURIComponent(inputValue);
        // Redirect to Bing with dark theme
        window.location.href = `https://cn.bing.com/search?q=${query}&settheme=dark`;
    }, 3000);
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-green-500 flex flex-col items-center justify-center overflow-hidden font-mono selection:bg-green-900 selection:text-white">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <MatrixRain />
      </div>
      
      {/* Scan Line Effect (Always active) */}
      <div className="scan-line pointer-events-none"></div>
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10"></div>

      {/* Main Container */}
      <div className="z-20 w-full max-w-3xl px-4 flex flex-col items-center text-center space-y-6 relative">
        
        {/* Header / Status - Hide during Redirect to focus attention */}
        {stage !== Stage.REDIRECT && (
          <div className="absolute -top-32 md:-top-40 left-0 flex flex-col items-start text-xs md:text-sm text-green-700 font-bold tracking-widest select-none">
            <div className="flex items-center gap-2">
               <Radio className="animate-pulse w-4 h-4 text-red-500" />
               <span>SECURE CONNECTION: ENCRYPTED</span>
            </div>
            <div>ID: XIONG_YUXIAN_001</div>
            <div>STATUS: MONITORED</div>
          </div>
        )}

        {/* STAGE: INTRO */}
        {stage === Stage.INTRO && (
            <div className="animate-pulse flex flex-col items-center">
                <Lock className="w-32 h-32 mb-6 text-green-600 animate-bounce" />
                <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] text-white drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]">
                    LOCKED
                </h1>
                <p className="mt-4 text-green-700">SYSTEM INITIALIZATION...</p>
            </div>
        )}

        {/* STAGE: SCANNING */}
        {stage === Stage.SCANNING && (
          <div className="border-2 border-green-600 bg-black/90 p-8 md:p-12 rounded-sm shadow-[0_0_50px_rgba(0,255,0,0.3)] w-full relative overflow-hidden">
             <div className="absolute inset-0 bg-green-900/20 animate-pulse"></div>
             <div className="relative z-10 flex flex-col items-center">
                <Fingerprint className="w-24 h-24 text-green-400 animate-[spin_3s_linear_infinite] mb-6" />
                
                <div className="text-left font-mono text-lg space-y-2 w-full">
                   <Typewriter text="> 启动生物特征识别..." speed={15} />
                   <div className="h-2"></div>
                   <Typewriter text="> 扫描视网膜纹理..." speed={15} className="text-green-300"/>
                   <div className="h-2"></div>
                   <Typewriter text="> 匹配阿卡西数据库..." speed={15} className="text-green-300"/>
                   <div className="h-4"></div>
                   <Typewriter 
                      text="> 目标确认: 熊雨贤" 
                      speed={50} 
                      onComplete={handleScanComplete}
                      className="text-3xl font-bold text-red-500 glitch-text mt-4 bg-white/10 p-4 text-center border-2 border-red-500"
                      data-text="目标确认: 熊雨贤"
                   />
                </div>
             </div>
          </div>
        )}

        {/* STAGE: ACCESS GRANTED */}
        {stage === Stage.ACCESS_GRANTED && (
            <div className="flex flex-col items-center animate-in zoom-in duration-500">
                <Unlock className="w-32 h-32 text-green-400 mb-4" />
                <h1 className="text-5xl font-bold text-green-400 glitch-text" data-text="ACCESS GRANTED">
                    ACCESS GRANTED
                </h1>
                <p className="text-xl mt-4 text-green-200">你好，熊雨贤。</p>
                <p className="text-sm text-green-700 mt-2">系统已准备好回答你的一切问题。</p>
            </div>
        )}

        {/* STAGE: INPUT */}
        {stage === Stage.INPUT && (
          <div className="w-full animate-in fade-in duration-1000 slide-in-from-bottom-10 relative">
             
             <div className="mb-10 relative">
                <div className="absolute -inset-4 bg-green-500/10 blur-xl rounded-full animate-pulse"></div>
                <Eye className="w-20 h-20 mx-auto text-green-400 relative z-10" />
                <h2 className="text-3xl md:text-5xl font-bold glitch-text mt-6 mb-2 text-white" data-text="熊雨贤，问吧。">
                  熊雨贤，问吧。
                </h2>
                <p className="text-green-600 font-bold uppercase tracking-[0.2em] text-xs md:text-sm mt-4">
                  这里有你想知道的一切答案
                </p>
             </div>

             <form onSubmit={handleSubmit} className="w-full relative group max-w-xl mx-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                    <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="输入你的终极疑问..."
                    className="block w-full bg-black border-2 border-green-800 text-green-300 p-6 text-xl md:text-2xl outline-none focus:border-green-400 focus:shadow-[0_0_30px_rgba(0,255,0,0.5)] transition-all duration-300 placeholder-green-900 text-center font-mono rounded-lg"
                    autoFocus
                    autoComplete="off"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-800 pointer-events-none">
                        <Terminal className="w-6 h-6" />
                    </div>
                </div>
                <div className="mt-6 text-xs text-gray-500 flex justify-center items-center gap-2">
                   <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                   <span>已连接至量子核心</span>
                </div>
             </form>
          </div>
        )}

        {/* STAGE: PROCESSING */}
        {stage === Stage.PROCESSING && (
            <div className="w-full h-screen fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
                <CodeStream />
                
                <div className="z-50 w-full max-w-2xl p-4 bg-black/90 backdrop-blur-md border border-green-500/50 rounded-lg shadow-[0_0_50px_rgba(0,255,0,0.2)]">
                    <div className="flex items-center gap-4 mb-4 border-b border-green-900 pb-2">
                        <Cpu className="w-6 h-6 animate-spin text-green-400" />
                        <span className="text-lg md:text-xl font-bold animate-pulse text-green-400">CALCULATING TRUTH FOR: 熊雨贤</span>
                    </div>
                    
                    <div className="h-64 overflow-hidden flex flex-col relative font-mono text-sm md:text-base">
                        <div className="flex-1 flex flex-col justify-end space-y-1 pb-2">
                            {logs.map((log, idx) => (
                                <div key={idx} className="text-green-400/90 break-all animate-in slide-in-from-left-4 fade-in duration-100">
                                    {log}
                                </div>
                            ))}
                            <div ref={logsEndRef} />
                        </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-4 bg-green-950 mt-4 rounded border border-green-800 overflow-hidden relative">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20"></div>
                        <div className="h-full bg-green-500 animate-[loading_2s_ease-in-out_infinite] shadow-[0_0_20px_#0f0]"></div>
                    </div>
                </div>
            </div>
        )}

        {/* STAGE: REDIRECT */}
        {stage === Stage.REDIRECT && (
            <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center text-green-500 animate-in fade-in duration-300 font-mono">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black animate-pulse"></div>
                
                <AlertTriangle className="w-32 h-32 mb-8 text-red-600 animate-[bounce_1s_infinite]" />
                
                <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-white glitch-text" data-text="真相已解密">
                    真相已解密
                </h1>
                
                <p className="text-xl md:text-3xl text-red-500 font-bold mb-12 animate-pulse text-center px-4">
                    >> 警告: 正在为你揭示 [熊雨贤] 的终极答案...
                </p>
                
                <div className="w-64 md:w-96 h-2 bg-gray-900 rounded-full overflow-hidden border border-red-900/50">
                   <div className="h-full bg-red-600 animate-[loading_1.5s_ease-in-out_infinite] shadow-[0_0_15px_#f00]"></div>
                </div>
                
                <div className="mt-8 space-y-2 text-center text-xs md:text-sm text-gray-600 font-mono">
                    <p>ESTABLISHING SECURE LINK TO CORE...</p>
                    <p>DECRYPTING REALITY MATRIX...</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default App;