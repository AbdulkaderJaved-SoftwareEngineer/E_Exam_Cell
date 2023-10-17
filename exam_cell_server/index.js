const express = require('express')
const app = express()
const mysql  = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
// const fileUpload = require('express-fileupload')
const multer = require('multer');
const { FaSmileBeam } = require('react-icons/fa')
const { reset } = require('nodemon')
//connection Code
const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'12345',
    database:'e_exam_cell'
    });

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
// app.use(fileUpload());
app.use("/images",express.static("ProfilePics"));
app.use("/Exam",express.static("ExamformDocs"));
app.use(express.json());
app.use(cookieParser())
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge:1000*60*60*24
    }
    
}))




app.post("/api/login",(req,res)=>{


    const username = req.body.username
    const password = req.body.password
    const sql = "select * from login where username = ? and password = ?;"
    db.query(sql,[username,password],
        (err,result)=>{
      
      if (err)
      {
        return res.json({Message : "Error"})
      }
      if (result.length > 0)
      {     req.session.username = result[0].username;
            const rollno = result[0].rollno
        console.log(req.session.username)
        return res.json({Login:true,
                          data:req.session.username,
                          rollno:rollno
                        })
      }
      else
      {
        return res.json({Login : false})
      }
    })

})





app.post('/api/signup',(req,res)=>{

const email = req.body.Email
const username = req.body.Username
    const password = req.body.Password
    const rollno = req.body.RollNo
    const sql = "Insert into login(username,password,email,rollno) values(?,?,?,?);"
    db.query(sql,[username,password,email,rollno],(err,result)=>{
      res.send(result)
    })
})



//image storage Config


var imgConfig = multer.diskStorage({
destination:(req,file,callback)=>{
  callback(null,"./ProfilePics/");

},
filename:(req,file,callback)=>{
  callback(null,`image-${Date.now()}${file.originalname}`)
}
});




//image filter 

const isImage = (req,file,callback)=>{
  if (file.mimetype.startsWith("image"))
  {
    callback(null,true)
  }
  else
  {
    callback(null,Error("only image is Allowed "))
  }
}

var upload = multer({
  storage:imgConfig,
  fileFilter:isImage
})





app.post("/api/getProfile",(req,res)=>{
  const user = req.body.user
  
  const sqlShowProfile = "Select * from Profile where RollNo = ?"
  console.log(user)
  db.query(sqlShowProfile,user,(err,result)=>{
     if (err)
     {
      res.send({Error:"Something Went Wrong!"})
     }   
     else
     {
      console.log(result)
      res.send(result)

     }
  })
})


app.post("/api/getProfileImage",(req,res)=>{
  const userid = req.body.user
  console.log(userid)
  const sqlProfileImage = "Select Profile from Profile where RollNo = ?";
  db.query(sqlProfileImage,userid,(err,result)=>{
    if(err)
    {
      res.send({Error: "Image not received "})
    }
    else
    {
      res.send(result)
    }
  })
});


app.post('/api/ProfileFill',upload.single('File'),(req,res)=>{

  const rollno = req.body.RollNo;
  const username  = req.body.Username
  const password   = req.body.Password
  const fullname = req.body.Fullname
  const enrollment = req.body.EnrollmentNo
  const prn = req.body.PRN
  const semester= req.body.Semester
  const year = req.body.Year
  const mobile = req.body.Mobile
  const address = req.body.Address
  
  const file = req.file.filename
  
  
  
  
  
    console.log("This is a Request File",file)
  
    db.query("Insert into profile SET ?",{RollNo:rollno,Username:username,Password:password,Fullname:fullname,EnrollmentNo:enrollment,PRN:prn,Semester:semester,Year:year,Address:address,Mobile:mobile,Profile:file},(err,result)=>{
      if(err) res.send(err)
     res.send(result)
    })
  
  
  })
  

var ExamImageConfig = multer.diskStorage({
  destination:(req,file,callback)=>{
    callback(null,"./ExamformDocs/");
  
  },
  filename:(req,file,callback)=>{
    callback(null,`image-${Date.now()}${file.originalname}`)
  }
  });




  var Examformupload = multer({
    storage:ExamImageConfig,
    fileFilter:isImage
  });

