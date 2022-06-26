export interface BlogDTO {
  author: string;
  authorImage: string;
  blogImage: string;
  category: string;
  createdAt: string;
  id: string;
  readTime: number;
  subTitle: string;
  title: string;
  children?: React.ReactNode;
}
