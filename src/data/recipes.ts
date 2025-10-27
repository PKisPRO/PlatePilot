import { Recipe } from '../types/recipe';

export const recipes: Recipe[] = [
  {
    id: 'quinoa-buddha-bowl',
    title: 'Rainbow Quinoa Buddha Bowl',
    description: 'A vibrant, nutrient-packed bowl featuring quinoa, roasted vegetables, and a tahini dressing.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    likes: 0,
    comments: [],
    tags: ['vegetarian', 'vegan', 'gluten-free', 'high-protein'],
    cookingTime: '30',
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '1 cup quinoa',
      '2 cups mixed vegetables (sweet potato, broccoli, bell peppers)',
      '1 can chickpeas',
      '2 tbsp olive oil',
      '1 tbsp tahini',
      '1 lemon',
      'Fresh herbs (optional)',
      'Salt and pepper to taste'
    ],
    steps: [
      'Cook quinoa according to package instructions',
      'Roast vegetables with olive oil at 400°F for 20 minutes',
      'Drain and season chickpeas',
      'Make tahini dressing by mixing tahini, lemon juice, and water',
      'Assemble bowl with quinoa, vegetables, and chickpeas',
      'Drizzle with tahini dressing and garnish with herbs'
    ]
  },
  {
    id: 'salmon-poke-bowl',
    title: 'Fresh Salmon Poke Bowl',
    description: 'A Hawaiian-inspired bowl with fresh salmon, sushi rice, and colorful toppings.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    likes: 0,
    comments: [],
    tags: ['pescatarian', 'high-protein', 'gluten-free'],
    cookingTime: '25',
    servings: 2,
    difficulty: 'Medium',
    ingredients: [
      '8 oz fresh salmon',
      '2 cups sushi rice',
      '1 avocado',
      '1 cucumber',
      '1 carrot',
      '2 tbsp soy sauce',
      '1 tbsp sesame oil',
      'Sesame seeds',
      'Green onions'
    ],
    steps: [
      'Cook sushi rice according to package instructions',
      'Cube salmon into bite-sized pieces',
      'Slice vegetables into thin strips',
      'Mix soy sauce and sesame oil for dressing',
      'Assemble bowl with rice, salmon, and vegetables',
      'Drizzle with dressing and garnish with sesame seeds'
    ]
  },
  {
    id: 'mediterranean-salad',
    title: 'Mediterranean Power Salad',
    description: 'A refreshing salad packed with Mediterranean flavors and healthy fats.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    likes: 0,
    comments: [],
    tags: ['vegetarian', 'mediterranean', 'gluten-free'],
    cookingTime: '15',
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '4 cups mixed greens',
      '1/2 cup cherry tomatoes',
      '1/4 cup feta cheese',
      '1/4 cup kalamata olives',
      '1/4 cup red onion',
      '1/4 cup cucumber',
      '2 tbsp olive oil',
      '1 tbsp balsamic vinegar',
      'Fresh herbs'
    ],
    steps: [
      'Wash and chop all vegetables',
      'Combine greens, tomatoes, olives, and vegetables',
      'Add crumbled feta cheese',
      'Whisk together olive oil and balsamic vinegar',
      'Drizzle dressing over salad',
      'Garnish with fresh herbs'
    ]
  },
  {
    id: 'vegan-buddha-bowl',
    title: 'Vegan Buddha Bowl',
    description: 'A nourishing bowl filled with plant-based proteins and colorful vegetables.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    likes: 0,
    comments: [],
    tags: ['vegan', 'gluten-free', 'high-protein'],
    cookingTime: '35',
    servings: 2,
    difficulty: 'Medium',
    ingredients: [
      '1 cup brown rice',
      '1 block tofu',
      '2 cups mixed vegetables',
      '1 cup chickpeas',
      '2 tbsp tahini',
      '1 lemon',
      'Fresh herbs',
      'Spices (turmeric, cumin, paprika)'
    ],
    steps: [
      'Cook brown rice according to package instructions',
      'Press and cube tofu, then marinate in spices',
      'Roast vegetables and chickpeas',
      'Make tahini dressing',
      'Assemble bowl with rice, tofu, and vegetables',
      'Drizzle with dressing and garnish'
    ]
  },
  {
    id: 'keto-caesar-salad',
    title: 'Keto Caesar Salad',
    description: 'A low-carb twist on the classic Caesar salad with grilled chicken.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    likes: 0,
    comments: [],
    tags: ['keto', 'high-protein', 'gluten-free'],
    cookingTime: '20',
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '2 chicken breasts',
      '4 cups romaine lettuce',
      '1/4 cup parmesan cheese',
      '2 tbsp olive oil',
      '1 egg yolk',
      '1 clove garlic',
      'Anchovy paste',
      'Lemon juice'
    ],
    steps: [
      'Grill chicken breasts until cooked through',
      'Chop romaine lettuce',
      'Make Caesar dressing with egg yolk and olive oil',
      'Slice chicken into strips',
      'Combine lettuce, chicken, and dressing',
      'Top with parmesan cheese'
    ]
  },
  {
    id: 'paleo-bowl',
    title: 'Paleo Power Bowl',
    description: 'A grain-free bowl packed with protein and vegetables.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    likes: 0,
    comments: [],
    tags: ['paleo', 'gluten-free', 'high-protein'],
    cookingTime: '30',
    servings: 2,
    difficulty: 'Medium',
    ingredients: [
      '2 sweet potatoes',
      '1 lb ground turkey',
      '2 cups mixed vegetables',
      '1 avocado',
      '2 tbsp coconut oil',
      'Spices (cinnamon, cumin, paprika)',
      'Fresh herbs'
    ],
    steps: [
      'Cube and roast sweet potatoes',
      'Cook ground turkey with spices',
      'Sauté vegetables in coconut oil',
      'Slice avocado',
      'Assemble bowl with all components',
      'Garnish with fresh herbs'
    ]
  },
  {
    id: 'vegan-curry',
    title: 'Creamy Vegan Curry',
    description: 'A rich and creamy curry made with coconut milk and vegetables.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    likes: 0,
    comments: [],
    tags: ['vegan', 'gluten-free', 'dairy-free'],
    cookingTime: '40',
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      '1 can coconut milk',
      '2 cups mixed vegetables',
      '1 cup chickpeas',
      '2 tbsp curry paste',
      '1 onion',
      '2 cloves garlic',
      'Fresh ginger',
      'Basmati rice'
    ],
    steps: [
      'Sauté onion, garlic, and ginger',
      'Add curry paste and cook until fragrant',
      'Add vegetables and chickpeas',
      'Pour in coconut milk and simmer',
      'Cook rice according to package instructions',
      'Serve curry over rice'
    ]
  },
  {
    id: 'mediterranean-bowl',
    title: 'Mediterranean Grain Bowl',
    description: 'A wholesome bowl featuring ancient grains and Mediterranean flavors.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    likes: 0,
    comments: [],
    tags: ['vegetarian', 'mediterranean', 'gluten-free'],
    cookingTime: '35',
    servings: 2,
    difficulty: 'Medium',
    ingredients: [
      '1 cup farro',
      '1 cup chickpeas',
      '1 cup roasted vegetables',
      '1/4 cup feta cheese',
      '2 tbsp olive oil',
      '1 lemon',
      'Fresh herbs',
      'Kalamata olives'
    ],
    steps: [
      'Cook farro according to package instructions',
      'Roast vegetables with olive oil',
      'Prepare lemon-herb dressing',
      'Combine farro, vegetables, and chickpeas',
      'Add feta cheese and olives',
      'Drizzle with dressing'
    ]
  },
  {
    id: 'keto-burger',
    title: 'Keto Portobello Burger',
    description: 'A low-carb burger using portobello mushrooms as buns.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    likes: 0,
    comments: [],
    tags: ['keto', 'gluten-free', 'low-carb'],
    cookingTime: '25',
    servings: 2,
    difficulty: 'Medium',
    ingredients: [
      '4 portobello mushrooms',
      '2 beef patties',
      '2 slices cheese',
      '1 avocado',
      'Lettuce',
      'Tomato',
      '2 tbsp olive oil',
      'Spices'
    ],
    steps: [
      'Clean and prepare portobello mushrooms',
      'Grill mushrooms until tender',
      'Cook beef patties to desired doneness',
      'Slice vegetables',
      'Assemble burger with mushrooms as buns',
      'Add cheese, vegetables, and condiments'
    ]
  },
  {
    id: 'vegan-pasta',
    title: 'Creamy Vegan Pasta',
    description: 'A dairy-free pasta dish with a creamy cashew sauce.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    likes: 0,
    comments: [],
    tags: ['vegan', 'dairy-free'],
    cookingTime: '30',
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      '1 lb pasta',
      '1 cup cashews',
      '2 cups vegetables',
      '2 cloves garlic',
      '1 lemon',
      'Nutritional yeast',
      'Fresh herbs',
      'Olive oil'
    ],
    steps: [
      'Cook pasta according to package instructions',
      'Soak cashews in hot water',
      'Blend cashews with garlic and lemon',
      'Sauté vegetables',
      'Combine pasta, sauce, and vegetables',
      'Garnish with herbs and nutritional yeast'
    ]
  },
  {
    id: 'paleo-stir-fry',
    title: 'Paleo Stir-Fry',
    description: 'A grain-free stir-fry with plenty of protein and vegetables.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    likes: 0,
    comments: [],
    tags: ['paleo', 'gluten-free', 'high-protein'],
    cookingTime: '25',
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '1 lb chicken breast',
      '3 cups mixed vegetables',
      '2 tbsp coconut aminos',
      '1 tbsp coconut oil',
      'Ginger',
      'Garlic',
      'Green onions',
      'Sesame seeds'
    ],
    steps: [
      'Slice chicken into strips',
      'Prepare vegetables',
      'Heat coconut oil in a wok',
      'Stir-fry chicken until cooked',
      'Add vegetables and sauce',
      'Garnish with green onions and sesame seeds'
    ]
  },
  {
    id: 'mediterranean-pasta',
    title: 'Mediterranean Pasta Salad',
    description: 'A refreshing pasta salad with Mediterranean ingredients.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    likes: 0,
    comments: [],
    tags: ['vegetarian', 'mediterranean'],
    cookingTime: '20',
    servings: 4,
    difficulty: 'Easy',
    ingredients: [
      '1 lb pasta',
      '1 cup cherry tomatoes',
      '1 cucumber',
      '1/4 cup feta cheese',
      '1/4 cup olives',
      '2 tbsp olive oil',
      '1 lemon',
      'Fresh herbs'
    ],
    steps: [
      'Cook pasta according to package instructions',
      'Chop vegetables',
      'Make lemon-herb dressing',
      'Combine pasta and vegetables',
      'Add feta and olives',
      'Drizzle with dressing'
    ]
  },
  {
    id: 'keto-bowl',
    title: 'Keto Power Bowl',
    description: 'A low-carb bowl packed with healthy fats and protein.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    likes: 0,
    comments: [],
    tags: ['keto', 'gluten-free', 'high-protein'],
    cookingTime: '30',
    servings: 2,
    difficulty: 'Medium',
    ingredients: [
      '1 lb steak',
      '2 cups mixed vegetables',
      '1 avocado',
      '2 tbsp olive oil',
      '1/4 cup cheese',
      'Spices',
      'Fresh herbs',
      'Nuts and seeds'
    ],
    steps: [
      'Cook steak to desired doneness',
      'Roast vegetables with olive oil',
      'Slice avocado',
      'Assemble bowl with all components',
      'Add cheese and nuts',
      'Garnish with herbs'
    ]
  },
  {
    id: 'vegan-bowl',
    title: 'Vegan Protein Bowl',
    description: 'A plant-based bowl rich in protein and nutrients.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    likes: 0,
    comments: [],
    tags: ['vegan', 'gluten-free', 'high-protein'],
    cookingTime: '35',
    servings: 2,
    difficulty: 'Medium',
    ingredients: [
      '1 cup quinoa',
      '1 block tempeh',
      '2 cups vegetables',
      '1 cup black beans',
      '2 tbsp tahini',
      '1 lemon',
      'Spices',
      'Fresh herbs'
    ],
    steps: [
      'Cook quinoa according to package instructions',
      'Marinate and cook tempeh',
      'Roast vegetables',
      'Make tahini dressing',
      'Assemble bowl with all components',
      'Drizzle with dressing'
    ]
  },
  {
    id: 'paleo-salad',
    title: 'Paleo Cobb Salad',
    description: 'A grain-free version of the classic Cobb salad.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    likes: 0,
    comments: [],
    tags: ['paleo', 'gluten-free', 'high-protein'],
    cookingTime: '25',
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      '4 cups mixed greens',
      '2 chicken breasts',
      '2 eggs',
      '1 avocado',
      '4 slices bacon',
      '2 tbsp olive oil',
      '1 lemon',
      'Fresh herbs'
    ],
    steps: [
      'Cook chicken and bacon',
      'Hard boil eggs',
      'Chop vegetables',
      'Make lemon-herb dressing',
      'Assemble salad with all components',
      'Drizzle with dressing'
    ]
  }
]; 