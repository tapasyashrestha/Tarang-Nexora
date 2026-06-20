import { motion } from "framer-motion";

interface RippleStageProps {
  title: string;
  items: string[];
  delay: number;
}

export function RippleStage({ title, items, delay }: RippleStageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex-1 flex flex-col gap-4 relative"
      data-testid={`ripple-stage-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-[rgba(255,255,255,0.1)] pb-2">{title}</h3>
      <div className="flex flex-col gap-3">
        {items.map((item, idx) => (
          <div key={idx} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] p-4 rounded-md text-sm text-foreground shadow-sm">
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
