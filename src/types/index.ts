export type CreateUserRequestBody = {
  username: string;
  email: string;
  password: string;
};

export type CreateBookRequestBody = {
  author_id: string;
  book_name: string;
  book_content: string;
};

export type GetBookRequestBody = {
  book_id: string;
  book_name: string;
  book_content: string;
};