app.post("/api/ExamFormFill",Examformupload.fields([
  {name : 'avatar',maxCount:1},
  {name : 'semA' , maxCount:1},
  {name : 'semB' ,maxCount:1},
  {name : 'fees' ,maxCount:1}
  
])),
(req,res)=>
{
  const fullname = req.body.Fullname;
  const address = req.body.Address;
  const RollNo = req.body.RollNo;
  const photo = req.file.filename;
  const semA = req.file ? req.file.filename : null;
  const semB = req.file ? req.file.filename : null;
  const fees = req.file.filename;
  
  const mobile = req.body.Mobile;
  const subject = req.body.Subjects;  
  const allSub = JSON.stringify(subject);
  const enrollment = req.body.EnrollmentNo;
  const year = req.body.Year;
  const semester = req.body.Semester;
  const branch = req.body.Branch;
  const email = req.body.Email;
  const examsection = req.body.ExamSection;
  const gender = req.body.Gender;
  const admissiontype = req.body.AdmissionType;

  const scheme = req.body.Scheme;




db.query("Insert into examform set ? ",{Fullname:fullname,Address:address,RollNo:RollNo,Profile:photo,Subjects:allSub,Email:email,Mobile:mobile,Year:year,Semester:semester,Branch:branch,ExamSection:examsection,Gender:gender,AdmissionType:admissiontype,Enrollment:enrollment,scheme:scheme},(err,result)=>{

  if (err) res.send(err);
 res.send(result)


})

}
//--------------------------------------------------->
app.post("/api/ExamFormById",(req,res)=>{

const userId = req.body.ExamFormId;
console.log(userId)
const sqlSearch = "select * from examform where ExamFormId = ?"
db.query(sqlSearch,userId,(err,result)=>{
  res.send(result)
})


})


app.get("/api/Announcement",(req,res)=>{
 const sqlAnnouce = "SELECT * FROM e_exam_cell.announcement order by id desc";
 db.query(sqlAnnouce,(err,result)=>{
  res.send(result)
 })
})










//----------------------------------------approval
app.put("/api/approveUpdateStatus",(req,res)=>{
 
  const user = req.body.id;
  const comments = req.body.Comments;
  const username  = req.body.username;
  const sqlUpdate = "update examform set ExamFormStatus = 'APPROVED',Comments = ?,CheckedBy = ? where ExamFormId = ?";
  db.query(sqlUpdate,[comments,username,user],(err,result)=>
  {
    if (err)
    {
      res.send({Error:err.message})
    }
    else{
      res.send(result)
    }
  
  })
})
//---------------------------------------------------->









//--------------------------------rejection 
app.put("/api/rejectUpdateStatus",(req,res)=>{

  const value = req.body.id;
  const comments = req.body.Comments;
  const username = req.body.username;
  console.log(comments)
  const sqlUpdate = "update examform set ExamFormStatus = 'REJECTED',Comments = ?,CheckedBy = ? where ExamFormId = ?";
  db.query(sqlUpdate,[comments,username,value],(err,result)=>
  {
    if (err)
    {
      res.send({Error:err.message})
    }
    else{
      res.send(result)
    }
  
  })
})

//DashBoard Requests
app.post("/api/AllDashBoardRequest",(req,res)=>{
  const userId = req.body.user
  console.log(req.body.user)
const sqlDashboard = "SELECT count(ExamFormId) as myCount FROM examform WHERE  RollNo = ? "
db.query(sqlDashboard,[userId],(err,result)=>{
  if(err) console.log(err)
  res.send(result)
}
)

});



app.post("/api/ApprovedDashBoardRequest",(req,res)=>{
  const userId = req.body.user
  const sqlDashboard = "Select count(ExamFormId) as myCount FROM examform where ExamFormStatus = 'APPROVED' and RollNo = ?"
  db.query(sqlDashboard,[userId],(err,result)=>{
    if (err) {console.log(err)}
    res.send(result)  
    console.log(result)
  })
});

app.post("/api/RejectDashBoardRequest",(req,res)=>{
  const userId = req.body.user
  const sqlDashboard = " SELECT count(ExamFormId) as myCount FROM examform where  ExamFormStatus = 'REJECTED' and RollNo = ?  "
  db.query(sqlDashboard,[userId],(err,result)=>{

    if (err) {console.log(err)}
    res.send(result)  
    console.log(result)
  })
  
});

app.post("/api/PendingDashBoardRequest",(req,res)=>{
  const userId = req.body.user
  const sqlDashboard = "SELECT count(examformid)  as myCount FROM examform WHERE ExamFormStatus = 'PENDING' and RollNo = ?"
  db.query(sqlDashboard,[userId],(err,result)=>{
    if (err) {console.log(err)}
    res.send(result)  
  })
  
});









//----------------All Requests
app.post("/api/getRequest",(req,res)=>{
 const userid = req.body.user

  const sqlRequest = "select ExamFormId,ExamFormStatus,Comments from examform where RollNo = ? ";
  db.query(sqlRequest,userid,(err,result)=>{
    if (err)
    {
      res.send(err)

    }
    else{
      res.send(result)
    }
  })
  
  })
  
  
  //----------------------------------------Adnin Requests

  app.get("/admin/getAllUserRequest",(req,res)=>{
    
   
     const sqlRequest = "select * from examform where ExamFormStatus = 'PENDING' ";
     db.query(sqlRequest,(err,result)=>{
       if (err)
       {
         res.send(err)
   
       }
       else{
         res.send(result)
       }
     })
     
     })
     


