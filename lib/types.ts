import { comboHighlight } from "@prisma/client";

export type Combo = {
  id: string;
  userId: string;
  highlight: comboHighlight
  isAutoRenovate: boolean;
  difficulty: string;
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
    id: string;
    name: string | null;
    image: string | null;
    createdAt: Date;
    description: string | null;
  };
};

export type Comment = {
  id: string;
  text: string;
  comboId: string;
  userId: string;
  replies: Replies[];
  user: {
    id: string;
    name: string | null;
    image: string | null;
    createdAt: Date;
  };
  likes: CommentLike[];
  updatedAt: Date;
  createdAt: Date;
}

// For CombosDisplay especifically
export type CommentCBDisplay = {
  id: string;
  text: string;
  comboId: string;
  userId: string;
  replies: Replies[];
  user: {
    id: string;
    name: string | null;
    image: string | null;
    createdAt: Date;
  };
  combo: Combo;
  likes: CommentLike[];
  updatedAt: Date;
  createdAt: Date;
}

export type Replies = {
  id: string;
  parentId: string;
  text: string;
  userId: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
    createdAt: Date;
  }
  likes: ReplyLike[];
  updatedAt: Date;
  createdAt: Date;
}


export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isPlusPack: boolean;
  emailVerified: Date;
  favorites: Favorite[];
  comments: Comment[];
  likedCombos: Like[];
  replyLikes: ReplyLike[];
  commentLikes: CommentLike[];
  commentReplies: Replies[];
  Combo: Combo[];
}

export type Like = {
  id: string;
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

export type ReplyLike = {
  id: string;
  replyId: string;
  userId: string;
  createdAt: Date;
};

export type Favorite = {
  id: string;
  comboId: string;
  userId: string;
  createdAt: Date;
};