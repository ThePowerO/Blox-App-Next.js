export type Combo = {
  id: string;
  authorImage: string;
  authorCreatedAt: Date;
  authorEmail: string;
  difficulty: string;
  author: string;
  combotitle: string;
  combodescription: string;
  fightingstyle: string;
  fruit: string;
  sword: string;
  weapon: string;
  slug: string;
  specialty: string;
  createdAt: Date;
  updatedAt: Date;
  mainStats: string;
  race: string;
  comboVideo: string;
  favorites: Favorite[]; // Agora `favorites` é definido como um array de `Favorite`
  likes: Like[];
  comments: Comment[];
  user: {
    name: string | null;
    image: string | null;
    id: string;
  };
};

export type Comment = {
  id: string;
  text: string;
  comboId: string;
  userId: string;
  user: {
    name: string | null;
    image: string | null;
    id: string;
  };
  likes: CommentLike[];
  updatedAt: Date;
  createdAt: Date;
}

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: Date;
  favorites: Favorite[];
  comments: Comment[];
  likedCombos: Like[];
  commentLikes: CommentLike[];

}

export type Like = {
  comboId: string;
  userId: string;
  createdAt: Date;
};

export type CommentLike = {
  id: string;
  commentId: string;
  userId: string;
  createdAt: Date;
};

export type Favorite = {
  id: string;
  comboId: string;
  userId: string;
  createdAt: Date;
};