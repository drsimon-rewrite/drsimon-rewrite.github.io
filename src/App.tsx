import { motion, AnimatePresence } from "framer-motion";
import { SiGithub } from "react-icons/si";
import {
  NewspaperIcon,
  ChartBarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import pipelineImg from "./assets/pipeline.png";
import { useState, useRef, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

// Game component
function RedPandaGame({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentColor, setCurrentColor] = useState("#FF6B6B");
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E9",
  ];

  useEffect(() => {
    if (gameStarted && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 400;
      canvas.height = 300;

      const context = canvas.getContext("2d");
      if (context) {
        context.lineCap = "round";
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
    const certificateCanvas = document.createElement("canvas");
    const certificateCtx = certificateCanvas.getContext("2d");
    if (!certificateCtx) return;

    // 증명서 크기 설정 (더 큰 크기)
    certificateCanvas.width = 800;
    certificateCanvas.height = 600;

    // 배경 그라데이션
    const gradient = certificateCtx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, "#f8fafc");
    gradient.addColorStop(1, "#e2e8f0");
    certificateCtx.fillStyle = gradient;
    certificateCtx.fillRect(0, 0, 800, 600);

    // 프레임 그리기
    certificateCtx.strokeStyle = "#3b82f6";
    certificateCtx.lineWidth = 8;
    certificateCtx.strokeRect(20, 20, 760, 560);

    // 내부 프레임
    certificateCtx.strokeStyle = "#1e40af";
    certificateCtx.lineWidth = 3;
    certificateCtx.strokeRect(40, 40, 720, 520);

    // 제목
    certificateCtx.fillStyle = "#1e293b";
    certificateCtx.font = "bold 48px Arial, sans-serif";
    certificateCtx.textAlign = "center";
    certificateCtx.fillText("DR.SIMON", 400, 100);

    // 서브타이틀
    certificateCtx.fillStyle = "#64748b";
    certificateCtx.font = "20px Arial, sans-serif";
    certificateCtx.fillText("Art Studio Certificate", 400, 130);

    // 레서판다 로고 위치 (왼쪽 상단)
    certificateCtx.fillStyle = "#ef4444";
    certificateCtx.font = "bold 24px Arial, sans-serif";
    certificateCtx.textAlign = "left";
    certificateCtx.fillText("🐼", 60, 80);

    // 그림 영역 (중앙)
    const originalCanvas = canvasRef.current;
    certificateCtx.drawImage(originalCanvas, 100, 160, 600, 300);

    // 그림 테두리
    certificateCtx.strokeStyle = "#3b82f6";
    certificateCtx.lineWidth = 2;
    certificateCtx.strokeRect(100, 160, 600, 300);

    // 감사 메시지
    certificateCtx.fillStyle = "#1e293b";
    certificateCtx.font = "bold 28px Arial, sans-serif";
    certificateCtx.textAlign = "center";
    certificateCtx.fillText("Thank you for your attention!", 400, 500);

    // 날짜
    const today = new Date();
    const dateString = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    certificateCtx.fillStyle = "#64748b";
    certificateCtx.font = "18px Arial, sans-serif";
    certificateCtx.fillText(`Created on ${dateString}`, 400, 530);

    // 서명 라인
    certificateCtx.strokeStyle = "#3b82f6";
    certificateCtx.lineWidth = 2;
    certificateCtx.beginPath();
    certificateCtx.moveTo(300, 560);
    certificateCtx.lineTo(500, 560);
    certificateCtx.stroke();

    certificateCtx.fillStyle = "#64748b";
    certificateCtx.font = "16px Arial, sans-serif";
    certificateCtx.fillText("Artist Signature", 400, 580);

    // 저장
    const link = document.createElement("a");
    link.download = "dr-simon-artwork-certificate.png";
    link.href = certificateCanvas.toDataURL();
    link.click();
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setIsDrawing(false);
    setCurrentColor("#FF6B6B");
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
                    <img
                      src="/logo.png"
                      alt="Red Panda Artist"
                      className="w-12 h-12"
                    />
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
                                ? "border-gray-800 scale-110 shadow-lg"
                                : "border-gray-300 hover:border-gray-400"
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
                          <img
                            src="/logo.png"
                            alt="Red Panda"
                            className="w-4 h-4"
                          />
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
                      <h3 className="text-lg font-bold mb-3 text-gray-800">
                        Current Color
                      </h3>
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
                        style={{ width: "400px", height: "300px" }}
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
  const [isPipelineOpen, setIsPipelineOpen] = useState(false);

  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);

    if (newCount === 3) {
      setIsGameOpen(true);
      setLogoClickCount(0);
    }
  };

  return (
    <main className="min-h-screen text-gray-900 font-Inter relative overflow-hidden">
      <section className="relative flex flex-col items-center justify-center py-20 px-4">
        <motion.div className="text-center max-w-4xl mx-auto relative">
          <motion.h1
            className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-orange-700 via-amber-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg"
            variants={fadeInUp}
          >
            DR.SIMON
            <motion.img
              src="/logo.png"
              alt="DR.SIMON Logo"
              className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-lg cursor-pointer absolute top-1/2 right-32 transform -translate-y-1/2"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLogoClick}
            />
          </motion.h1>

          <motion.h2
            className="text-xl md:text-2xl font-semibold text-gray-700 leading-relaxed"
            variants={fadeInUp}
          >
            DR.SIMON: Domain-wise Rewrite for Segment-Informed Medical Oversight
            Network
          </motion.h2>

          {/* Authors and Affiliations */}
          <motion.div
            className="mt-6 mb-8 text-sm md:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            <p className="font-medium text-center">
              <a
                href="http://www.seohyunleee.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                Seohyun Lee
              </a>
              <sup>1</sup>,
              {" "}
              <a
                href="https://github.com/imsuviiix"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                Suhyun Choe
              </a>
              <sup>2</sup><sup>*</sup>,
              {" "}
              <a
                href="https://github.com/allchiever"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                Jaeha Choi
              </a>
              <sup>3</sup><sup>*</sup>, and
              {" "}
              <a
                href="https://jinleevv.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                Jin Won Lee
              </a>
              <sup>4</sup><sup>*</sup>
            </p>
            <div className="mt-3 text-center space-y-1">
              <p>
                <sup>1</sup> Korea University, Seoul, Republic of Korea
              </p>
              <p>
                <sup>2</sup> Yonsei University, Seoul, Republic of Korea
              </p>
              <p>
                <sup>3</sup> Incheon National University, Incheon, Republic of Korea
              </p>
              <p>
                <sup>4</sup> McGill University, Montreal, Canada
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <sup>*</sup> equally contributed as second authors, alphabetic
              </p>
            </div>
            <p className="mt-4 text-center text-gray-600">
              MedAGI workshop @ MICCAI 2025, oral presentation
            </p>
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://github.com/drsimon-rewrite/Dr.Simon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-black text-white px-8 py-6 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 font-medium">
                <SiGithub className="w-5 h-5" />
                View Code
              </Button>
            </a>
            <a href="/DR_SIMON.pdf" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className=" border-gray-300 text-gray-700 px-8 py-6 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              >
                <NewspaperIcon className="w-5 h-5" />
                Read Paper
              </Button>
            </a>
            <a href="/dr.simon_poster.pdf" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className=" border-gray-300 text-gray-700 px-8 py-6 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              >
                Poster
              </Button>
            </a>
            <a href="/dr.simon_presentation.pdf" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className=" border-gray-300 text-gray-700 px-8 py-6 rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              >
                Slides
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </section>

      <Separator className="my-3" />

      {/* Abstract Section */}
      <section className="relative">
        <div className="max-w-6xl mx-auto p-14">
          <div className="flex items-center justify-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Abstract</h2>
          </div>
          <p className="text-lg leading-relaxed text-gray-700">
            Humans are capable of understanding language, even when encountering
            unfamiliar words. Rather than requiring precise definitions, we
            often infer meaning from the surrounding linguistic context or
            visual cues. Inspired by this capability, we address the
            long-standing challenge of aligning medical terminology in queries
            with visual content for temporal grounding in medical videos. While
            bridging this gap typically relies on costly, domain-specific
            fine-tuning, such methods frequently lack generalization and
            struggle to adapt to newly coined or rarely encountered terms. To
            deal with this limitation, we present <strong>DR.SIMON</strong> (
            <strong>D</strong>omain-wise <strong>R</strong>ewrite for{" "}
            <strong>S</strong>egment-<strong>I</strong>nformed{" "}
            <strong>M</strong>
            edical <strong>O</strong>versight <strong>N</strong>etwork ), a
            simple yet efficient query-rewriting framework that runs on a frozen
            backbone. DR.SIMON first segments the video into coarse events, then
            rewrites the user query into visually explicit paraphrases under
            global visual context, and finally localizes the most relevant
            segment. Evaluated on MedVidCL, DR.SIMON achieves remarkable gains
            over recent video-LLMs—without any additional training. Our results
            show that resolving lexical misalignment alone can unlock
            substantial performance improvements and provide a scalable route to
            keep pace with continually emerging medical vocabulary.
          </p>
        </div>
      </section>

      <Separator className="my-3" />

      {/* Pipeline Section */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 py-10 md:p-14">
          <div className="flex items-center justify-center mb-8">
            <ChartBarIcon className="w-8 h-8 mr-3 text-gray-800" />
            <h2 className="text-2xl font-bold text-gray-800">
              Methodology Pipeline
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-gray-700 text-center max-w-6xl mx-auto mb-8">
            Our proposed framework segments medical videos and rewrites
            domain-specific queries for enhanced video grounding.
          </p>

          {/* Desktop: original styling, no zoom/lightbox */}
          <motion.div className="hidden md:block p-8">
            <motion.img
              src={pipelineImg}
              alt="DR.SIMON Pipeline"
              className="border p-2 rounded-xl shadow-lg mx-auto w-full max-w-4xl"
            />
          </motion.div>

          {/* Mobile: full-width with tap-to-zoom */}
          <motion.div className="block md:hidden px-2 sm:px-4">
            <motion.img
              src={pipelineImg}
              alt="DR.SIMON Pipeline"
              className="block mx-auto w-full h-auto max-w-none border rounded-xl shadow-lg cursor-zoom-in"
              loading="lazy"
              whileHover={{ scale: 1.01 }}
              onClick={() => setIsPipelineOpen(true)}
            />
            <p className="mt-2 text-center text-sm text-gray-500"></p>
          </motion.div>
        </div>
      </section>

      {/* Pipeline Lightbox */}
      <AnimatePresence>
        {isPipelineOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            onClick={() => setIsPipelineOpen(false)}
          >
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={pipelineImg}
              alt="DR.SIMON Pipeline Fullscreen"
              className="max-w-[95vw] max-h-[90vh] w-auto h-auto rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Separator className="my-3" />

      {/* Citation Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Citation
          </h2>

          <motion.div className="rounded-xl p-6 text-sm overflow-x-auto bg-black text-white shadow-lg border">
            <pre className="whitespace-pre-wrap">
              <code>
                <span className="text-orange-400">@article</span>
                {`{2025drsimon,\n`}
                <span className="text-orange-400"> title</span>
                {`     = {DR.SIMON: Domain-wise Rewrite for Segment-Informed Medical Oversight Network},\n`}
                <span className="text-orange-400"> author</span>
                {`    = {Seohyun Lee, Suhyun Choe, Jaeha Choi, Jin Won Lee},\n`}
                <span className="text-orange-400"> journal</span>
                {`   = {arXiv preprint arXiv:},\n`}
                <span className="text-orange-400"> year</span>
                {`      = {2025}\n`}
                {`}`}
              </code>
            </pre>
          </motion.div>
        </div>
      </section>

      <Separator className="my-3" />

      {/* Footer */}
      <footer className="relative text-center py-12 px-4">
        <div className="text-gray-600">
          <p className="text-lg font-medium mb-2">© 2025 DR.SIMON Project</p>
          <p className="text-sm">
            Domain-wise Rewrite for Segment-Informed In-video Medical Oversight
            Network
          </p>
        </div>
      </footer>

      {/* Game Modal */}
      <RedPandaGame isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
    </main>
  );
}
