export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}

export interface AvatarState {
  skinColor: string;
  hairStyle: string;
  hairColor: string;
  eyeColor: string;
  outfit: string;
}
