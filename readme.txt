CSCI 3100 Project 2022 R2 Group D4
Group member:
Wong Ngou Shan 1155141835
Cheng Yee Han 1155143426
Yip Yuk Pang 1155137889
Ng Pui Man 1155126522
Lau Ho Man 1155157519

Edit by: Wong Ngou Shan on 11/4/2022 1:39am

Front end: HTML, ejs
Server: node.js with express
Database: mongoDB with mongoose

INSTALLED PACKAGES ON NODE.JS:
+-- cors@2.8.5
+-- ejs@3.1.6
+-- express-session@1.17.2
+-- express@4.17.3
+-- mongoose@6.2.9
+-- multer@1.4.4
`-- nodemailer@6.7.3

Database structure:
3 Schemas:
1) User
    userId(name): string, unique, required
    passWord: string, required
    email: string, unique, required
    picture(profile pic): image
    verify: boolean, required
    isAdmin: boolean
2) Product
    productId: number, required, unique
    name: String, required
    price: Number, required
    seller: User, required
    remain: Number, required
    picture: image
    contact: String, required
3) History (one per purchase)
    buyer: User, required
    product: Product, required
    quantity: number, required
    date: date, required
 
 Modules:
 a) admin.js
 -displayUsers(req,res,message)
 -resetPW(req,res)
  -Reset
  -Delete
 b) app.js
 using many
 -(all routing)
 c) changepassword.js
 -changepassword(req,res)
 d) createAccount.js
 -userLogin(req,res)
 -userVerify(req,res)
  using url in js
 -registerAccount(req,res)
  using nodemailer,expression-session (fs in js)
 e) creatproduct.js
 -createProduct(req,res)
   using path (fs in js)
 f) handleproduct.js
 -handleProd
  -Buy
  -Delete
 g) homepage.js
 -loadhome(req,res)
 h) myprofile.js
 -myProfile(req,res)
 i) purchasehistory.js
 -displayhistory(req,res)
 j) Schemas.js
 (all schema)
