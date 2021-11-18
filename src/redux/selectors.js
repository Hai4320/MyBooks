//User
export const UserLoggedIn = (state) => state.userReducer; 

//Book
export const AllBooks = (state) => state.bookReducer.books;
export const AllBooksHistory = (state) => state.bookReducer.history;
export const AllBooksViewData = (state) => state.bookReducer.booksViewData;

//Post 
export const AllPosts = (state) => state.postReducer.posts;
export const AllPostHistory = (state) => state.postReducer.history;
export const AllPostsViewData = (state) => state.postReducer.postViewData;
export const MyPosts = (state) => state.postReducer.myPosts

//comments
export const BookComments = (state) => state.bookReducer.comments;
export const PostComments = (state) => state.postReducer.comments;