app.post("/admin/getPdfRequest",(req,res)=>{
  const userId = req.body.form
  console.log("This is Direct Approach ",req.body.form)
  const sqlPdf = "select * from examform where ExamFormId = ? ";
  db.query(sqlPdf,userId,(err,result)=>{
    if(err)
    {
      res.send(err)
    }
    else
    {
      
res.send(result)
    }
  })
})






app.post("/admin/login",(req,res)=>{

  const username  = req.body.user;
  const password = req.body.pass;
  
  const sqlAdminAuth = "Select Username,Password from admin where Username = ? and Password = ?"
  db.query(sqlAdminAuth,[username,password],(err,result)=>{
   if(result.length > 0)
   {
    res.send(result)
    console.log('Logged in')
   }
   else
   {
    res.send("No Data Found")
   }
  
  })
  
  });


  app.post("/admin/ApprovedDashBoardRequest",(req,res)=>{
    const username = req.body.user
    const sqlDashboard = "Select count(ExamFormId) as myCount FROM examform where ExamFormStatus = 'APPROVED' and checkedby = ?"
    db.query(sqlDashboard,[username],(err,result)=>{
      if (err) {console.log(err)}
      res.send(result)  
      console.log(result)
    })
  });

  app.post("/admin/RejectedDashBoardRequest",(req,res)=>{
    const username = req.body.user
    const sqlDashboard = "Select count(ExamFormId) as myCount FROM examform where ExamFormStatus = 'REJECTED' and checkedby = ?"
    db.query(sqlDashboard,[username],(err,result)=>{
      if (err) {console.log(err)}
      res.send(result)  
      console.log(result)
    })
  });
  app.post("/admin/AwaitingDashBoardRequest",(req,res)=>{
    const username= req.body.user
    const sqlDashboard = "Select count(ExamFormId) as myCount FROM examform where ExamFormStatus = 'PENDING'";
    db.query(sqlDashboard,[username],(err,result)=>{
      if (err) {console.log(err)}
      res.send(result)  
      console.log(result)
    })
  });



  app.post("/admin/AllDashBoardRequest",(req,res)=>{
    const username = req.body.user
    console.log(req.body.user)
  const sqlDashboard = "SELECT count(ExamFormId) as myCount FROM examform WHERE  checkedby = ?  "
  db.query(sqlDashboard,[username],(err,result)=>{
    if(err) console.log(err)
    res.send(result)
  })});



  //announcements 
app.post("/admin/announcements",(req,res)=>{

  const type = req.body.type;
  const semester = req.body.semester;
  const title = req.body.title;
  const description = req.body.description;
  const id = req.body.id;
  const announcement = [type,semester,title,description,id];
  

  const sqlAnnouce = "INSERT INTO announcement (AnnouncementType,Semester,Title,Description,AnnouncedBy,Date) Values(?,?,?,?,?,?)";

  const date  = new Date().toISOString().slice(0, 19).replace('T', ' ');
  announcement.push(date)
  db.query(sqlAnnouce,announcement,(err,result)=>{
    if(err) res.send(err)
    res.send(result)
  })

});


app.post("/admin/deletePost/:id",(req,res)=>{
const postId = req.body.id;
const sqlDelete = "Delete from announcement where id = ?";
db.query(sqlDelete,postId,(err,result)=>{
res.send(result);
})});

app.get("/admin/examform/:formId",(req,res)=>{
  const formId = req.params.formId;
  console.log("ExamformId : ",formId);
  const sqlFindExamForm = "Select * from examform where ExamFormId = ?"
  db.query(sqlFindExamForm,[formId],(err,result)=>{
    if(err)
    console.log(err);
  res.send(result);
  });
});

app.post("/api/feesPayment",(req,res)=>{
const sql = "INSERT INTO fees(rollno,amount,paidOn,name,DOB,AdmissionType,Quota,Branch,Gender,Year) values(?)";
const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
const data = [req.body.rollno,req.body.amount,date,req.body.name,req.body.DOB,req.body.AdmissionType,req.body.Quota,req.body.Branch,req.body.Gender,req.body.Year];

db.query(sql,[data],(err,result)=>{
  if(err) console.log(err)
  res.send(result);
})
});


app.get("/api/FeesPayment/:id",(req,res)=>
{
// console.log(req.params.id);
const sql = "SELECT r_no,rollno,paidOn,name,amount from fees where rollno = ?";
db.query(sql,req.params.id,(err,result)=>{
  res.send(result);
})

});

app.get("/api/FeesReceipt/:id",(req,res)=>{
  const id = req.params.id;
  console.log(id);
  const sql = "SELECT * from fees where r_no = ? ";
  db.query(sql,id,(err,result)=>{
    console.log(result);
    res.send(result);
  })
})


app.listen(3001,()=>{
    console.log("Running on Port 3001")
});