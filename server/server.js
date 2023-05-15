const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");

const Product = require('./models/productModel');

const app = express();
app.use(bodyParser.json({ limit: '15mb' }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.use(cors());

app.post('/upload', async (req, res) => {
  console.log("--->",req.body)
  const products = req.body.products;
  const description = req.body.description;

  try {
    // Save the array of products to the database using the Product model
    const product = new Product({ products: products, description: description });
    await product.save();

    res.status(200).send({ message: 'Products uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error saving products to database' });
  }
});


app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    const productList = products.map(product => product.products);
    //const descriptions = products.map(product => product.description);
    const descriptions = products.map(product => ({
      description: product.description,
      _id: product._id
    }));
    const developer = products.map(product => product.developer);
    const status = products.map(product => product.status);
    const comment = products.map(product => product.comment);
    res.status(200).send({ products: productList, descriptions: descriptions, developer: developer, status: status, comment: comment });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error retrieving products from database' });
  }
});

app.get('/model/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Search for the product in the database
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Return the file object ID
    res.json({ fileId: product.file });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



app.put('/developer/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const developer = req.body.developer;

    const updatedProduct = await Product.findByIdAndUpdate(id, { $set: { developer: developer, status: "in-progress" } }, { new: true });
    if (!updatedProduct) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.status(200).send({ message: 'Product developer updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error updating developer for product' });
  }
});

app.put('/status/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status2;

    if (status == "donedone") {
      const comment = null;
      var updatedProduct = await Product.findByIdAndUpdate(id, { $set: { status: status, comment: comment  } }, { new: true });
    } else {
      var updatedProduct = await Product.findByIdAndUpdate(id, { $set: { status: status,  } }, { new: true });
    }

    if (!updatedProduct) {
      return res.status(404).send({ message: 'Not found' });
    }

    res.status(200).send({ message: 'Status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error updating status' });
  }
});

app.put('/comment/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const comment = req.body.comment;

    const updatedProduct = await Product.findByIdAndUpdate(id, { $set: { comment: comment } }, { new: true });
    if (!updatedProduct) {
      return res.status(404).send({ message: 'Not found' });
    }

    res.status(200).send({ message: 'Comment updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error updating Comment' });
  }
});


app.delete('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.status(200).send({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error deleting product' });
  }
});


const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const path = require('path');

// Connect to MongoDB using Mongoose
mongoose
  .connect('mongodb://127.0.0.1:27017/Node-API', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected');
    app.listen(4000, () => {
      console.log('Server is running on port 4000');
    });
  })
  .catch((err) => {
    console.error(err);
  });

// Create GridFS stream
let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db);
});

// Create storage engine
const storage = new GridFsStorage({
  url: 'mongodb://127.0.0.1:27017/Node-API',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: file.originalname,
        bucketName: 'fs',
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

app.post('/fileUpload', upload.single('file'), async (req, res) => {
  try {
    const id = req.body.productId;
    const fileID = req.file.id;

    // Update the existing product document with the new file ID
    const updatedProduct = await Product.findByIdAndUpdate(id, { $set: { file: fileID } }, { new: true });
    if (!updatedProduct) {
      return res.status(404).send({ message: 'Not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});


// const { ObjectId } = require('mongodb');
const { ObjectId } = mongoose.Types;


app.get('/fileDownload/:id', async (req, res) => {
  try {
    const fileId = req.params.id;

    // Fetch the file from GridFS using the provided ID
    const file = await gfs.find({ _id: new ObjectId(fileId) }).toArray();


    if (!file || file.length === 0) {
      return res.status(404).send({ message: 'File not found' });
    }

    // // Set the appropriate content type and send the file data
    // res.set('Content-Type', file[0].contentType);
    // res.set('Content-Disposition', `attachment; filename="${file[0].filename}"`);
    const fileInfo = file[0];
    const filename = fileInfo.filename;
    const contentType = fileInfo.contentType;

    // Set the appropriate content type and send the file data
    res.set('Content-Type', contentType);
    res.set('Content-Disposition', `attachment; filename="${filename}"`);

    const downloadStream = gfs.openDownloadStream(new ObjectId(fileId));
    downloadStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});





  
  
  
  