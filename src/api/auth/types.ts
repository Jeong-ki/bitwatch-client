interface IUsersRes {
  data: {
    id: number;
    email: string;
    password: string;
    role: string;
    first_name: string;
    last_name: string;
    created_at: string;
    updated_at: string;
  }[];
}
