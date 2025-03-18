export interface Post {
  id: string;
  header: string;
  content: string;
  comments: string[];
}

export interface CreatePost {
  header: string;
  content: string;
}
