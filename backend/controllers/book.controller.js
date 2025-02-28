import cloudinary from "../lib/cloudinary.js";
import Book from "../models/book.model.js";

export const addBook = async (req, res) => {
  const { image, title, subtitle, author, link, review } = req.body;
  const user = req.user;

  try {
    const imageResponse = await cloudinary.uploader.upload(image, {
      folder: "/library",
    });

    const book = await Book.create({
      image: imageResponse.secure_url,
      title,
      subtitle,
      author,
      link,
      review,
      user,
    });

    return res.status(200).json({ book, message: "Book added successfully" });
  } catch (error) {
    console.log("Error from the addBook function", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    console.log("Fetch books function called")
    return res.status(200).json({ books });
  } catch (error) {
    console.log("Error from fetchBooks function", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchBooks = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const books = await Book.find({
      title: { $regex: searchTerm, $options: "i" },
    }).sort({ createdAt: -1 });

    return res.status(200).json({ books });
  } catch (error) {
    console.log("Error from the searchBooks function", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id).populate("user", ["username"]);

    return res.status(200).json({ book });
  } catch (error) {
    console.log("Error from the fetchBook function", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Could not find the book" });
    }

    const parts = book.image.split("/");
    const fileName = parts[parts.length - 1];

    const imageId = fileName.split(".")[0];
    cloudinary.uploader
      .destroy(`library/${imageId}`)
      .then((result) => console.log("Result", result));

    await Book.findByIdAndDelete(id);

    res.status(200).json({ book, success: true });
  } catch (error) {
    console.log("Error from the deleteBook function", error.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const updateBook = async (req, res) => {
  const { image, title, subtitle, author, link, review } = req.body;

  const { id } = req.params;
  try {
    const book = await Book.findById(id);

    if (image) {
      const parts = book.image.split("/");
      const fileName = parts[parts.length - 1];
      const imageId = fileName.split(".")[0];
      cloudinary.uploader
        .destroy(`Favlib/${imageId}`)
        .then((result) => console.log("result: ", result));

      const imageResponse = await cloudinary.uploader.upload(image, {
        folder: "/Favlib",
      });

      const updatedBook = await Book.findByIdAndUpdate(id, {
        image: imageResponse.secure_url,
        title,
        subtitle,
        author,
        link,
        review,
      });

      return res
        .status(200)
        .json({ book: updatedBook, message: "Book updated successfully." });
    }

  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
