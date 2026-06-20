import { Link } from "wouter";
import { Waves, ChevronDown } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b border-[rgba(255,255,255,0.08)] bg-card/50 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <Waves className="w-5 h-5 text-primary" />
          <span className="font-mono font-bold text-lg tracking-wider text-white">TARANG</span>
        </Link>
        <div className="h-4 w-px bg-[rgba(255,255,255,0.1)] mx-2"></div>
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Strategic Foresight Engine</span>
      </div>

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] text-sm text-foreground cursor-default">
        <span>Business Model: E-Commerce Marketplace</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground ml-2" />
      </div>

      <div className="flex items-center">
        <Link href="/setup" className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-4 py-2 rounded text-sm font-medium transition-colors" data-testid="button-new-simulation">
          Run New Simulation
        </Link>
      </div>
    </header>
  );
}
