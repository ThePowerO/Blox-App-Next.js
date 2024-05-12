export type Combo = {
  id: string;
  authorImage: string;
  authorCreatedAt: Date;
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

type Comment = {

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
