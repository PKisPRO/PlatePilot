export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  likes: number;
  comments: Comment[];
  tags: string[];
  cookingTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  steps: string[];
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  date: string;
} 