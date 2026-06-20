import { useState } from "react";
import { Header } from "@/components/Header";
import { NetworkGraph } from "@/components/NetworkGraph";
import { NodeData, nodes } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Info, Minus, Plus } from "lucide-react";

export default function DependencyMap() {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Header />
      
      <main className="flex-1 relative flex">
        <div className="flex-1 relative">
          <NetworkGraph 
            onNodeClick={(node) => setSelectedNode(node)} 
            selectedNodeId={selectedNode?.id || null} 
          />
          
          {/* Legend */}
          <div className="absolute bottom-6 left-6 bg-card/80 backdrop-blur-md border border-[rgba(255,255,255,0.08)] p-4 rounded-md shadow-xl text-sm" data-testid="legend-container">
            <h4 className="font-semibold text-white mb-3">Map Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-[#3B9EFF]"></div>
                <span className="text-muted-foreground">Positive/Reinforcing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-[#F5A623] border-t border-dashed border-[#F5A623]"></div>
                <span className="text-muted-foreground">Negative/Inverse</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center justify-center w-4">
                  <div className="w-3 h-3 rounded-full bg-[#1D3D5C] border border-white/20"></div>
                </div>
                <span className="text-muted-foreground">Node Size = Influence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div 
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-80 border-l border-[rgba(255,255,255,0.08)] bg-card/95 backdrop-blur z-10 flex flex-col h-full shadow-2xl"
              data-testid={`sidebar-node-${selectedNode.id}`}
            >
              <div className="p-6 border-b border-[rgba(255,255,255,0.08)]">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Info className="w-5 h-5 text-primary" />
                  </div>
                  <button 
                    onClick={() => setSelectedNode(null)}
                    className="text-muted-foreground hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{selectedNode.label}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>
              
              <div className="p-6 flex-1 overflow-y-auto">
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-4 font-semibold">Directly Affects</h3>
                {selectedNode.affects.length > 0 ? (
                  <ul className="space-y-3">
                    {selectedNode.affects.map(targetId => {
                      const targetNode = nodes.find(n => n.id === targetId);
                      return (
                        <li key={targetId} className="flex items-center gap-3 bg-[rgba(255,255,255,0.02)] p-3 rounded border border-[rgba(255,255,255,0.05)]">
                          <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-sm text-foreground">{targetNode?.label || targetId}</span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No direct downstream effects modeled.</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
