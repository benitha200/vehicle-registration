import { Shield } from "lucide-react";

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
        <Shield />
      </div>
      <div className="animate-pulse">
        <div className="w-32 h-4 bg-slate-700 rounded mx-auto mb-2"></div>
        <div className="w-24 h-3 bg-slate-800 rounded mx-auto"></div>
      </div>
    </div>
  </div>
);

export default LoadingScreen