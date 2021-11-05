const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
var validator = require("email-validator");

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require ('bcrypt');
const saltRounds = 10;

const jwt = require ('jsonwebtoken');

const multer = require ('multer');
const path = require('path');
const e = require('express');
const { default: axios } = require('axios');

const app = express();

app.use(express.json());
app.use(cors({ 
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

app.use(cookieParser());
 app.use(bodyParser.urlencoded({ extended: true}));

app.use(session({
    key: "userID",
    secret: "super_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1000 * 60 * 60 * 24
    },
}));

const db = mysql.createConnection({
    user: "root",
    host:"localhost",
    port: 3306,
    password: "",
    database:"booknook_db",
    dateStrings: true
});

app.post('/signup', (req, res) => {
  const user_name = req.body.user_name;
  const user_email = req.body.user_email;
  const user_password = req.body.user_password;
  let errors = [];
  
  if (!user_name || !user_email || !user_password){
    errors.push({message: 'Please fill in all the fields.'});
    res.send({message: "Please fill in all the fields."});
  }

  if (validator.validate(user_email) == false){
    errors.push({message: 'Email format is invalid.'});
    res.send({message: "Email format is invalid."});
  }

  if (user_password.length < 6){
    errors.push({message: 'Password should be atleast 6 characters.'});
    res.send({message: "Password should be atleast 6 characters."});
  }

  if (errors.length == 0){

    db.query(
      "SELECT user_email FROM users WHERE user_email = ?",
      user_email, (err, result) =>{
        if (result.length > 0){
          res.send({message: "The email is already existed in the database!"});
        }else{
          bcrypt.hash(user_password, saltRounds, (err, hash) => {
      
            if (err){
              console.log(err);
            }
      
            db.query(
              "INSERT INTO users (user_name, user_email, user_password) VALUES (?,?,?)",
              [user_name, user_email, hash],
              (err, result) => {
                if(err){
                console.log(err);
                }else{
                  res.send({message:'Registered successfully!'});
                }
              } 
            );
          });
        }
      }
    );
  }
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if (!token){
      res.send("We need a token.")
    }
    else{
      jwt.verify(token, "jwtSecret", (err, decoded) => {
        if (err){
          res.json({auth: false, message: "You failed to authenticate"});
        }
        else{
          req.user_id = decoded.id;
            next();
        }
      });
    }
}

app.get('/isUserAuth', verifyJWT, (req, res) => {
    res.json(req.session.user);
});

app.get('/login', (req, res) => {
    if (req.session.user) {
      res.send({loggedIn: true, user: req.session.user});
    }
    else{
        res.send({loggedIn: false});
    }
});

app.post('/login', (req,res) => {
  const user_email = req.body.user_email;
  const user_password = req.body.user_password;

  if (!user_email || !user_password){
    res.json({auth:false, message: 'Please fill in all the fields!'});
  }else if (user_email === 'admin@gmail.com' && user_password === 'password'){
    res.json({auth:true, role:'admin'});
  }else{
  db.query(
    "SELECT * FROM users WHERE user_email = ?;",
    user_email,
    (err, result) => {
      if (err){
        res.send({err: err});
      }
      if(result.length > 0){
        bcrypt.compare(user_password, result[0].user_password, (error, response) => {
          if (response){
            
            const id = result[0].user_id;
            const token = jwt.sign({id}, "jwtSecret", 
            {
              expiresIn:1000 * 60 * 60 * 24
            });
            req.session.user = result;
            res.json({auth: true, token: token, result: result});

          }else{
            res.json({auth: false, message: "Incorrect password!"});
          }
        });
      }else{
        res.json({auth:false, message: 'User does not exist!'});
      }
      
    }      
  );
  }
});
        
app.get('/profile', (req, res) =>{

    if (req.session.user){
        res.json({user: req.session.user});
    }
    else{
        res.send("No user found");
    }
});

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    if (file.fieldname === 'image'){
      callBack(null, './images/');
    }else{
      callBack(null, './e-book/');
    } 
  },
  filename: (req, file, callBack) => {
    if (file.fieldname === 'image'){
          callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) 
    }else{
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) 
    }
  }
});

var upload = multer({
  storage: storage
});

var multipleUpload = upload.fields([{
  name: 'image', maxCount: 1
}, {
  name: 'file', maxCount: 1
}]);

app.post('/admin_add', multipleUpload, (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const age = req.body.age;
  const image = req.files.image[0];
  const file = req.files.file[0];
  
  if (!req.files){
    console.log("No file uploaded")
  }else{
    console.log("Files uploaded.")
    console.log(req.files);
    if (image){
      var imgsrc =  req.files.image[0].filename;
    }
    if (file){
      var filesrc =  req.files.file[0].filename;
    }
    
    db.query(
      "INSERT INTO books(book_title, book_desc,  book_author, book_cover, book_age, book_file) VALUES (?,?,?,?,?,?)",
      [title, description, author, imgsrc, age,filesrc],
      (err, result) => {
        if (err){
          console.log(err);
        }         
      }
    )
    console.log("Files uploaded.");

  }
  }
);

app.use('/images', express.static(path.resolve(__dirname, './images')));

app.use('/e-book', express.static(path.resolve(__dirname, './e-book')));

