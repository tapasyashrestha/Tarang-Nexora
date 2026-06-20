import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Header } from "@/components/Header";
import { ScenarioSlider } from "@/components/ScenarioSlider";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function ScenarioSetup() {
  const [, setLocation] = useLocation();
  const [horizon, setHorizon] = useState("90 days");
  const [isSimulating, setIsSimulating] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);

  const phases = [
    "Mapping causal pathways...",
    "Running scenario projections...",
    "Detecting anomalies..."
  ];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setPhaseIndex(0);

    // Phase 1
    setTimeout(() => setPhaseIndex(1), 600);
    // Phase 2
    setTimeout(() => setPhaseIndex(2), 1300);
    // Complete
    setTimeout(() => {
      setLocation("/results");
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground">
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-10 relative">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4" data-testid="link-back-map">
            <ArrowLeft className="w-4 h-4" /> Back to Dependency Map
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Configure Scenario</h1>
          <p className="text-muted-foreground mt-2">Adjust key drivers to simulate outcomes and detect hidden risks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <ScenarioSlider 
            label="Product Price Change" 
            min={-20} max={20} step={1} defaultValue={-10} unit="%" 
          />
          <ScenarioSlider 
            label="Delivery Time Change" 
            min={-3} max={3} step={0.5} defaultValue={-1} unit=" days" 
          />
          <ScenarioSlider 
            label="Marketing Spend Change" 
            min={-30} max={50} step={5} defaultValue={15} unit="%" 
          />
          <ScenarioSlider 
            label="Inventory Buffer Change" 
            min={-25} max={25} step={5} defaultValue={0} unit="%" 
          />
        </div>

        <div className="bg-card border border-[rgba(255,255,255,0.08)] rounded-lg p-6 mb-10">
          <h3 className="text-sm font-medium mb-4">Time Horizon</h3>
          <div className="flex gap-3">
            {["30 days", "90 days", "180 days"].map(t => (
              <button 
                key={t}
                onClick={() => setHorizon(t)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  horizon === t 
                    ? "bg-primary text-white shadow-[0_0_15px_rgba(59,158,255,0.3)]" 
                    : "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-muted-foreground hover:text-white hover:bg-[rgba(255,255,255,0.06)]"
                }`}
                data-testid={`button-horizon-${t.replace(/\s+/g, '-')}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleRunSimulation}
          disabled={isSimulating}
          className="w-full py-5 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-lg shadow-[0_0_20px_rgba(59,158,255,0.2)] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="button-run-simulation"
        >
          {isSimulating ? "Processing..." : "Run Simulation"}
        </button>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isSimulating && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-background/90 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center p-8 border border-[rgba(255,255,255,0.05)]"
            >
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-6" />
              
              <div className="w-full max-w-md bg-[rgba(255,255,255,0.05)] h-2 rounded-full overflow-hidden mb-4">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "linear" }}
                />
              </div>

              <div className="h-6 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={phaseIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-mono text-primary"
                  >
                    {phases[phaseIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
