// ─── MEALS DATA ───────────────────────────────────────────────
export const mealTypes = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];

export const mockMeals = {
  Breakfast: [
    { id: 'MEL-B01', name: 'Idli Sambar',        servings: 200, prepared: 210, served: 195, wasted: 15, cost: 25,   tags: ['South Indian', 'Vegetarian', 'Healthy'] },
    { id: 'MEL-B02', name: 'Bread Butter & Jam',  servings: 150, prepared: 160, served: 148, wasted: 12, cost: 20,   tags: ['Continental', 'Vegetarian'] },
    { id: 'MEL-B03', name: 'Poha',                servings: 180, prepared: 185, served: 178, wasted: 7,  cost: 18,   tags: ['North Indian', 'Vegan'] },
    { id: 'MEL-B04', name: 'Tea / Coffee',         servings: 350, prepared: 360, served: 342, wasted: 18, cost: 10,   tags: ['Beverage', 'Vegetarian'] },
  ],
  Lunch: [
    { id: 'MEL-L01', name: 'Rice + Dal + Sabzi',  servings: 480, prepared: 500, served: 455, wasted: 45, cost: 55,   tags: ['North Indian', 'Vegetarian', 'Complete Meal'] },
    { id: 'MEL-L02', name: 'Chapati + Paneer',     servings: 200, prepared: 220, served: 198, wasted: 22, cost: 65,   tags: ['North Indian', 'Vegetarian'] },
    { id: 'MEL-L03', name: 'Curd Rice',            servings: 150, prepared: 160, served: 142, wasted: 18, cost: 30,   tags: ['South Indian', 'Vegetarian'] },
    { id: 'MEL-L04', name: 'Salad Bar',            servings: 300, prepared: 310, served: 285, wasted: 25, cost: 20,   tags: ['Healthy', 'Vegan', 'Raw'] },
  ],
  Snacks: [
    { id: 'MEL-S01', name: 'Samosa',               servings: 200, prepared: 220, served: 196, wasted: 24, cost: 12,   tags: ['Snack', 'Vegetarian'] },
    { id: 'MEL-S02', name: 'Vada Pav',             servings: 180, prepared: 190, served: 175, wasted: 15, cost: 15,   tags: ['Street Food', 'Vegetarian'] },
    { id: 'MEL-S03', name: 'Chai',                 servings: 280, prepared: 290, served: 272, wasted: 18, cost: 8,    tags: ['Beverage', 'Hot'] },
  ],
  Dinner: [
    { id: 'MEL-D01', name: 'Biryani',              servings: 300, prepared: 330, served: 295, wasted: 35, cost: 85,   tags: ['North Indian', 'Special', 'Vegetarian'] },
    { id: 'MEL-D02', name: 'Roti + Curry',         servings: 250, prepared: 265, served: 238, wasted: 27, cost: 50,   tags: ['North Indian', 'Vegetarian'] },
    { id: 'MEL-D03', name: 'Khichdi',              servings: 120, prepared: 130, served: 118, wasted: 12, cost: 35,   tags: ['Light', 'Vegetarian', 'Healthy'] },
    { id: 'MEL-D04', name: 'Dessert (Kheer)',       servings: 200, prepared: 210, served: 190, wasted: 20, cost: 30,   tags: ['Sweet', 'Vegetarian', 'Festival'] },
  ],
};

export const weeklyMenu = [
  { day: 'Monday',    breakfast: ['Idli Sambar', 'Tea/Coffee'], lunch: ['Rice + Dal + Sabzi', 'Salad'], snacks: ['Samosa', 'Chai'], dinner: ['Roti + Curry', 'Kheer'] },
  { day: 'Tuesday',   breakfast: ['Poha', 'Tea/Coffee'],        lunch: ['Chapati + Paneer', 'Dal'],     snacks: ['Vada Pav', 'Chai'], dinner: ['Biryani', 'Raita'] },
  { day: 'Wednesday', breakfast: ['Bread & Butter', 'Milk'],    lunch: ['Rice + Dal + Sabzi', 'Salad'], snacks: ['Samosa', 'Chai'], dinner: ['Khichdi', 'Papad'] },
  { day: 'Thursday',  breakfast: ['Idli Sambar', 'Coffee'],     lunch: ['Curd Rice', 'Pickle'],         snacks: ['Vada Pav', 'Chai'], dinner: ['Roti + Curry', 'Dessert'] },
  { day: 'Friday',    breakfast: ['Poha', 'Tea'],               lunch: ['Chapati + Paneer', 'Dal'],     snacks: ['Samosa', 'Juice'],  dinner: ['Biryani', 'Salad'] },
  { day: 'Saturday',  breakfast: ['Bread & Butter', 'Tea'],     lunch: ['Rice + Dal', 'Salad'],         snacks: ['Pakoras', 'Chai'],  dinner: ['Special Thali'] },
  { day: 'Sunday',    breakfast: ['Puri Bhaji', 'Coffee'],      lunch: ['Biryani', 'Raita', 'Salad'],   snacks: ['Samosa', 'Chai'],   dinner: ['Chapati + Paneer', 'Kheer'] },
];

export default mockMeals;
