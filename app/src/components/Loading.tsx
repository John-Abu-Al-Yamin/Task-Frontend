"use client";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f0c] via-[#0f1611] to-[#141a16] flex items-center justify-center relative overflow-hidden">
      {/* Background pattern - reduced for performance */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-[#38e07b] blur-2xl animate-pulse will-change-transform"></div>
        <div className="absolute bottom-1/3 right-1/3 w-20 h-20 rounded-full bg-[#38e07b] blur-xl animate-pulse delay-1000 will-change-transform"></div>
      </div>

      <div className="text-center space-y-8 z-10">
        {/* Main spinner */}
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-[#38e07b] border-r-[#38e07b] mx-auto shadow-lg shadow-[#38e07b]/20 will-change-transform"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-2 border-transparent border-b-[#38e07b]/40 mx-auto absolute top-0 left-1/2 transform -translate-x-1/2 animate-reverse-spin will-change-transform"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#38e07b] rounded-full animate-pulse will-change-transform"></div>
        </div>

        {/* Loading text with animation */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-white animate-pulse">Loading</h2>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-[#38e07b] rounded-full animate-bounce will-change-transform"></div>
            <div className="w-2 h-2 bg-[#38e07b] rounded-full animate-bounce delay-100 will-change-transform"></div>
            <div className="w-2 h-2 bg-[#38e07b] rounded-full animate-bounce delay-200 will-change-transform"></div>
          </div>
          <p className="text-gray-400 text-sm animate-fade-in">Please wait while we prepare everything for you</p>
        </div>

        {/* Progress bar */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#38e07b] to-[#2dd46a] rounded-full animate-loading-bar will-change-transform"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes loading-bar {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(-100%); }
          100% { width: 100%; transform: translateX(0%); }
        }

        .animate-reverse-spin { animation: reverse-spin 2s linear infinite; }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-loading-bar { animation: loading-bar 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Loading;
