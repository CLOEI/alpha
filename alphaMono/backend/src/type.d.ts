type Context = {
  user: User | null;
};

type User = {
  id: number;
  username: string;
  role: string;
};
