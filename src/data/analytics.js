// ─── ANALYTICS DATA ───────────────────────────────────────────

export const wasteByMonth = [
  { month: 'Mar', waste: 142, reduced: 28, target: 120 },
  { month: 'Apr', waste: 168, reduced: 35, target: 120 },
  { month: 'May', waste: 124, reduced: 42, target: 115 },
  { month: 'Jun', waste: 89,  reduced: 55, target: 110 },
  { month: 'Jul', waste: 108, reduced: 48, target: 105 },
  { month: 'Aug', waste: 96,  reduced: 62, target: 100 },
  { month: 'Sep', waste: 78,  reduced: 71, target: 95  },
];

export const wasteByCategory = [
  { category: 'Rice/Grains', kg: 185, percentage: 28, color: '#10b981' },
  { category: 'Vegetables',  kg: 132, percentage: 20, color: '#2563eb' },
  { category: 'Dal/Protein', kg: 99,  percentage: 15, color: '#8b5cf6' },
  { category: 'Dairy',       kg: 86,  percentage: 13, color: '#f59e0b' },
  { category: 'Bread/Bakery',kg: 66,  percentage: 10, color: '#06b6d4' },
  { category: 'Fruits',      kg: 46,  percentage: 7,  color: '#ec4899' },
  { category: 'Others',      kg: 46,  percentage: 7,  color: '#94a3b8' },
];

export const consumptionTrend = [
  { day: 'Mon', prepared: 480, served: 440, wasted: 40 },
  { day: 'Tue', prepared: 520, served: 495, wasted: 25 },
  { day: 'Wed', prepared: 460, served: 430, wasted: 30 },
  { day: 'Thu', prepared: 510, served: 480, wasted: 30 },
  { day: 'Fri', prepared: 540, served: 490, wasted: 50 },
  { day: 'Sat', prepared: 360, served: 330, wasted: 30 },
  { day: 'Sun', prepared: 300, served: 285, wasted: 15 },
];

export const locationWaste = [
  { location: 'Main Canteen',      waste: 245, reports: 32, status: 'High' },
  { location: 'Hostel A Mess',     waste: 178, reports: 24, status: 'Medium' },
  { location: 'Hostel B Mess',     waste: 156, reports: 19, status: 'Medium' },
  { location: 'Hostel C Mess',     waste: 132, reports: 15, status: 'Medium' },
  { location: 'Faculty Canteen',   waste: 89,  reports: 11, status: 'Low' },
  { location: 'Event Hall',        waste: 67,  reports: 8,  status: 'Low' },
  { location: 'Library Cafeteria', waste: 45,  reports: 6,  status: 'Low' },
];

export const sustainabilityMetrics = {
  totalWasteReduced: 482,   // kg
  co2Saved: 1205,           // kg CO2 equivalent
  mealsRedistributed: 2840,
  waterSaved: 9640,         // liters
  treesEquivalent: 18,
  moneySaved: 96400,        // INR
  activeReporters: 287,
  wasteReductionPercent: 34,
};

export const monthlyImpact = [
  { month: 'Mar', co2: 285, meals: 340, water: 1140 },
  { month: 'Apr', co2: 340, meals: 420, water: 1680 },
  { month: 'May', co2: 310, meals: 380, water: 1520 },
  { month: 'Jun', co2: 275, meals: 340, water: 1360 },
  { month: 'Jul', co2: 260, meals: 320, water: 1280 },
  { month: 'Aug', co2: 245, meals: 340, water: 1360 },
  { month: 'Sep', co2: 220, meals: 310, water: 1240 },
];

export const studentStats = {
  mealsConsumed: 287,
  foodWasteKg: 2.4,
  reportsSubmitted: 14,
  surplusAccessed: 6,
  sustainabilityPoints: 320,
  rank: 47,
  totalStudents: 2840,
  co2Saved: 6.1,
};

export const canteenStats = {
  mealsPrepared: 3420,
  mealsServed: 3180,
  foodConsumedKg: 1245,
  foodWastedKg: 186,
  surplusKg: 89,
  wastePercentage: 5.4,
  efficiency: 94.6,
  revenue: 342000,
  wastedValue: 18600,
};

export const workerStats = {
  assignedTasks: 8,
  completedTasks: 6,
  wasteCollectedKg: 142,
  surplusCollectedKg: 56,
  locationsVisited: 7,
  avgCompletionTime: '2.3 hrs',
};

export const achievements = [
  { id: 'ACH-001', title: 'Waste Warrior',         description: 'Reported 10+ waste incidents',    icon: '⚔️',  earned: true,  earnedAt: '2024-08-15', points: 100 },
  { id: 'ACH-002', title: 'Green Campus',           description: 'Participated in 5 sustainability events', icon: '🌿', earned: true, earnedAt: '2024-07-20', points: 150 },
  { id: 'ACH-003', title: 'Food Saver',             description: 'Saved 50 meals from surplus',    icon: '🍱',  earned: true,  earnedAt: '2024-09-01', points: 200 },
  { id: 'ACH-004', title: 'Zero Waste Champion',    description: 'Zero plate waste for 30 days',   icon: '🏆',  earned: false, earnedAt: null,          points: 300 },
  { id: 'ACH-005', title: 'Sustainability Leader',  description: 'Top 10 sustainability scorer',   icon: '🌱',  earned: false, earnedAt: null,          points: 500 },
  { id: 'ACH-006', title: 'Early Reporter',         description: 'First 50 reporters on platform', icon: '🔔',  earned: true,  earnedAt: '2024-06-10', points: 75  },
];

export default {
  wasteByMonth,
  wasteByCategory,
  consumptionTrend,
  locationWaste,
  sustainabilityMetrics,
  monthlyImpact,
  studentStats,
  canteenStats,
  workerStats,
  achievements,
};
