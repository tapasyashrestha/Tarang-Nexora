import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  colorHex: string;
  flagged?: boolean;
}

export function KPICard({ title, value, change, isPositive, colorHex, flagged }: KPICardProps) {
  const Icon = isPositive ? ArrowUpRight : ArrowDownRight;
  
  return (
    <div className={`p-5 rounded-lg border bg-card/50 ${flagged ? 'border-amber-500/30 shadow-[0_0_15px_rgba(245,166,35,0.1)]' : 'border-[rgba(255,255,255,0.08)]'}`} data-testid={`kpi-card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <h4 className="text-sm font-medium text-muted-foreground mb-3">{title}</h4>
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-3xl font-bold tracking-tight text-white">{value}</span>
        <div className="flex items-center gap-1 text-sm font-bold font-mono" style={{ color: colorHex }}>
          <Icon className="w-4 h-4" />
          <span>{change}</span>
        </div>
      </div>
      {flagged && (
        <div className="mt-3 text-xs text-amber-500 font-medium">⚠️ Flagged as tradeoff</div>
      )}
    </div>
  );
}