app.get('/admin_books', (req, res) => {
  const sqlSelect = "SELECT * FROM books";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get('/admin_images/:filename', (req, res) => {
  res.sendFile(req.params.filename, {root: path.join(__dirname, '/images')});
});

app.get('/admin_files/:filename', (req, res) => {
  res.sendFile(req.params.filename, {root: path.join(__dirname, '/e-book')});
});


app.delete('/delete_book/:book_id', (req, res) => {
  const id = req.params.book_id;
  const sqlDelete = "DELETE FROM books WHERE book_id = ?";

  db.query(sqlDelete, id, (err, result) => {
    if (err){
      console.log(err);
    }
    
  });
});

app.put('/admin_update', (req, res) => {
  const title = req.body.book_title;
  const author = req.body.book_author;
  const description = req.body.book_desc;
  const age = req.body.book_age;
  const id = req.body.book_id;
  
  if (!title || !author || !description || !age){
    res.send({message:'Please fill in all the fields!'})
  }else{
  db.query("UPDATE books SET book_title = ?, book_author = ?, book_desc = ?, book_age = ? WHERE book_id = ?", 
  [title, author, description, age, id], (err, result) => {
    if (err){
      console.log(err);
    }else{
      res.send(result);
    }
    
  });
  }
});


app.post ('/update_progress/:book_id/:user_id',(req, res) =>{
  const book_id = req.params.book_id;
  const user_id = req.params.user_id;
  const total = req.body.total_pages;
  const current = req.body.current_page;

  
  db.query(
    "UPDATE reading_history SET total_pages = ? , current_page =? WHERE book_id = ? AND user_id = ?",
    [total, current, book_id, user_id], (err, result)=>{
      console.log(err);
    }
  )
});
  



app.post('/reading_history', (req, res) => {
  const user_id = req.body.user_id;
  const book_id = req.body.book_id;
  const now = new Date();

  db.query(
    "SELECT reading_id FROM reading_history WHERE book_id = ? AND user_id = ?",
    [book_id, user_id], (err, result) =>{
      if (result.length > 0){
        db.query("UPDATE reading_history SET read_date = ? WHERE book_id = ? AND user_id = ?",
        [now, book_id, user_id],(err, result) =>{
          if (err){
            console.log(err);
          }else{
            res.send(result);
          }
        });
      }else{
        db.query(
          "INSERT INTO reading_history (read_date, user_id, book_id) VALUES (?,?,?)",
            [now, user_id, book_id],
            (err, result) => {
              console.log(err);
              
            } 
          );
      }
    }
  );
  
}); 

app.get('/reading_history/:user_id', (req, res) => {
  const id = req.params.user_id;
  const sqlSelect = `SELECT reading_history.reading_id, reading_history.book_id, reading_history.read_date, reading_history.user_id, reading_history.total_pages, reading_history.current_page,books.book_title, books.book_cover FROM reading_history RIGHT JOIN books ON reading_history.book_id = books.book_id WHERE reading_history.user_id = ${id}`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});



app.post('/reading_list', (req, res) => {
  const user_id = req.body.user_id;
  const book_id = req.body.book_id;

  db.query(
    "SELECT id FROM reading_list WHERE book_id = ? AND user_id = ?",
    [book_id, user_id], (err, result) =>{
      if (result.length > 0){
        res.send({message: "The book is already existed in your wishlist!"});        
      }else{
        db.query(
          "INSERT INTO reading_list (user_id, book_id) VALUES (?,?)",
            [user_id, book_id],
            (err, result) => {
              console.log(err);
              res.send({message:"Added successfully!"});
            } 
        );
      }
    }
  );
  
}); 

app.get('/reading_list/:user_id', (req, res) => {
  const id = req.params.user_id;
  const sqlSelect = `SELECT reading_list.id, reading_list.book_id, reading_list.user_id, books.book_title, books.book_cover, books.book_file FROM reading_list RIGHT JOIN books ON reading_list.book_id = books.book_id WHERE reading_list.user_id = ${id}`;
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.delete('/delete_wishlist_book/:id', (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM reading_list WHERE id = ?";

  db.query(sqlDelete, id, (err, result) => {
    if (err){
      console.log(err);
    }
    
  });
});

app.get('/getBookID/:filename', (req, res) =>{
  const fileName = req.params.filename;

  db.query("SELECT book_id from books WHERE book_file = ? ",
  fileName, (err, result) => {
    if (err){
      console.log(err);
    }else{
      res.send(result);
    }
  })
})

app.get('/user_list', (req, res) =>{
  db.query("SELECT user_id, user_name, user_email FROM users", 
  (err, result) =>{
    if (err){
      console.log(err);
    }else{
      res.send(result);
    }
  })
})

app.delete('/delete_user/:user_id', (req, res) => {
  const id = req.params.user_id;
  const sqlDelete = "DELETE FROM users WHERE user_id = ?";

  db.query(sqlDelete, id, (err, result) => {
    if (err){
      console.log(err);
    }
    
  });
});

app.get('/logout', (req, res) =>{
  res.send({auth:false});
});

app.post('/contact', (req, res) =>{
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  if (!name || !email || !message){
    res.send({error: 'Please fill in all the fields!'});
  }else if (validator.validate(email) == false){
      res.send({error: "Email format is invalid."});
  }else{
    db.query("INSERT INTO contacts (name, email, message) VALUES (?,?,?)",
  [name, email, message], (err, result) =>{
    console.log(err);
    res.send({message: 'Your message has sent successfully!'});
  })
  }
});

app.get('/contact', (req, res)=>{
  db.query("SELECT * FROM contacts",
  (err, result)=>{
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  })
})

app.get('/dictionary/:word',async(req,res)=>{
  var word = req.params.word;
  try{
    await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then((response)=>{
      res.send(response.data);
    })
  }catch(error){
    console.log(error);
  }
  
})

app.listen(3001, () => {
    console.log("running server");
});
