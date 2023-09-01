const Product = require("../models/Product");
// CREATE
exports.CreateProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).send(savedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
};
//UPADATE
exports.EditProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedProduct);
  } catch (err) {
    res.status(500).send(err);
  }
};
//DELETE
exports.DeleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("Product has been deleted ...");
  } catch (error) {
    res.status(500).send("server error");
  }
};
//GET PRODUCT
exports.GetProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send("server error");
  }
};
//GET ALL PRODUCTS
exports.GetAllProduct = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

// const getAll = async (req, res) => {
//   try {
//     const fetch = await Product.find();
//     res.send(fetch);
//   } catch (error) {
//     res.status(500).send({ message: error.message || "Server error" });
//   }
// };
// const getById = async (req, res) => {
//   try {
//     const fetch = await Product.findByID(req.params.id);
//     res.send(fetch);
//   } catch (error) {
//     res.status(500).send({ message: error.message || "Server error" });
//   }
// };
// const createOne = async (req, res) => {
//   try {
//     await Product.create(req.body);
//     res.send({ message: "Created successfully" });
//   } catch (error) {
//     res.status(500).send({ message: error.message || "Server error" });
//   }
// };
// const updateOne = async (req, res) => {
//   try {
//     await Product.findByIdAndUpdate(req.params.id, req.body);
//     res.send(fetch);
//   } catch (error) {
//     res.status(500).send({ message: error.message || "Server error" });
//   }
// };
// const deleteOne = async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.send({ message: "deleted successfuly!" });
//   } catch (error) {
//     res.status(500).send({ message: error.message || "Server error" });
//   }
// };
