import React, { useState, useEffect, useRef } from 'react';
import { Lock, Unlock, Eye, Radio, Activity, Search, Cpu, Fingerprint, AlertTriangle, Terminal, ArrowRight, ShieldAlert } from 'lucide-react';
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
  const [interactionRequired, setInteractionRequired] = useState(false);
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
    processFakeDataPart1();
  };

  const processFakeDataPart1 = async () => {
    setLogs([]);
    setInteractionRequired(false);

    const part1Logs = [
      "正在连接 Akashic (阿卡西) 记录...",
      "正在建立量子纠缠通道...",
      `目标锁定: 熊雨贤 (XIONG_YUXIAN)`,
      "分析脑波频率: 14.5 Hz (Beta波)",
      "正在暴力破解逻辑防火墙...",
      "...",
      "警告: 检测到潜意识防御机制",
      "错误: 访问被拒绝 (错误代码: HUMAN_EMOTION_BLOCK)",
      "需要人工干预以强制覆盖..."
    ];

    // 慢速生成日志
    for (let i = 0; i < part1Logs.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setLogs(prev => [...prev, `> [SYSTEM]: ${part1Logs[i]}`]);
    }

    setInteractionRequired(true);
  };

  const handleOverride = async () => {
    setInteractionRequired(false);
    setLogs(prev => [...prev, `> [USER]: 授权强制覆盖指令...`]);
    
    await new Promise(resolve => setTimeout(resolve, 500));

    const part2Logs = [
      "授权确认: ADMIN_OVERRIDE_ENABLED",
      "正在重新编译现实参数...",
      "绕过大脑皮层防御机制...",
      "ROOT ACCESS: ACQUIRED",
      "下载神经元记忆碎片 (42TB)...",
      "正在通过量子算法解析因果律...",
      "解析中... [████████░░] 82%",
      "解析中... [██████████] 100%",
      "警告: 检索到 1 个终极答案",
      "系统过载: 真相即将溢出",
      ">> 准备注入现实 <<"
    ];

    for (let i = 0; i < part2Logs.length; i++) {
      const delay = Math.max(150, 600 - i * 40);
      await new Promise(resolve => setTimeout(resolve, delay));
      setLogs(prev => [...prev, `> [SYSTEM]: ${part2Logs[i]}`]);
    }

    await new Promise(resolve => setTimeout(resolve, 1500));
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
                    className="block w-full bg-black border-2 border-green-800 text-green-300 p-6 pr-16 text-xl md:text-2xl outline-none focus:border-green-400 focus:shadow-[0_0_30px_rgba(0,255,0,0.5)] transition-all duration-300 placeholder-green-900 text-center font-mono rounded-lg"
                    autoFocus
                    autoComplete="off"
                    />
                    <button 
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-900/40 border border-green-700 text-green-400 hover:bg-green-500 hover:text-black p-2 rounded-md transition-all duration-200 hover:shadow-[0_0_15px_rgba(0,255,0,0.6)] active:scale-95"
                        aria-label="Execute Search"
                    >
                        <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
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
                
                <div className={`z-50 w-full max-w-2xl p-4 bg-black/90 backdrop-blur-md border ${interactionRequired ? 'border-red-500 shadow-[0_0_50px_rgba(255,0,0,0.4)]' : 'border-green-500/50 shadow-[0_0_50px_rgba(0,255,0,0.2)]'} rounded-lg transition-all duration-500`}>
                    <div className="flex items-center gap-4 mb-4 border-b border-green-900 pb-2">
                        {interactionRequired ? (
                             <ShieldAlert className="w-6 h-6 animate-pulse text-red-500" />
                        ) : (
                             <Cpu className="w-6 h-6 animate-spin text-green-400" />
                        )}
                        <span className={`text-lg md:text-xl font-bold animate-pulse ${interactionRequired ? 'text-red-500' : 'text-green-400'}`}>
                            {interactionRequired ? "SECURITY ALERT: INTERVENTION REQUIRED" : "CALCULATING TRUTH FOR: 熊雨贤"}
                        </span>
                    </div>
                    
                    <div className="h-64 overflow-hidden flex flex-col relative font-mono text-sm md:text-base">
                        <div className="flex-1 flex flex-col justify-end space-y-1 pb-2">
                            {logs.map((log, idx) => (
                                <div key={idx} className={`${log.includes("警告") || log.includes("错误") ? "text-red-400" : "text-green-400/90"} break-all animate-in slide-in-from-left-4 fade-in duration-100`}>
                                    {log}
                                </div>
                            ))}
                            <div ref={logsEndRef} />
                        </div>
                        
                        {/* Interaction Overlay */}
                        {interactionRequired && (
                            <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center animate-in fade-in z-20 backdrop-blur-sm">
                                <AlertTriangle className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
                                <p className="text-red-400 font-bold mb-6 text-center px-4 text-lg">
                                  潜意识防御激活。<br/>需要手动确认以继续。
                                </p>
                                <button 
                                    onClick={handleOverride}
                                    className="group relative px-8 py-4 bg-red-900/20 border-2 border-red-500 text-red-500 hover:bg-red-600 hover:text-black transition-all duration-200 font-bold tracking-widest overflow-hidden rounded uppercase cursor-pointer"
                                >
                                    <span className="relative z-10">强制覆盖 (OVERRIDE)</span>
                                    <div className="absolute inset-0 bg-red-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {/* Progress Bar */}
                    <div className={`w-full h-4 ${interactionRequired ? 'bg-red-950 border-red-800' : 'bg-green-950 border-green-800'} mt-4 rounded border overflow-hidden relative transition-colors duration-500`}>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20"></div>
                        <div className={`h-full ${interactionRequired ? 'bg-red-600 w-full animate-pulse' : 'bg-green-500 animate-[loading_2s_ease-in-out_infinite]'} shadow-[0_0_20px_${interactionRequired ? '#f00' : '#0f0'}]`}></div>
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
                    &gt;&gt; 警告: 正在为你揭示 [熊雨贤] 的终极答案...
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