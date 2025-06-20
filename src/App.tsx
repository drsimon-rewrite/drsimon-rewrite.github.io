import { motion, AnimatePresence } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { NewspaperIcon, ArrowDownIcon, AcademicCapIcon, ChartBarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import pipelineImg from "./assets/pipeline.png";
import { useState, useRef, useEffect } from "react";

const abstract = `In real life, even if we do not know the exact definition of a word in a sentence, we often infer its meaning by observing the surrounding context or the actions of others. 
This natural context-driven process of human learning can be emulated in video understanding using large video–language models (Video-LLMs). However, current Video-LLMs often struggle with grounding when queries rely on domain-specific terminology rather than visually descriptive language, a common scenario in medical video question answering (MedVidQA). To address this, we propose \textbf{\ours} (Domain-wise Rewrite for Segment-Informed In-video Medical Oversight Network), a query‑rewriting framework designed to enhance video grounding in medical videos. \ours\ segments a video into coarse events, rewrites the domain-specific query in visually explicit alternatives for each segment using contextual cues, and selects the segment that best aligns with a semantically rewritten query for fine-grained localization. Through this approach, \ours\ (i) bridges the lexical gap between medical terminology and visual content, (ii) improves the robustness to previously unseen vocabulary, and (iii) scales effectively to longer videos through event-level pruning.`;

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Game component
function RedPandaGame({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [currentColor, setCurrentColor] = useState('#FF6B6B');
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ];

  useEffect(() => {
    if (gameStarted && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 400;
      canvas.height = 300;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.lineCap = 'round';
        context.strokeStyle = currentColor;
        context.lineWidth = brushSize;
        contextRef.current = context;
      }
    }
  }, [gameStarted]);

  // 색상이나 브러시 크기가 변경될 때만 context 속성 업데이트
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = currentColor;
      contextRef.current.lineWidth = brushSize;
    }
  }, [currentColor, brushSize]);

  const startDrawing = (e: React.MouseEvent) => {
    if (!contextRef.current) return;
    
    setIsDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !contextRef.current) return;
    
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!contextRef.current) return;
    
    setIsDrawing(false);
    contextRef.current.closePath();
  };

  const clearCanvas = () => {
    if (!contextRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = () => {
    if (!canvasRef.current) return;
    
    // 증명서 스타일의 캔버스 생성
    const certificateCanvas = document.createElement('canvas');
    const certificateCtx = certificateCanvas.getContext('2d');
    if (!certificateCtx) return;
    
    // 증명서 크기 설정 (더 큰 크기)
    certificateCanvas.width = 800;
    certificateCanvas.height = 600;
    
    // 배경 그라데이션
    const gradient = certificateCtx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#f8fafc');
    gradient.addColorStop(1, '#e2e8f0');
    certificateCtx.fillStyle = gradient;
    certificateCtx.fillRect(0, 0, 800, 600);
    
    // 프레임 그리기
    certificateCtx.strokeStyle = '#3b82f6';
    certificateCtx.lineWidth = 8;
    certificateCtx.strokeRect(20, 20, 760, 560);
    
    // 내부 프레임
    certificateCtx.strokeStyle = '#1e40af';
    certificateCtx.lineWidth = 3;
    certificateCtx.strokeRect(40, 40, 720, 520);
    
    // 제목
    certificateCtx.fillStyle = '#1e293b';
    certificateCtx.font = 'bold 48px Arial, sans-serif';
    certificateCtx.textAlign = 'center';
    certificateCtx.fillText('DR.SIMON', 400, 100);
    
    // 서브타이틀
    certificateCtx.fillStyle = '#64748b';
    certificateCtx.font = '20px Arial, sans-serif';
    certificateCtx.fillText('Art Studio Certificate', 400, 130);
    
    // 레서판다 로고 위치 (왼쪽 상단)
    certificateCtx.fillStyle = '#ef4444';
    certificateCtx.font = 'bold 24px Arial, sans-serif';
    certificateCtx.textAlign = 'left';
    certificateCtx.fillText('🐼', 60, 80);
    
    // 그림 영역 (중앙)
    const originalCanvas = canvasRef.current;
    certificateCtx.drawImage(originalCanvas, 100, 160, 600, 300);
    
    // 그림 테두리
    certificateCtx.strokeStyle = '#3b82f6';
    certificateCtx.lineWidth = 2;
    certificateCtx.strokeRect(100, 160, 600, 300);
    
    // 감사 메시지
    certificateCtx.fillStyle = '#1e293b';
    certificateCtx.font = 'bold 28px Arial, sans-serif';
    certificateCtx.textAlign = 'center';
    certificateCtx.fillText('Thank you for your attention!', 400, 500);
    
    // 날짜
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    certificateCtx.fillStyle = '#64748b';
    certificateCtx.font = '18px Arial, sans-serif';
    certificateCtx.fillText(`Created on ${dateString}`, 400, 530);
    
    // 서명 라인
    certificateCtx.strokeStyle = '#3b82f6';
    certificateCtx.lineWidth = 2;
    certificateCtx.beginPath();
    certificateCtx.moveTo(300, 560);
    certificateCtx.lineTo(500, 560);
    certificateCtx.stroke();
    
    certificateCtx.fillStyle = '#64748b';
    certificateCtx.font = '16px Arial, sans-serif';
    certificateCtx.fillText('Artist Signature', 400, 580);
    
    // 저장
    const link = document.createElement('a');
    link.download = 'dr-simon-artwork-certificate.png';
    link.href = certificateCanvas.toDataURL();
    link.click();
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setIsDrawing(false);
    setCurrentColor('#FF6B6B');
    setBrushSize(5);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-2xl p-6 max-w-2xl w-full shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <img src="/logo.png" alt="Red Panda" className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Red Panda Art Studio
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {!gameStarted ? (
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-xl">
                    <img src="/logo.png" alt="Red Panda Artist" className="w-12 h-12" />
                  </div>
                  <p className="text-gray-700">
                    Create your masterpiece with Red Panda!
                  </p>
                </div>
                <button
                  onClick={startGame}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  🎨 Start Art Studio
                </button>
              </div>
            ) : (
              <div>
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Tools Panel */}
                  <div className="flex flex-col gap-4 lg:w-64">
                    {/* Color Palette */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
                      <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-2">
                        <span className="text-xl">🎨</span> Colors
                      </h3>
                      <div className="grid grid-cols-5 gap-2">
                        {colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setCurrentColor(color)}
                            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 shadow-md hover:scale-110 ${
                              currentColor === color 
                                ? 'border-gray-800 scale-110 shadow-lg' 
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Brush Size */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
                      <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-2">
                        <span className="text-xl">🖌️</span> Brush Size
                      </h3>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        value={brushSize}
                        onChange={(e) => setBrushSize(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="text-center text-sm text-gray-600 mt-2 font-medium">
                        Size: {brushSize}px
                      </div>
                    </div>

                    {/* Tools */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
                      <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-2">
                        <span className="text-xl">🛠️</span> Tools
                      </h3>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={saveDrawing}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 text-sm"
                        >
                          <img src="/logo.png" alt="Red Panda" className="w-4 h-4" />
                          💾 Save Certificate
                        </button>
                        <button
                          onClick={clearCanvas}
                          className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-2 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 text-sm"
                        >
                          🧹 Clear
                        </button>
                        <button
                          onClick={resetGame}
                          className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-3 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 text-sm"
                        >
                          🔄 New Canvas
                        </button>
                      </div>
                    </div>

                    {/* Current Color Display */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
                      <h3 className="text-lg font-bold mb-3 text-gray-800">Current Color</h3>
                      <div 
                        className="w-16 h-16 rounded-xl border-3 border-gray-300 shadow-lg mx-auto"
                        style={{ backgroundColor: currentColor }}
                      />
                    </div>
                  </div>

                  {/* Canvas */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center gap-2">
                      <span className="text-xl">🎨</span> Canvas
                    </h3>
                    <div className="bg-white rounded-xl p-3 shadow-xl border-2 border-gray-200">
                      <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        className="cursor-crosshair bg-white rounded-lg w-full"
                        style={{ width: '400px', height: '300px' }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-2 text-center font-medium">
                      Draw on the canvas with your mouse! 🎨
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [isGameOpen, setIsGameOpen] = useState(false);

  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    
    if (newCount === 3) {
      setIsGameOpen(true);
      setLogoClickCount(0);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900 font-Inter relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen py-20 px-4">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg flex items-center justify-center gap-4"
            variants={fadeInUp}
          >
            <motion.img 
              src="/logo.png" 
              alt="DR.SIMON Logo" 
              className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-lg cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLogoClick}
            />
            DR.SIMON
          </motion.h1>
          
          <motion.h2
            className="text-xl md:text-2xl font-semibold text-gray-700 mb-8 leading-relaxed"
            variants={fadeInUp}
          >
            Domain-wise Rewrite for Segment-Informed In-video Medical Oversight Network
          </motion.h2>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeInUp}
          >
            <a href="https://github.com/drsimon-rewrite/Dr.Simon" target="_blank" rel="noopener noreferrer">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-8 py-3 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              >
                <SiGithub className="w-5 h-5" /> 
                View Code
              </motion.button>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 font-medium hover:border-blue-400"
              >
                <NewspaperIcon className="w-5 h-5" /> 
                Read Paper
              </motion.button>
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDownIcon className="w-6 h-6 text-gray-500" />
        </motion.div>
      </section>

      {/* Abstract Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20"
          >
            <motion.div
              className="flex items-center justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <AcademicCapIcon className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Abstract</h2>
            </motion.div>
            
            <motion.p
              className="text-lg leading-relaxed text-gray-700 whitespace-pre-line"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {abstract}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pipeline Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              className="flex items-center justify-center mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ChartBarIcon className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Methodology Pipeline</h2>
            </motion.div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our proposed framework segments medical videos and rewrites domain-specific queries for enhanced video grounding.
            </p>
          </motion.div>
          
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.img
              src={pipelineImg}
              alt="DR.SIMON Pipeline"
              className="rounded-xl shadow-lg mx-auto w-full max-w-4xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Citation Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20"
          >
            <motion.h2
              className="text-3xl font-bold text-center mb-8 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Citation
            </motion.h2>
            
            <motion.div
              className="bg-gray-900 text-green-400 rounded-xl p-6 text-sm font-mono overflow-x-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <pre className="whitespace-pre-wrap">
{`@article{2025drsimon,
  title     = {DR.SIMON: Domain-wise Rewrite for Segment-Informed In-video Medical Oversight Network},
  author    = {},
  journal   = {arXiv preprint arXiv:},
  year      = {2025}
}`}
              </pre>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative text-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-gray-600"
        >
          <p className="text-lg font-medium mb-2">© 2025 DR.SIMON Project</p>
          <p className="text-sm">Domain-wise Rewrite for Segment-Informed In-video Medical Oversight Network</p>
        </motion.div>
      </footer>

      {/* Game Modal */}
      <RedPandaGame isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
    </main>
  );
}
