import { AlertTriangle, Info, ArrowRight } from "lucide-react";

interface InsightCardProps {
  severity: "high" | "moderate";
  headline: string;
  why: string;
  chain: string[];
  mitigation: string;
  isLoop?: boolean;
}

export function InsightCard({ severity, headline, why, chain, mitigation, isLoop }: InsightCardProps) {
  const borderColor = severity === 'high' ? 'border-l-[#E5484D]' : 'border-l-[#F5A623]';
  const badgeBg = severity === 'high' ? 'bg-[#E5484D]/20 text-[#E5484D]' : 'bg-[#F5A623]/20 text-[#F5A623]';
  const Icon = severity === 'high' ? AlertTriangle : Info;

  return (
    <div className={`bg-card/50 border border-[rgba(255,255,255,0.08)] border-l-4 ${borderColor} rounded-r-lg p-6 flex flex-col gap-4 shadow-sm hover:bg-card/80 transition-colors`} data-testid={`insight-card-${severity}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${badgeBg}`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${badgeBg}`}>
            {severity === 'high' ? 'High Risk' : 'Moderate'}
          </span>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-bold text-white mb-2">{headline}</h3>
        <p className="text-sm text-muted-foreground"><span className="font-semibold text-[rgba(255,255,255,0.7)]">Why this matters:</span> {why}</p>
      </div>

      <div className="bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] rounded p-4 my-2 overflow-x-auto">
        {isLoop ? (
          <div className="flex items-center gap-2 text-sm font-mono text-[rgba(255,255,255,0.8)] whitespace-nowrap">
            <span>↻ {chain.join(" → ")} → (repeats)</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm font-mono text-[rgba(255,255,255,0.8)] whitespace-nowrap">
            {chain.map((step, idx) => (
              <React.Fragment key={idx}>
                <span className="px-2 py-1 bg-[rgba(255,255,255,0.05)] rounded border border-[rgba(255,255,255,0.02)]">{step}</span>
                {idx < chain.length - 1 && <ArrowRight className="w-4 h-4 text-primary shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-md p-4 mt-auto">
        <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Suggested Mitigation</h4>
        <p className="text-sm text-[rgba(255,255,255,0.9)]">{mitigation}</p>
      </div>
    </div>
  );
}
