export type CreateUserRequestBody = {
  username: string;
  email: string;
  password: string;
};

export type CreateBookRequestBody = {
  bookName: string;
  bookContent: string;
};

export type GetBookRequestBody = {
  book_id: string;
  book_name: string;
  book_content: string;
};

export type apiJson = {
  success: boolean;
  message?: string;
  content?: any;
};

export type bookCard = {
  bookId: string;
  bookName: string;
};

export type bookFullContent = {
  bookName: string;
  bookContent: string;
};

export type bookCardsJson = apiJson & {
  content: bookCard[];
};

export type bookFullContentJson = apiJson & {
  content: bookFullContent;
};
