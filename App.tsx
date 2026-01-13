
import React, { useState } from 'react';
import { 
  Zap, 
  BookOpen, 
  PlusCircle, 
  Sparkles, 
  ChevronRight,
  CheckCircle2,
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
  MousePointer2,
  BarChart3,
  Briefcase,
  Cpu,
  Palette,
  Settings2,
  Presentation,
  ExternalLink,
  Github,
  Rocket,
  Globe,
  Code2,
  Cloud,
  Layout,
  RefreshCw,
  FileText,
  PieChart,
  Dices,
  Info
} from 'lucide-react';

interface VisualizationItem {
  name: string;
  nameEn: string;
  icon: React.ReactNode;
  desc: string;
  fullDesc: string;
  prompt: string;
}

const tutorialPrompts = [
  {
    category: "GA4 企業實踐",
    prompts: [
      {
        title: "經營決策洞察",
        description: "將 GA4 原始數據轉化為老闆能理解的商業價值與具體行動方案。",
        content: "你是一位資深電子商務策略顧問。請檢視本月的 GA4 流量與轉化數據。請特別針對「高價值用戶來源」與「結帳流失點」進行深度分析，並提供三個具體的建議，以在下個月提升 10% 的整體營收。請用非技術性的語言進行匯報。"
      },
      {
        title: "內容行銷成效",
        description: "分析部落格或登陸頁面的真實價值，而不僅僅是瀏覽量。",
        content: "請分析特定內容頁面的參與度數據。除了 Page Views 外，請著重於「關鍵活動觸發」與「後續轉換路徑」。判斷哪些內容主題真正帶動了潛在客戶的詢問，並據此規劃下個季度的內容日曆。"
      },
      {
        title: "廣告投放優化",
        description: "評估各個廣告管道的 ROI，並優化預算分配邏輯。",
        content: "請對比 Google Ads 與社交媒體廣告的獲客成本 (CAC) 與用戶終身價值 (LTV)。分析在多路徑歸因模型下，哪個管道在輔助轉換中扮演關鍵角色。請提供下週預算調整的具體比例建議，以最大化轉化效率。"
      }
    ]
  }
];

