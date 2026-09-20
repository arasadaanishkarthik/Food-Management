// ─── INVENTORY DATA ───────────────────────────────────────────
export const inventoryCategories = ['Grains', 'Vegetables', 'Dairy', 'Protein', 'Bakery', 'Fruits', 'Beverages', 'Spices'];

export const inventoryStatuses = ['In Stock', 'Low Stock', 'Critical', 'Out of Stock', 'Expired'];

export const mockInventory = [
  { id: 'INV-001', item: 'Basmati Rice',    category: 'Grains',     unit: 'kg',  purchased: 200, used: 145, remaining: 55, minStock: 30,  expiryDate: '2024-11-30', status: 'In Stock',   supplier: 'AgroSupply Co.',   costPerUnit: 65,   image: '🍚' },
  { id: 'INV-002', item: 'Whole Wheat Flour',category: 'Grains',     unit: 'kg',  purchased: 100, used: 82,  remaining: 18, minStock: 20,  expiryDate: '2024-10-15', status: 'Low Stock',  supplier: 'Mills Direct',     costPerUnit: 45,   image: '🌾' },
  { id: 'INV-003', item: 'Tomatoes',         category: 'Vegetables', unit: 'kg',  purchased: 60,  used: 54,  remaining: 6,  minStock: 10,  expiryDate: '2024-09-20', status: 'Critical',   supplier: 'Farm Fresh',       costPerUnit: 40,   image: '🍅' },
  { id: 'INV-004', item: 'Potatoes',         category: 'Vegetables', unit: 'kg',  purchased: 80,  used: 55,  remaining: 25, minStock: 15,  expiryDate: '2024-10-05', status: 'In Stock',   supplier: 'Farm Fresh',       costPerUnit: 30,   image: '🥔' },
  { id: 'INV-005', item: 'Whole Milk',       category: 'Dairy',      unit: 'L',   purchased: 150, used: 140, remaining: 10, minStock: 20,  expiryDate: '2024-09-17', status: 'Critical',   supplier: 'Dairy Hub',        costPerUnit: 55,   image: '🥛' },
  { id: 'INV-006', item: 'Paneer',           category: 'Dairy',      unit: 'kg',  purchased: 30,  used: 22,  remaining: 8,  minStock: 5,   expiryDate: '2024-09-19', status: 'In Stock',   supplier: 'Dairy Hub',        costPerUnit: 280,  image: '🧀' },
  { id: 'INV-007', item: 'Yellow Dal',       category: 'Protein',    unit: 'kg',  purchased: 80,  used: 60,  remaining: 20, minStock: 15,  expiryDate: '2024-12-31', status: 'In Stock',   supplier: 'Pulse Traders',    costPerUnit: 120,  image: '🫘' },
  { id: 'INV-008', item: 'Bread Loaves',     category: 'Bakery',     unit: 'pcs', purchased: 200, used: 195, remaining: 5,  minStock: 20,  expiryDate: '2024-09-17', status: 'Critical',   supplier: 'City Bakery',      costPerUnit: 40,   image: '🍞' },
  { id: 'INV-009', item: 'Bananas',          category: 'Fruits',     unit: 'kg',  purchased: 40,  used: 38,  remaining: 2,  minStock: 8,   expiryDate: '2024-09-18', status: 'Critical',   supplier: 'Fruit Market',     costPerUnit: 35,   image: '🍌' },
  { id: 'INV-010', item: 'Apples',           category: 'Fruits',     unit: 'kg',  purchased: 25,  used: 18,  remaining: 7,  minStock: 5,   expiryDate: '2024-09-25', status: 'In Stock',   supplier: 'Fruit Market',     costPerUnit: 120,  image: '🍎' },
  { id: 'INV-011', item: 'Cooking Oil',      category: 'Spices',     unit: 'L',   purchased: 50,  used: 35,  remaining: 15, minStock: 10,  expiryDate: '2025-03-31', status: 'In Stock',   supplier: 'Edible Oils Ltd.', costPerUnit: 150,  image: '🫙' },
  { id: 'INV-012', item: 'Tea Leaves',       category: 'Beverages',  unit: 'kg',  purchased: 10,  used: 7,   remaining: 3,  minStock: 2,   expiryDate: '2024-12-31', status: 'In Stock',   supplier: 'Tea Gardens',      costPerUnit: 600,  image: '🍵' },
  { id: 'INV-013', item: 'Onions',           category: 'Vegetables', unit: 'kg',  purchased: 70,  used: 68,  remaining: 2,  minStock: 10,  expiryDate: '2024-09-30', status: 'Critical',   supplier: 'Farm Fresh',       costPerUnit: 35,   image: '🧅' },
  { id: 'INV-014', item: 'Sugar',            category: 'Spices',     unit: 'kg',  purchased: 40,  used: 28,  remaining: 12, minStock: 8,   expiryDate: '2025-06-30', status: 'In Stock',   supplier: 'Sugar Mills',      costPerUnit: 45,   image: '🍬' },
  { id: 'INV-015', item: 'Turmeric Powder',  category: 'Spices',     unit: 'kg',  purchased: 5,   used: 3.5, remaining: 1.5,minStock: 1,   expiryDate: '2024-12-31', status: 'In Stock',   supplier: 'Spice World',      costPerUnit: 180,  image: '🫚' },
];

export const inventorySummary = {
  totalItems: 15,
  inStock: 8,
  lowStock: 1,
  critical: 5,
  outOfStock: 0,
  expiringSoon: 4,
  totalValue: 87450,
  wastedValue: 12300,
};

export default mockInventory;
