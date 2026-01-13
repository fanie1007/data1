
import React, { useState } from 'react';
import { 
  Eye, 
  Zap, 
  BookOpen, 
  PlusCircle, 
  TrendingUp, 
  Sparkles, 
  RefreshCw,
  Info,
  ChevronRight,
  Loader2,
  CheckCircle2,
  Download,
  Brain,
  Search,
  Timer,
  Target,
  Monitor,
  Users,
  ListOrdered,
  Activity,
  Layers,
  X,
  ArrowRight,
  Copy,
  Terminal,
  FileText,
  MousePointer2,
  Wand2,
  BarChart3,
  PieChart,
  LineChart,
  DollarSign,
  Briefcase
} from 'lucide-react';

interface VisualizationItem {
  name: string;
  nameEn: string;
  icon: React.ReactNode;
  desc: string;
  fullDesc: string;
  prompt: string;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tutorial'>('dashboard');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<VisualizationItem | null>(null);

  const visualizationValues = [
    {
      category: "幫助學習",
      color: "bg-blue-600",
      items: [
        { 
          name: "認知", 
          nameEn: "Cognition",
          icon: <Brain className="w-5 h-5" />, 
          desc: "強化概念吸收",
          fullDesc: "對於不存在於過去認知經驗中的東西，圖解往往比純文字描述更精準且易於理解。",
          prompt: "Professional infographic explaining the concept of 'Cognition'."
        },
        { 
          name: "辨識", 
          nameEn: "Identification",
          icon: <Search className="w-5 h-5" />, 
          desc: "快速區分特徵",
          fullDesc: "簡化後的視覺標示，去除不必要的雜訊，讓受眾能瞬間辨識核心特徵。",
          prompt: "Professional infographic for 'Identification'."
        },
        { 
          name: "效率", 
          nameEn: "Efficiency",
          icon: <Timer className="w-5 h-5" />, 
          desc: "縮短理解時間",
          fullDesc: "運用色彩與層級差異，讓重要資訊瞬間脫穎而出，大幅提升大腦處理資訊的速度。",
          prompt: "Professional infographic for 'Efficiency'."
        },
        { 
          name: "準確", 
          nameEn: "Accuracy",
          icon: <Target className="w-5 h-5" />, 
          desc: "精準傳達訊息",
          fullDesc: "視覺化能同時呈現相對位置與空間邏輯，傳遞純文字難以表達的精確資訊。",
          prompt: "Professional technical diagram for 'Accuracy'."
        },
      ]
    },
    {
      category: "引起共鳴",
      color: "bg-indigo-500",
      items: [
        { 
          name: "投射", 
          nameEn: "Projection",
          icon: <Monitor className="w-5 h-5" />, 
          desc: "情感連結帶入",
          fullDesc: "簡化視覺特徵能減少受眾的心理距離，讓讀者更容易把自己投射到場景中產生共感。",
          prompt: "Professional illustration for 'Projection'."
        },
        { 
          name: "互動", 
          nameEn: "Interaction",
          icon: <Users className="w-5 h-5" />, 
          desc: "增加受眾參與",
          fullDesc: "善用視覺引導與對位，營造出與受眾對話的互動感，引發參與動機。",
          prompt: "Professional UI concept for 'Interaction'."
        },
        { 
          name: "順序", 
          nameEn: "Sequence",
          icon: <ListOrdered className="w-5 h-5" />, 
          desc: "建立邏輯層級",
          fullDesc: "視覺化能精確排列步驟與發展路徑，讓受眾順暢地理解事情的先後順序。",
          prompt: "Professional flowchart for 'Sequence'."
        },
        { 
          name: "節奏", 
          nameEn: "Rhythm",
          icon: <Activity className="w-5 h-5" />, 
          desc: "掌控故事節奏",
          fullDesc: "透過比例與留白的調節，視覺化能控制資訊釋放的速度，巧妙拿捏敘事的節奏感。",
          prompt: "Professional storyboard for 'Rhythm'."
        },
      ]
    }
  ];

