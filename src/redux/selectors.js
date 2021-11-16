//User
export const UserLoggedIn = (state) => state.userReducer; 

//Book
export const AllBooks = (state) => state.bookReducer.books;
export const AllBooksHistory = (state) => state.bookReducer.history;
export const AllBooksViewData = (state) => state.bookReducer.booksViewData;

//Post 
export const AllPosts = (state) => state.postReducer.posts;

//comments
export const BookComments = (state) => state.bookReducer.comments;