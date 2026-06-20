export interface NodeData {
  id: string;
  label: string;
  group: 'central' | 'mid' | 'outer';
  size: number;
  description: string;
  affects: string[];
}

export interface EdgeData {
  source: string;
  target: string;
  type: 'positive' | 'negative';
}

export const nodes: NodeData[] = [
  { id: 'product_price', label: 'Product Price', group: 'central', size: 30, description: 'Average listed price of products in the marketplace. Primary driver of demand elasticity and customer acquisition.', affects: ['order_volume', 'customer_ratings', 'cart_abandonment', 'marketing_spend'] },
  { id: 'delivery_time', label: 'Delivery Time', group: 'central', size: 28, description: 'Average days from order placement to delivery. Strongly influences customer satisfaction and repeat purchase behavior.', affects: ['customer_ratings', 'cart_abandonment', 'repeat_purchase'] },
  { id: 'marketing_spend', label: 'Marketing Spend', group: 'central', size: 26, description: 'Total budget allocated to paid acquisition, promotions, and retargeting campaigns.', affects: ['order_volume', 'cart_abandonment', 'platform_revenue'] },
  { id: 'customer_ratings', label: 'Customer Ratings', group: 'mid', size: 20, description: 'Average user satisfaction score.', affects: ['repeat_purchase', 'seller_performance', 'platform_revenue'] },
  { id: 'order_volume', label: 'Order Volume', group: 'mid', size: 22, description: 'Total number of items purchased.', affects: ['inventory_levels', 'platform_revenue', 'seller_performance'] },
  { id: 'inventory_levels', label: 'Inventory Levels', group: 'mid', size: 18, description: 'Amount of stock across fulfillment centers.', affects: ['delivery_time', 'return_rate'] },
  { id: 'cart_abandonment', label: 'Cart Abandonment Rate', group: 'mid', size: 16, description: 'Percentage of carts abandoned before checkout.', affects: ['order_volume', 'platform_revenue'] },
  { id: 'seller_performance', label: 'Seller Performance Score', group: 'mid', size: 17, description: 'Internal rating of merchant quality.', affects: ['customer_ratings', 'order_volume', 'platform_revenue'] },
  { id: 'customer_ltv', label: 'Customer Lifetime Value', group: 'outer', size: 14, description: 'Expected total revenue from a single customer.', affects: ['platform_revenue'] },
  { id: 'return_rate', label: 'Return Rate', group: 'outer', size: 13, description: 'Percentage of orders returned.', affects: ['seller_performance', 'customer_ratings'] },
  { id: 'repeat_purchase', label: 'Repeat Purchase Rate', group: 'outer', size: 15, description: 'Likelihood of a customer returning to buy again.', affects: ['customer_ltv', 'platform_revenue'] },
  { id: 'platform_revenue', label: 'Platform Revenue', group: 'outer', size: 14, description: 'Overall topline net revenue for the marketplace.', affects: [] }
];

export const edges: EdgeData[] = nodes.flatMap(node => 
  node.affects.map(target => {
    // some negative logic
    let type: 'positive' | 'negative' = 'positive';
    if (node.id === 'delivery_time' && target === 'customer_ratings') type = 'negative';
    if (node.id === 'inventory_levels' && target === 'delivery_time') type = 'negative';
    if (node.id === 'return_rate' && target === 'seller_performance') type = 'negative';
    if (node.id === 'product_price' && target === 'cart_abandonment') type = 'positive'; // logically, higher price -> higher abandonment, so positive correlation, but wait. The visual needs positive/reinforcing = cyan, negative/inverse = amber.
    // Negative edges specified: delivery->ratings, inventory->delivery, return->seller. Let's strictly use those.
    return { source: node.id, target, type };
  })
);

export const generateChartData = () => {
  const data = [];
  let baseline = 950000;
  let projected = 945000; // starts slightly lower
  
  for (let i = 1; i <= 90; i++) {
    // baseline grows slowly with small noise
    baseline = baseline * (1 + 0.0005) + (Math.random() - 0.5) * 5000;
    
    // projected dips then overtakes
    if (i <= 5) {
      projected = projected * 0.999 + (Math.random() - 0.5) * 5000;
    } else if (i <= 8) {
      projected = projected * 1.01 + (Math.random() - 0.5) * 5000;
    } else {
      projected = projected * 1.0025 + (Math.random() - 0.5) * 5000;
    }
    
    data.push({
      day: `Day ${i}`,
      baseline: Math.round(baseline),
      projected: Math.round(projected),
      confidenceMin: Math.round(projected * 0.95),
      confidenceMax: Math.round(projected * 1.05)
    });
  }
  return data;
};

export const chartData = generateChartData();