  const tutorialPrompts = [
    {
      category: "GA4 決策核心 (老闆最關心的經營指標)",
      icon: <Briefcase className="w-6 h-6" />,
      prompts: [
        { 
          title: "轉換率跌幅深度診斷", 
          content: "你是一位資深數位行銷長 (CMO)。老闆想知道：『為什麼上個月廣告投這麼多，但轉化率 (CR) 卻下降了？』請分析這份 GA4 流量數據，比對廣告付費流量與自然流量的轉化率差異。請以『對比表格』呈現，並給出三個針對『廣告著陸頁優化』的具體行動建議。", 
          description: "分析核心業績問題，提供具備商業邏輯的技術優化策略。" 
        },
        { 
          title: "預算分配與 ROAS 優化", 
          content: "你是一位電商數據顧問。請根據 GA4 通路分組數據，分析各通路 (Meta, Google, Direct) 的營收貢獻與客單價 (AOV)。請以『Executive Summary』格式輸出，明確建議老闆下個月該增加哪個通路的預算，並用數據支持你的理由。", 
          description: "直接面對經營者對錢花在哪裡的焦慮，提供具決策價值的摘要。" 
        },
        { 
          title: "高價值客群行為路徑", 
          content: "你是一位 CRM 專家。老闆關心：『誰是我們的死忠客戶？』請分析 GA4 的『回訪者數據』。請以『數據說故事』的方式撰寫，描述高價值客群的行為路徑特徵，並建議一套針對這群人的『視覺化再行銷廣告』策略。", 
          description: "從冷冰冰的數據中提煉出人的行為軌跡，制定精準行銷計畫。" 
        }
      ]
    },
    {
      category: "數據敘事與視覺化實作",
      icon: <Wand2 className="w-6 h-6" />,
      prompts: [
        { 
          title: "五分鐘決策報告大綱", 
          content: "你是一位頂尖的 BI 專家。請根據數據，為我設計一份『給老闆的五分鐘極簡決策報表』。要求：首頁包含三個關鍵 KPI 卡片建議，接下來兩頁分別說明『獲客』與『轉換』的異常點，最後一頁是決策清單。", 
          description: "建立高效率的結構化敘事，提升報告的說服力。" 
        },
        { 
          title: "視覺原則優化清單", 
          content: "你是一位資深 UI/UX 設計顧問。這張 GA4 漏斗圖太複雜，請建議如何運用視覺化八大價值中的『效率』與『順序』原則進行簡化。請列出具體的『修改步驟清單』，目標是讓老闆一看就懂流失點。", 
          description: "優化資訊層級，減少決策者的認知負擔。" 
        }
      ]
    }
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleConceptClick = (item: VisualizationItem) => {
    setSelectedConcept(item);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12 font-sans">
      {/* 導覽列 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-black tracking-tight">視覺影響力 <span className="text-blue-600 font-extrabold">Pro</span></h1>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-5 py-1.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'dashboard' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              數據儀表板
            </button>
            <button 
              onClick={() => setActiveTab('tutorial')}
              className={`px-5 py-1.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'tutorial' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              提示詞教材
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-10">
        {activeTab === 'dashboard' ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* 主視覺區域 */}
            <section className="bg-white rounded-[3rem] p-10 md:p-16 border border-slate-200 shadow-sm overflow-hidden relative">
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-black rounded-full mb-6 uppercase tracking-[0.2em] border border-blue-100">
                  <Monitor size={14} /> Enterprise BI Hub
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8">
                  精準視覺化：<br/><span className="text-blue-600">讓數據為決策說話</span>
                </h2>
                <div className="space-y-5 mb-10">
                  <p className="text-slate-700 font-bold text-xl leading-relaxed">
                    本系統整合 GA4 關鍵經營指標，將繁雜的統計數字轉化為直觀、具備影響力的經營洞察。
                  </p>
                  <p className="text-slate-500 text-lg leading-relaxed">
                    不論是轉化率跌幅分析或是通路獲利評估，透過視覺化科學原則，您能產出讓老闆一看就懂、能立即拍板的數據報告。
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setActiveTab('tutorial')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-[2rem] font-black flex items-center gap-3 transition-all shadow-2xl shadow-blue-200 active:scale-95 group"
                  >
                    <BookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    進入企業決策教材
                  </button>
                </div>
              </div>
              <div className="absolute top-[-15%] right-[-10%] opacity-5 pointer-events-none scale-110">
                <BarChart3 size={600} />
              </div>
            </section>

            {/* 八大價值區域 */}
            <div className="pt-6">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-blue-600 rounded-[1rem] flex items-center justify-center text-white shadow-lg shadow-blue-100">
                  <Layers size={24} />
                </div>
                <div>
                  <h3 className="text-3xl font-black tracking-tight">視覺化可以做到的八件事</h3>
                  <p className="text-slate-400 font-bold text-sm">數據視覺化的科學實證基礎</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {visualizationValues.map((group, idx) => (
                  <div key={idx} className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm">
                    <h4 className="text-xl font-black mb-10 flex items-center gap-3">
                      <span className={`w-3 h-8 rounded-full ${group.color}`}></span>
                      {group.category}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {group.items.map((item, i) => (
                        <button 
                          key={i} 
                          onClick={() => handleConceptClick(item)}
                          className="flex items-center gap-4 p-6 rounded-[2rem] bg-slate-50 hover:bg-white border border-transparent hover:border-blue-400 transition-all hover:shadow-xl group text-left active:scale-95"
                        >
                          <div className={`p-4 rounded-2xl bg-white shadow-sm text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all`}>
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-black text-slate-800 text-lg group-hover:text-blue-600 transition-colors">{item.name}</div>
                            <div className="text-xs text-slate-400 font-bold group-hover:text-slate-500 uppercase tracking-wider">{item.nameEn}</div>
                          </div>
                          <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all translate-x-[-8px] group-hover:translate-x-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white overflow-hidden relative shadow-2xl">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-blue-600 rounded-[1.5rem] shadow-xl shadow-blue-900/40">
                    <Briefcase className="w-10 h-10" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black">GA4 企業實戰教材</h2>
                </div>
                <p className="text-slate-400 text-xl max-w-3xl leading-relaxed font-medium">
                  老闆不在乎數據有多少，他在乎數據能帶來多少業績。複製下方的「老闆導向提示詞」，學習如何將 GA4 轉化為能拍板的經營決策。
                </p>
              </div>
              <Activity className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] text-blue-900 opacity-20 pointer-events-none" />
            </section>

            <div className="grid grid-cols-1 gap-14">
              {tutorialPrompts.map((section, idx) => (
                <div key={idx} className="space-y-8">
                  <div className="flex items-center gap-5 px-6">
                    <div className="w-14 h-14 bg-white border border-slate-200 shadow-sm rounded-2xl flex items-center justify-center text-blue-600">
                      {section.icon}
                    </div>
                    <h3 className="text-3xl font-black text-slate-800">{section.category}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {section.prompts.map((p, pIdx) => {
                      const id = `prompt-${idx}-${pIdx}`;
                      return (
                        <div key={pIdx} className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm hover:shadow-xl transition-all flex flex-col group relative">
                          <h4 className="font-black text-2xl mb-4 text-slate-900 flex items-center justify-between">
                            {p.title}
                            <MousePointer2 size={18} className="text-slate-200 group-hover:text-blue-600 transition-colors" />
                          </h4>
                          <p className="text-slate-500 text-sm mb-8 flex-grow leading-relaxed font-bold">{p.description}</p>
                          
                          <div className="bg-slate-50 rounded-[2rem] p-6 mb-8 border border-slate-100 relative group/box overflow-hidden max-h-56 overflow-y-auto custom-scrollbar">
                            <code className="text-slate-700 text-sm leading-relaxed block pr-4 whitespace-pre-wrap font-mono">
                              "{p.content}"
                            </code>
                          </div>
                          
                          <button 
                            onClick={() => handleCopy(p.content, id)}
                            className={`w-full py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all active:scale-95 shadow-md ${copiedId === id ? 'bg-emerald-500 text-white shadow-emerald-100' : 'bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white hover:shadow-blue-200'}`}
                          >
                            {copiedId === id ? (
                              <><CheckCircle2 size={20} /> 已複製到剪貼簿</>
                            ) : (
                              <><Copy size={20} /> 複製關鍵提示詞</>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 rounded-[3rem] p-12 border border-amber-100 flex flex-col md:flex-row items-center gap-10 shadow-sm">
              <div className="p-8 bg-white rounded-[2.5rem] shadow-xl shadow-amber-900/5 border border-amber-100 shrink-0">
                <div className="w-20 h-20 bg-amber-500 rounded-[2rem] flex items-center justify-center text-white shadow-lg shadow-amber-200">
                  <Zap size={44} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-amber-900 mb-4 flex items-center gap-3">
                  老闆的溝通協議 (Boss Communication Protocol)
                </h3>
                <p className="text-amber-800/80 text-xl leading-relaxed max-w-2xl font-bold">
                  面對高階經營者，永遠先講「具備業績衝擊力」的結論。教材中的提示詞已內建此邏輯，配合視覺化原則，能大幅縮短老闆理解數據的時間。
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Concept Example Modal */}
      {selectedConcept && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[4rem] w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col animate-in zoom-in-95 duration-500 border border-slate-100">
            <div className="p-10 flex flex-col justify-center relative">
              <button 
                onClick={() => setSelectedConcept(null)}
                className="absolute top-10 right-10 p-3 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="flex items-center gap-5 mb-10">
                <div className="p-5 bg-blue-50 text-blue-600 rounded-[1.8rem] shadow-sm border border-blue-100">
                  {selectedConcept.icon}
                </div>
                <div>
                  <h4 className="text-4xl font-black text-slate-900 leading-none mb-2">{selectedConcept.name}</h4>
                  <span className="text-slate-400 font-black text-sm tracking-[0.3em] uppercase">{selectedConcept.nameEn}</span>
                </div>
              </div>
              
              <p className="text-slate-600 text-xl leading-relaxed font-bold">
                {selectedConcept.fullDesc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 底部作者資訊列 */}
      <footer className="max-w-6xl mx-auto px-4 mt-12 mb-8 flex justify-center border-t border-slate-200 pt-8">
        <div className="flex items-center gap-4 text-slate-400">
          <span className="text-xs font-black uppercase tracking-[0.4em]">GA4 企業實戰模式</span>
          <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
          <span className="text-sm font-bold text-slate-500">由 馮淑萍 主講 | 視覺影響力策略師</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
