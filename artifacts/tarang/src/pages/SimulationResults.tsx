import { Link } from "wouter";
import { Header } from "@/components/Header";
import { KPICard } from "@/components/KPICard";
import { RippleStage } from "@/components/RippleStage";
import { chartData } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { Download, GitCompare, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SimulationResults() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground">
      <Header />
      
      <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 flex flex-col gap-8">
        {/* Top Header Section */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Scenario Results</h1>
            <p className="text-muted-foreground font-mono text-xs mt-2">
              PARAM_SET: [PRICE: -10%] [SLA: -1d] [SPEND: +15%] [INV: 0%] | HORIZON: 90D
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.05)] text-sm font-medium transition-colors" data-testid="button-compare">
              <GitCompare className="w-4 h-4" /> Compare
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.05)] text-sm font-medium transition-colors" data-testid="button-save">
              <Download className="w-4 h-4" /> Save Scenario
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KPICard title="Projected Order Volume" value="14,832 orders" change="+18%" isPositive={true} colorHex="#2DD4A7" />
          <KPICard title="Projected Customer Rating" value="4.6 ★" change="+0.3 ★" isPositive={true} colorHex="#2DD4A7" />
          <KPICard title="Projected Return Rate" value="8.4%" change="+6%" isPositive={true} colorHex="#F5A623" flagged={true} />
          <KPICard title="Projected Platform Revenue" value="$2.84M" change="+12%" isPositive={true} colorHex="#2DD4A7" />
        </div>

        {/* Cascade */}
        <div className="bg-card/30 border border-[rgba(255,255,255,0.05)] rounded-lg p-6">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            Ripple Propagation Cascade
          </h2>
          <div className="flex flex-col md:flex-row gap-6 relative">
            {/* Visual connector lines between columns could go here using pseudo-elements, but flex gap works well enough for abstract */}
            <RippleStage 
              title="Stage 1: Direct Effects" 
              delay={0}
              items={[
                "Product price drops 10% → immediate demand stimulus",
                "Delivery SLA tightens by 1 day → fulfillment pressure increases",
                "Marketing spend +15% → broader reach and impression volume"
              ]} 
            />
            <div className="hidden md:flex flex-col justify-center text-[rgba(255,255,255,0.1)]">
              <ArrowRight className="w-6 h-6" />
            </div>
            <RippleStage 
              title="Stage 2: Secondary Effects" 
              delay={0.3}
              items={[
                "Order volume rises +18% → inventory depletion accelerates",
                "Customer ratings improve +0.3 → seller score uplift",
                "Cart abandonment falls 8% → conversion rate improvement"
              ]} 
            />
            <div className="hidden md:flex flex-col justify-center text-[rgba(255,255,255,0.1)]">
              <ArrowRight className="w-6 h-6" />
            </div>
            <RippleStage 
              title="Stage 3: Downstream Effects" 
              delay={0.6}
              items={[
                "Restocking delays emerge in 23% of SKUs → partial delivery offset",
                "Rating gain partially eroded by stockout-related delays",
                "Platform revenue +12% net positive after tradeoffs"
              ]} 
            />
          </div>
        </div>

        {/* Chart */}
        <div className="bg-card/30 border border-[rgba(255,255,255,0.05)] rounded-lg p-6">
          <h2 className="text-lg font-bold mb-6">90-Day Platform Revenue Forecast</h2>
          <div className="h-[300px] w-full" data-testid="revenue-chart">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B9EFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B9EFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} minTickGap={30} />
                <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'monospace'}} tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0A0E14', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '6px' }}
                  itemStyle={{ fontFamily: 'monospace' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                />
                
                <Area type="monotone" dataKey="confidenceMax" stroke="none" fill="url(#colorProjected)" fillOpacity={0.4} />
                <Area type="monotone" dataKey="confidenceMin" stroke="none" fill="#0A0E14" fillOpacity={1} />
                
                <Line type="monotone" dataKey="baseline" name="Baseline (No Change)" stroke="#6B7280" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                <Line type="monotone" dataKey="projected" name="Projected (With Changes)" stroke="#3B9EFF" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Link href="/anomalies" className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-500 border border-amber-500/30 px-6 py-3 rounded-md font-bold hover:bg-amber-500/20 transition-colors" data-testid="button-view-anomalies">
              View Detected Risks <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
