import React from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { InsightCard } from "@/components/InsightCard";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function AnomalyDetection() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground">
      <Header />
      
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Detected Risks & Hidden Dependencies</h1>
          <p className="text-muted-foreground text-lg">Effects beyond the obvious outcome</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <InsightCard 
            severity="high"
            headline="Inventory Depletion Risk: Faster delivery promise + 18% order surge may cause 23% of SKUs to stock out within 45 days, reversing the rating gain"
            why="This is a second-order effect not visible in direct price-to-revenue analysis"
            chain={["Order Volume ↑", "Inventory Depletion", "Delivery Delay", "Rating Drop"]}
            mitigation="Increase inventory buffer by 15% for top-50 SKUs before implementing price change. Estimated cost: $42K. Expected savings: $380K in retained ratings."
          />
          <InsightCard 
            severity="high"
            headline="Seller Margin Squeeze: Compressed delivery windows increase fulfillment costs, eroding seller margins by estimated 4–7% for mid-tier sellers"
            why="Mid-tier sellers with thin margins may exit the platform, reducing category depth"
            chain={["Delivery Time ↓", "Fulfillment Costs ↑", "Seller Margin ↓", "Seller Churn", "Category Depth ↓"]}
            mitigation="Offer subsidized last-mile logistics for sellers below $50K/month GMV during the transition period."
          />
          <InsightCard 
            severity="moderate"
            headline="Return Rate Feedback Loop: A reinforcing cycle that could amplify negative effects if return rate exceeds 9%"
            why="Feedback loops are not detectable by linear sensitivity analysis"
            chain={["Return Rate ↑", "Seller Performance ↓", "Marketplace Visibility ↓", "Order Volume ↓", "Seller Lowers Price", "Return Rate ↑"]}
            isLoop={true}
            mitigation="Set a circuit-breaker: automatically pause the price change rollout if return rate exceeds 9% in the first 15 days."
          />
          <InsightCard 
            severity="moderate"
            headline="Marketing Attribution Dilution: +15% spend increase risks overlapping with organic demand spike, inflating ROI metrics"
            why="Misattributed lift could lead to over-investment in paid channels in future cycles"
            chain={["Marketing Spend ↑", "Organic + Paid Overlap", "Attribution Confusion", "ROI Overestimate"]}
            mitigation="Implement incrementality testing (holdout groups) for 20% of the campaign budget."
          />
        </div>

        <div className="flex justify-center border-t border-[rgba(255,255,255,0.08)] pt-10">
          <Link href="/" className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] px-6 py-3 rounded-md font-medium transition-colors" data-testid="link-home">
            <ArrowLeft className="w-4 h-4" /> Back to Dependency Map
          </Link>
        </div>
      </main>
    </div>
  );
}
