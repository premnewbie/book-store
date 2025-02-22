import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

export const useBookStore = create((set) => ({
    book: null,
    books: [],
    isLoading: false,

    addBook: async (image,title,subtitle,author,link,review) => {
        set({isLoading: true})
        try {
            const response = await axios.post(`${API_URL}/auth/add-book`,{
                image,title,subtitle,author,link,review
            })
            const {message,book} = response.data;
            return {message,book};
        } catch (error) {
            console.log("Error from the add book funtion in bookStore",error.response)
            toast.error("Error Adding Book")
        } finally{
            set({isLoading: false})
        }
    },

    fetchBooks: async() => {
        set({isLoading: true})
        try {
            const response = await axios.get(`${API_URL}/auth/fetch-books`);
            set({books: response.data.books})
        } catch (error) {
            console.log("Error in fetchBooks function from bookStore",error.response.data.message);
            toast.error("Error fetching books");
        }finally{
            set({isLoading: false});
        }
    },

    searchBooks: async(search) => {
        set({isLoading: true});
        try {
            const response = await axios.get(`${API_URL}/auth/search-books?${search}`);
            console.log("console from searchTerms",search);
            set({books: response.data.books})
        } catch (error) {
            console.log("Error from the searchBooks function in bookStore",error.response.data.message);
        }finally{
            set({isLoading: false})
        }
    },

    fetchBook: async(id) => {
        set({isLoading: true})
        try {
            const response = await axios.get(`${API_URL}/auth/fetch-book/${id}`)
            set({book: response.data.book})
        } catch (error) {
            console.log("Error in fetchBook function from bookStore",error.response.data.message);
            toast.error("Error fetching book");
        }finally{
            set({isLoading: false})
        }
    },

    deleteBook: async(bId) => {
        set({isLoading: true});
        try {
            const response = await axios.delete(`${API_URL}/auth/delete-book/${bId}`);

            if(!response.data.success){
                toast.error("Could not delete the book");
                return;
            }

            set((state) => ({books: state.books.filter((book) => book._id !== bId )}))
            toast.success("Book deleted successfully")
        } catch (error) {
            console.log("Error in deleteBook function from bookStore",error.response.data.message);
            toast.error("Could not delete the book");
        }finally{
            set({isLoading: false})
        }
    },
    updateBook: async (id, image, title, subtitle, author, link, review) => {
        set({ isLoading: true});
    
        try {
          const response = await axios.put(`${API_URL}/auth/update-book/${id}`, {
            image,
            title,
            subtitle,
            author,
            link,
            review,
          });
    
          const { message, book } = await response.data;
          set({ book });
          toast.success(message)
        } catch (error) {
          console.log("Error from updateBook function in BookStore",error)
        }finally{
            set({isLoading: false})
        }
      },
    
}))