const caseStudyData = {
  title: "首次報稅懶人包",
  subtitle: "新手報稅不求人：從準備到繳費的全方位圖解案例",
  description: "針對「首次報稅」這個高搜尋量、高痛點的題目，我們設計了三種不同風格的視覺提示詞。這些提示詞特別優化了 16:9 的橫向構圖，適合用於網站橫幅 (Banner)、YouTube 封面或專業簡報。",
  styles: [
    {
      id: "case-1",
      title: "極簡商務 (Minimalist)",
      icon: <Layout className="w-6 h-6" />,
      tag: "適合：企業官網、專業報表",
      prompt: "Professional 16:9 horizontal infographic for 'First-time Tax Filing Guide'. Minimalist flat design, corporate blue and white theme. Clear geometric sections for 'Preparation', 'Reporting', and 'Payment'. Ultra-high 4K resolution, vector style, clean sans-serif typography, sophisticated business aesthetic, plenty of white space.",
      highlights: ["比例 16:9", "極簡扁平化設計", "4K 高解析度", "商務藍白配色"]
    },
    {
      id: "case-2",
      title: "現代波普 (Modern Pop)",
      icon: <Palette className="w-6 h-6" />,
      tag: "適合：社群媒體、行銷懶人包",
      prompt: "Vibrant 16:9 horizontal digital illustration for 'Tax Filing for Beginners'. Modern pop art style with bold gradients and bright colors (yellow, teal, coral). Playful icons of digital documents, smartphones, and golden coins. High definition, engaging visual hierarchy, 16:9 aspect ratio, trendy 2D vector art.",
      highlights: ["比例 16:9", "鮮豔波普風格", "高飽和度漸層", "趣味扁平化圖示"]
    },
    {
      id: "case-3",
      title: "專業技術圖解 (Technical)",
      icon: <PieChart className="w-6 h-6" />,
      tag: "適合：技術文檔、深度教學",
      prompt: "Detailed 16:9 horizontal technical flowchart for 'Annual Tax Return Process'. Professional isometric 3D illustration style, sophisticated slate grey and navy background. Precise data nodes connected by glowing lines. High resolution 4K, authoritative look, complex yet readable structure, clean rendering.",
      highlights: ["比例 16:9", "等角投影 (Isometric)", "4K 高解析度", "專業深色質感"]
    }
  ]
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'case-study' | 'tutorial' | 'ecosystem' | 'deployment'>('dashboard');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<VisualizationItem | null>(null);

  const softwareEcosystem = [
    {
      name: "Gemini",
      role: "大腦與筆桿",
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      desc: "負責深度數據分析、洞察提取與專業文案撰寫，是整個流程的智慧核心。",
      features: ["自然語言數據提問", "精準提示詞工程 (Prompt Engineering)", "自動生成數據故事敘述"],
      link: "https://aistudio.google.com/",
      color: "border-blue-200 bg-blue-50"
    },
    {
      name: "Looker Studio",
      role: "畫布與畫筆",
      icon: <Palette className="w-8 h-8 text-indigo-500" />,
      desc: "負責互動式視覺化呈現，將枯燥的數據轉化為直觀、易懂的儀表板與圖表。",
      features: ["多源數據連接 (GA4, BigQuery)", "互動式動態控制項", "AI 增強型自動建圖"],
      link: "https://lookerstudio.google.com/",
      color: "border-indigo-200 bg-indigo-50"
    },
    {
      name: "Google Opal",
      role: "自動化引擎",
      icon: <Cpu className="w-8 h-8 text-purple-500" />,
      desc: "實驗性的無程式碼 AI 應用構建工具，負責串接複雜的 AI 工作流，實現數據處理自動化。",
      features: ["無程式碼 AI 工作流串接", "自動化數據清洗與格式化", "多模型協同分析"],
      link: "https://cloud.google.com/products/ai",
      color: "border-purple-200 bg-purple-50"
    }
  ];

  const deploymentSteps = [
    {
      id: "deploy-1",
      title: "AI Studio：定義核心邏輯",
      icon: <Layout className="w-8 h-8 text-blue-500" />,
      desc: "利用直覺的介面，設計 AI 的溝通模式與分析邏輯。",
      details: [
        "使用自然語言對話，無需學習任何程式語法。",
        "定義 AI 的專家角色（如：資深數據策略師）。",
        "設定數據處理的關鍵指令（Prompts）。",
        "即時預覽並微調分析結果的專業度。"
      ],
      link: "https://aistudio.google.com/",
      actionText: "進入設計環境"
    },
    {
      id: "deploy-2",
      title: "GitHub：專案雲端備份",
      icon: <Github className="w-8 h-8 text-slate-800" />,
      desc: "將您的分析邏輯與網頁資產安全地存放在雲端空間。",
      details: [
        "建立個人的數位代碼倉庫。",
        "透過拖拽或簡單指令同步您的最新設計。",
        "實現「版本控制」，隨時找回之前的設計。",
        "讓您的工作流程具備企業級的穩定度。"
      ],
      link: "https://github.com/",
      actionText: "前往雲端庫"
    },
    {
      id: "deploy-3",
      title: "Vercel：一鍵發佈網站",
      icon: <Rocket className="w-8 h-8 text-blue-600" />,
      desc: "將您的設計轉化為正式網址，實現全網訪問。",
      details: [
        "關聯 GitHub 帳號，實現自動化發佈同步。",
        "Vercel 會自動為您生成專業的專案網址。",
        "免去所有複雜的伺服器與主機設定。",
        "只要 GitHub 更新，您的網站也會即時變動。"
      ],
      link: "https://vercel.com/",
      actionText: "發佈您的網站"
    }
  ];

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
          fullDesc: "簡化視覺特徵能減少受眾的心理距離，讓讀者更容易將注意力集中在關鍵特徵上。",
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
        }
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
          fullDesc: "互動式元件能引導受眾探索數據，從被動接收資訊轉為主動挖掘價值。",
          prompt: "Interactive data UI concept."
        },
        { 
          name: "順序", 
          nameEn: "Sequence",
          icon: <ListOrdered className="w-5 h-5" />, 
          desc: "建立邏輯層級",
          fullDesc: "視覺化能精確排列步驟與發展路徑，讓受眾順暢地理解事情的先後順序與因果關係。",
          prompt: "Professional flowchart for 'Sequence'."
        },
        { 
          name: "節奏", 
          nameEn: "Rhythm",
          icon: <Activity className="w-5 h-5" />, 
          desc: "掌控故事節奏",
          fullDesc: "透過視覺元素的疏密排列，能控制資訊釋放的節奏，增強敘事的效果與記憶點。",
          prompt: "Information rhythm abstract visualization."
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
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              儀表板
            </button>
            <button 
              onClick={() => setActiveTab('case-study')}
              className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'case-study' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              實戰案例
            </button>
            <button 
              onClick={() => setActiveTab('ecosystem')}
              className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'ecosystem' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              軟體介紹
            </button>
            <button 
              onClick={() => setActiveTab('deployment')}
              className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'deployment' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              部署教學
            </button>
            <button 
              onClick={() => setActiveTab('tutorial')}
              className={`px-4 py-1.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'tutorial' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
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
                  <Monitor size={14} /> AI Data Visualization
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8">
                  從洞察到簡報的<br/><span className="text-blue-600">自動化之路</span>
                </h2>
                <div className="space-y-5 mb-10">
                  <p className="text-slate-700 font-bold text-xl leading-relaxed">
                    掌握 Gemini + Looker Studio + Google Opal，打造圖文並茂的專業報告。
                  </p>
                  <p className="text-slate-500 text-lg leading-relaxed">
                    透過視覺化科學原則，將複雜數據轉化為老闆一看就懂、能立即拍板的經營決策。
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setActiveTab('case-study')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-[2rem] font-black flex items-center gap-3 transition-all shadow-2xl shadow-blue-200 active:scale-95 group"
                  >
                    <Presentation className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    查看實戰案例
                  </button>
                  <button 
                    onClick={() => setActiveTab('deployment')}
                    className="bg-white border-2 border-slate-200 text-slate-800 px-10 py-5 rounded-[2rem] font-black flex items-center gap-3 hover:border-blue-300 hover:bg-blue-50 transition-all active:scale-95"
                  >
                    <Rocket className="w-5 h-5" />
                    學習部署流程
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
        ) : activeTab === 'case-study' ? (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section className="bg-white rounded-[3rem] p-12 md:p-20 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="relative z-10 max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-black rounded-full mb-8 border border-emerald-100 uppercase tracking-[0.2em]">
                  <FileText size={14} /> Case Study Case-01
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">{caseStudyData.title}</h2>
                <h3 className="text-2xl font-bold text-blue-600 mb-8">{caseStudyData.subtitle}</h3>
                <p className="text-slate-500 text-xl leading-relaxed font-medium mb-12">
                  {caseStudyData.description}
                </p>
                <div className="flex items-center gap-4 text-slate-400 font-black text-xs uppercase tracking-widest">
                  <div className="flex items-center gap-1"><Monitor size={14}/> Optimized for 16:9</div>
                  <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                  <div className="flex items-center gap-1"><Sparkles size={14}/> AI-Driven Styles</div>
                </div>
              </div>
              <div className="absolute top-[-10%] right-[-10%] opacity-5 pointer-events-none">
                <Dices size={400} />
              </div>
            </section>

            <div className="grid grid-cols-1 gap-12">
              {caseStudyData.styles.map((style, idx) => (
                <div key={style.id} className="bg-white rounded-[3rem] border border-slate-200 p-8 md:p-12 shadow-sm hover:shadow-xl transition-all group flex flex-col lg:flex-row gap-12">
                  <div className="lg:w-1/3">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                      {style.icon}
                    </div>
                    <h4 className="text-3xl font-black text-slate-900 mb-4">{style.title}</h4>
                    <p className="text-blue-600 font-black text-sm mb-8">{style.tag}</p>
                    
                    <div className="space-y-3">
                      {style.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                          <CheckCircle2 size={16} className="text-emerald-500" /> {h}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:w-2/3 flex flex-col">
                    <div className="bg-slate-50 rounded-[2.5rem] p-8 mb-8 border border-slate-100 relative overflow-hidden flex-grow flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">AI Prompt (16:9 High-Res)</span>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-white text-slate-400 text-[10px] rounded border border-slate-100 font-black uppercase">Aspect Ratio: 16:9</span>
                          <span className="px-2 py-1 bg-white text-slate-400 text-[10px] rounded border border-slate-100 font-black uppercase">Res: 4K/HD</span>
                        </div>
                      </div>
                      <code className="text-slate-700 text-lg leading-relaxed block font-mono italic mb-8 flex-grow">
                        "{style.prompt}"
                      </code>
                      
                      <button 
                        onClick={() => handleCopy(style.prompt, style.id)}
                        className={`w-full py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg ${copiedId === style.id ? 'bg-emerald-500 text-white shadow-emerald-100' : 'bg-slate-900 text-white hover:bg-blue-600'}`}
                      >
                        {copiedId === style.id ? (
                          <><CheckCircle2 size={24} /> 提示詞已複製！</>
                        ) : (
                          <><Copy size={24} /> 複製高解析度提示詞</>
                        )}
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold italic">
                      <Info size={14} /> 小提示：建議使用 Gemini 2.5 Flash 或 Pro 模型進行繪圖，並確保在設定中勾選 16:9 比例。
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'ecosystem' ? (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section className="text-center max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">AI 數據視覺化工具生態系</h2>
              <p className="text-slate-500 text-xl leading-relaxed font-medium">
                協同工作流：將 Gemini 的智慧分析、Looker Studio 的畫布表現與 Opal 的自動化引擎完美結合。
              </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {softwareEcosystem.map((sw, idx) => (
                <div key={idx} className={`rounded-[2.5rem] border-2 p-10 flex flex-col ${sw.color} transition-all hover:shadow-xl group`}>
                  <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                    {sw.icon}
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-2">{sw.name}</h3>
                  <div className="text-blue-600 font-black text-sm uppercase tracking-widest mb-6">{sw.role}</div>
                  <p className="text-slate-600 font-bold text-lg leading-relaxed mb-8 flex-grow">
                    {sw.desc}
                  </p>
                  <ul className="space-y-4 mb-10">
                    {sw.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-500 font-bold">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a 
                    href={sw.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-slate-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95"
                  >
                    前往官網 <ExternalLink size={18} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'deployment' ? (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white overflow-hidden relative shadow-2xl">
              <div className="relative z-10 text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600/20 text-blue-400 text-xs font-black rounded-full mb-8 border border-blue-600/30 uppercase tracking-[0.2em]">
                  <Globe size={14} /> Zero Threshold Launch
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-8">零門檻：從 AI 設計到網站發佈</h2>
                <p className="text-slate-400 text-xl leading-relaxed font-medium">
                  不需要 API KEY 或繁瑣的技術門檻。本流程專為非技術人員設計，透過自動化工具，讓您的數據應用在幾分鐘內完成上線。
                </p>
              </div>
              <Cloud className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] text-blue-900 opacity-20 pointer-events-none" />
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {deploymentSteps.map((step, idx) => (
                <div key={idx} className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-sm hover:shadow-xl transition-all group relative flex flex-col">
                  <div className="bg-slate-50 w-20 h-20 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{step.title}</h3>
                  <p className="text-slate-500 font-bold mb-10">{step.desc}</p>
                  
                  <div className="space-y-6 mb-12 flex-grow">
                    {step.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex gap-4">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black flex items-center justify-center border border-blue-100">
                          {dIdx + 1}
                        </div>
                        <p className="text-slate-600 text-sm font-semibold leading-relaxed">{detail}</p>
                      </div>
                    ))}
                  </div>

                  <a 
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black flex items-center justify-center gap-2 hover:bg-blue-600 transition-all active:scale-95 shadow-lg"
                  >
                    {step.actionText} <ExternalLink size={18} />
                  </a>
                </div>
              ))}
            </div>

            <section className="bg-blue-600 rounded-[3rem] p-12 md:p-16 text-white text-center shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-6">為什麼選擇自動化部署？</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                    <Zap className="w-8 h-8 mb-4 mx-auto" />
                    <h4 className="font-black mb-2">免設定環境</h4>
                    <p className="text-sm opacity-80">自動處理所有網路與主機設定，專注於內容創作。</p>
                  </div>
                  <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                    <Monitor className="w-8 h-8 mb-4 mx-auto" />
                    <h4 className="font-black mb-2">永久免費空間</h4>
                    <p className="text-sm opacity-80">Vercel 與 GitHub 提供強大的免費方案，適合個人專案。</p>
                  </div>
                  <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                    <RefreshCw className="w-8 h-8 mb-4 mx-auto" />
                    <h4 className="font-black mb-2">更新即時生效</h4>
                    <p className="text-sm opacity-80">修改代碼 or 邏輯後，網站會在數秒內自動完成更新。</p>
                  </div>
                </div>
              </div>
              <Sparkles className="absolute top-10 left-10 text-white/10 w-32 h-32" />
            </section>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white overflow-hidden relative shadow-2xl">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-blue-600 rounded-[1.5rem] shadow-xl shadow-blue-900/40">
                    <Briefcase className="w-10 h-10" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black">GA4 企業實戰提示詞</h2>
                </div>
                <p className="text-slate-400 text-xl max-w-3xl leading-relaxed font-medium">
                  老闆不在乎數據有多少，他在乎數據能帶來多少業績。複製下方的「老闆導向提示詞」，學習如何將 GA4 轉化為能拍板的經營決策。
                </p>
              </div>
              <Activity className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] text-blue-900 opacity-20 pointer-events-none" />
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tutorialPrompts[0].prompts.map((p, pIdx) => {
                const id = `prompt-0-${pIdx}`;
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
                        <><Copy size={20} /> 複製提示詞</>
                      )}
                    </button>
                  </div>
                );
              })}
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
          <span className="text-xs font-black uppercase tracking-[0.4em]">AI 數據視覺化自動化之路</span>
          <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
          <span className="text-sm font-bold text-slate-500">由 馮淑萍 主講 | 視覺影響力策略師</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
