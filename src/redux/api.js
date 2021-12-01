export const API = "https://mybooksv.herokuapp.com";


// USER
export const register_URL= API + "/users/register"
export const login_URL= API + "/users/login"
export const updateUser_URL= API + "/users/update"
export const getNotify_URL= API + "/users/getnotify"


// BOOK
export const getBooks_URL= API + "/books"
export const getBooksHistorys_URL= API +"/books/getBookHistorys"
export const viewBook_URL= API +"/books/view"
export const likeBook_URL= API +"/books/like"
export const saveBook_URL= API +"/books/save"


//POST
export const getAllPosts_URL = API + "/posts/"
export const viewPost_URL = API + "/posts/view"
export const likePost_URL = API + "/posts/like"
export const getPostHistory_URL = API +"/posts/getPostHistory"
export const getUserPost_URL = API +"/posts/userget"
export const addPost_URL = API +"/posts/add"
export const updatePost_URL = API +"/posts/update"
export const deletePost_URL = API +"/posts/delete"

//Comments
export const getComments_URL= API + "/comments/get"
export const createComments_URL= API +"/comments/add"


