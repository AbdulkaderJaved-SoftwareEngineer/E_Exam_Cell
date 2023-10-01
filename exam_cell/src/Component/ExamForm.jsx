import React,{useEffect, useState} from "react";
import Header from "./Header";
import { Grid,TextField ,Button,Stack, TextareaAutosize, Divider, Typography, Tooltip, Paper,Box,Select, Checkbox, InputLabel, Accordion,AccordionSummary,AccordionDetails, ListItem, FormHelperText, FormControl, FormGroup, Radio, FormLabel, RadioGroup} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert"
import axios from "axios";
import { FcAbout, FcBookmark, FcCancel,FcExpand,FcOk } from "react-icons/fc";
import InputAdornment from "@mui/material/InputAdornment";
import ListItemText from "@mui/material/ListItemText";

import {FormControlLabel} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps:{
        style : {
            maxHeight : ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width : 250,
        },
    },
};


function ExamForm()
{
    const [Fullname ,setFullName] = useState("")
    const [RollNo ,setRollNo] = useState()
    const [Mobile ,setMobile] = useState()
    const [Enrollment ,setEnrollment] = useState()
    const [PRN,setPRN] = useState()
    const [Address,setAddress] = useState("")
    const [Year,setYear] = useState()
    const [Semester ,setSemester] = useState()
    const [branch,setBranch] = useState();
    const [Profile,setProfileImage] = useState()
    const [SemA,setSemA] = useState();
    const [SemB,setSemB] = useState();
    const [fees,setFees] = useState();
    const [subjects ,setSubjects] = useState([])
    const [email,setEmail] = useState();
    const [examSection,setExamSection] = useState();
    const [gender,setGender]=useState("");
    const [agreed,setAgreed] = useState(false);
    const [scheme,setScheme] = useState();
    const [admissionType,setAdmissionType] = useState("");
    const [disable,setDisable]  = useState(true);

    const sem3Subjects = [
        "MATHS3",
        "DSA",
        "PCOM",
        "PCPF",
        "DBMS",
    ] 

    const sem4Subjects = [
        "MATHS4",
        "AT",
        "CNND",
        "COA",
        "OS"
    ]

    const sem5Subjects = [
    "SEN",
    "INP",
    "CNS",
    "EEB",
    "ADMT",
    "PCE"



    ]
    const sem6Subjects = 
    [

    ]


const handleChange = (e)=>{
    const {
        target : { value }
        } = e;

        setSubjects(
            typeof value === 'string' ? value.split(',') : value
        );

    
    
        
        console.log(subjects)
};

useEffect(
    ()=>{
        if(agreed===true && Profile)
        {
            setDisable(false)
            
        }
        
        else
        {
            setDisable(true)
        }
    },[Fullname,Address,RollNo,Profile,agreed]
)


function handleCheckBox()
{
    setAgreed(true);
}
//............................................................
    function sendExamForm(e)
    {
     e.preventDefault();
        
    const formdata = new FormData();

    formdata.append("RollNo",RollNo);
    formdata.append("Fullname",Fullname);
    formdata.append("Mobile",Mobile);
    formdata.append("EnrollmentNo",Enrollment);
    formdata.append("PRN",PRN);
    formdata.append("Address",Address);
    formdata.append("Year",Year);
    formdata.append("Semester",Semester);
    formdata.append("avatar",Profile);
    formdata.append("semA",SemA);
    formdata.append("SemB",SemB);
    formdata.append("fees",fees);
    formdata.append("Subjects",subjects);
    formdata.append("Branch",branch);
    formdata.append("Email",email);
    formdata.append("ExamSection",examSection);
    formdata.append("Gender",gender);
    formdata.append("AdmissionType",admissionType);
    formdata.append("Scheme",scheme);
    

    const config = {
       
        header : {
            "Content-Type":"multipart/form-data"
        }
 
    }
axios.post("http://localhost:3001/api/ExamFormFill",formdata,config
).then((res)=>{
    if (res.status === 200)
    {   alert("ExamForm Submitted Successfully");
        console.log(res)
    }
    else if(res.status === 402)
    {
            alert("Please Upload the Image ");
    }

    else if (res.status === 500)
    {
        console.table(res);

    }
  })


}
//---------------------------------------------






return (
<div className="ExamForm">
    <Header/>
    <h1>ExamForm</h1>

    <Paper elevation={6} style={{background:'white' ,borderLeft:'4px solid orange',borderLeftRadius:'2%',width:'500px',display:'flex',justifyContent:'center',margin:'auto'}}><h5> Note :<i>All Fields are mandatory to be filled</i>
    </h5>
    
    </Paper>

Choose An Image <span style={{color:'red'}}> *</span> <TextField type="file" name="avatar" onChange={(e)=>{
 if (e.target.files && e.target.files[0])
 {
     let img = e.target.files[0]
     setProfileImage(img);
     
 }
 else{
     setProfileImage(null);
 }

}} />
<br /><br />
<Tooltip title="Personal Information"><Divider> <FcAbout style={{width:'60px',height:'60px'}}/> </Divider></Tooltip>
<Stack direction="column" columnGap={9}  >
    <Grid  md={2} lg={6} xs={10} height={5}  paddingLeft={40} marginBottom={8} container columns={3} 
    columnGap={5}
    direction="row">
<Grid item>
<FormHelperText>Fullname{"(with Father and Mother)"} <span style={{color:'red'}}>*</span>
</FormHelperText><TextField type="text" color={Fullname.length >= 10 ? "success":"primary"}  value={Fullname} placeholder="FullName" name="Fullname" InputProps={{
    endAdornment:(
        <InputAdornment position="end">{Fullname.length >= 10 ?  <FcOk /> : Fullname.length === 0 ?<></> :<FcCancel/>}</InputAdornment>
    )
}} onChange={(e)=>{setFullName(e.target.value)}}/>



</Grid>
<Grid>
<FormHelperText>Address <span style={{color:'red'}}>*</span>
</FormHelperText>
<TextField color={Address.length >= 10 ? "success":"primary"} type="text" placeholder="Address" name="Address" value={Address} InputProps={{
    endAdornment:(
        <InputAdornment position="end">{Address.length >= 10 ?  <FcOk /> : Address.length === 0 ?<></> :<FcCancel/>} </InputAdornment>
    )}} onChange={(e)=>{setAddress(e.target.value)
        
    }}/>
</Grid>
<Grid item>
<FormHelperText>Mobile <span style={{color:'red'}}>*</span>
</FormHelperText>

<TextField maxRows={5} type="number" value={Mobile} placeholder="Mobile" name="Mobile"onChange={(e)=>{setMobile(e.target.value)}}/>
</Grid>

<Grid item>

<FormHelperText>Email <span style={{color:'red'}}>*</span></FormHelperText>
<TextField maxRows={5} type="email" value={email} placeholder="Email" name="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
</Grid>

<Grid item>
<FormHelperText>Gender <span style={{color:'red'}}>*</span></FormHelperText>
<Select
sx={{m:1,
    width:200,
    height:50,

}}
value={gender || ""}

onChange={(e)=>{setGender(e.target.value)}}
>
    <MenuItem value="Gender" disabled>Gender</MenuItem>
    <MenuItem value="Male">
    <ListItemText primary="Male"/>
    </MenuItem>
 
    <MenuItem value="Female">
    <ListItemText primary="Female"/>
    </MenuItem>
    
    </Select>    
</Grid>


</Grid>





<Tooltip title="Acedemic Details"><Divider> <FcBookmark style={{width:'60px',height:'60px'}}/> </Divider></Tooltip>


<Grid container  md={2} lg={6} xs={4}   paddingLeft={40}  direction='row' columns={3} 
    columnGap={5}>
<FormHelperText>RollNo <span style={{color:'red'}}>*</span></FormHelperText>
<TextField type="number"  value={RollNo} placeholder="RollNo" name="RollNo" onChange={(e)=>{setRollNo(e.target.value)
    

}}/>

<Grid item>
<FormHelperText>Enrollment No <span style={{color:'red'}}>*</span></FormHelperText>
<TextField type="number" value={Enrollment} placeholder="Enrollnoment.No" onChange={(e)=>{setEnrollment(e.target.value)}}/>
</Grid>

<Grid item>

<FormHelperText>PRN {"(16 Digits Only)"} <span style={{color:'red'}}>*</span></FormHelperText>
<TextField type="text" value={PRN} placeholder="PRN" onChange={(e)=>{setPRN(e.target.value)}}/>
</Grid>
<Grid container direction="row" >

    <Grid item>
    <br/>
      
        </Grid>

        <Grid item>
        <FormHelperText> Exam Section  <span style={{color:'red'}}>*</span></FormHelperText>
<Select
sx={{m:1,width:300,height:50}}
name="examSection"
value={examSection || ""}
placeholder="Branch"


onChange={(e)=>{setExamSection(e.target.value)}}>
    <MenuItem disabled>Select Exam Section</MenuItem>
    <MenuItem value="1st Half">
    <ListItemText primary="1st Half" />
    </MenuItem>

    <MenuItem value="2nd Half">
    <ListItemText primary="2nd Half" />
    </MenuItem>
 </Select>   
 </Grid>




    <Grid item>
    
    </Grid>
    <Grid item>
    <FormHelperText>Branch <span style={{color:'red'}}>*</span></FormHelperText>
<Select

sx={{m:1,width:400,height:50}}
value={branch || "Branch"}
placeholder="Branch" onChange={(e)=>{setBranch(e.target.value)}}>
    <option value="" disabled selected>Branch</option>
    <MenuItem value="Information And Technology">
    <ListItemText primary="Information And Technology" />
    </MenuItem>

    <MenuItem value="Computer Engineering">
    <ListItemText primary="Computer Engineering" />
    </MenuItem>
    <MenuItem value="Computer Science and AI/ML">
    <ListItemText primary="Computer Science and AI/ML" />
    </MenuItem> 
    <MenuItem value="Mechanical Engineering">
    <ListItemText primary="Mechanical Engineering" />
    </MenuItem>

    <MenuItem value="Civil Engineering">
    <ListItemText primary="Civil Engineering" />
    </MenuItem>

    <MenuItem value="Electronics and TeleCommunication Engineering">
    <ListItemText primary="Electronics and TeleCommunication Engineering" />
    </MenuItem>

    <MenuItem value="AutoMobile Engineering">
    <ListItemText primary="AutoMobile Engineering" />
    </MenuItem>

    <MenuItem value="Computer Science and Blockchain">
    <ListItemText primary="Computer Science and Blockchain" />
    </MenuItem>
    </Select>
    </Grid>
   


   

</Grid>
<Grid item>
   <FormHelperText> Scheme of Course <span style={{color:'red'}}>*</span></FormHelperText>
    <Select
    sx={{m:1,width:400,height:50}}
    value={scheme || ""}
    onChange={(e)=>{setScheme(e.target.value)}}
    >
        <MenuItem value="CBCGS">
            <ListItemText primary="CBCGS"/>
        </MenuItem>

        <MenuItem value="CBSGS">
            <ListItemText primary="CBSGS"/>
        </MenuItem>

        <MenuItem value="C-Scheme (R - 19)">
            <ListItemText primary="C-Scheme (R - 19)"/>
        </MenuItem>

        <MenuItem value="OTR">
            <ListItemText primary="OTR"/>
        </MenuItem>
    </Select>
   
   </Grid>
</Grid>

<Grid container  md={2} lg={6} xs={4} marginBottom={10} marginTop={5} marginLeft={50}  direction='row'>
<FormHelperText> Year of Study <span style={{color:'red'}}>*</span></FormHelperText>
<select  name="Year" onChange={(e)=>{
    

    console.log(e.target.value)
    setYear(e.target.value)}}>

<option>---select----</option>
<option>2</option>
<option>3</option>

</select>
&nbsp;&nbsp;&nbsp;&nbsp;
<FormHelperText>Semester <span style={{color:'red'}}>*</span></FormHelperText>
<select  name="Semester" onChange={(e)=>

{console.log(e.target.value)
    
    
    setSemester(e.target.value) 



}}>
<option>---select----</option>
 <option>3</option>
<option>4</option>
<option>5</option>
<option>6</option> 

</select>




</Grid>
<Grid item >
<FormControl>
    <FormLabel id="demo-radio-buttons-group-label">
        Type of Admission <span style={{color:'red'}}>*</span>
    </FormLabel>
    <RadioGroup onClick={(e)=>{setAdmissionType(e.target.value)
    console.log(e.target.value)
    }}>
<FormControlLabel value="Regular" control={<Radio color="primary"/>} label="Regular">
</FormControlLabel>

<FormControlLabel value="Direct Second Year(DSE)" control={<Radio color="success"/>} label="Direct Second Year(DSE)">

</FormControlLabel>
</RadioGroup>
</FormControl>
</Grid>



 <Box container flex justifyContent="center" p={6} m={3}>
 <Alert severity="info">
Fees Receipt <span style={{color:'red'}}>*</span>
</Alert>
<TextField type="file" name="fees"/>


<Alert severity="info">
Courses Offered
</Alert>

Choose Subjects : {Year ==2 && Semester == 3 ? <><InputLabel>Subjects - Semester {Semester}</InputLabel>
<Select
sx={{m:1,width:300}}
multiple
value={subjects}
renderValue={(selected)=>selected.join(',')}
MenuProps={MenuProps}
onChange={(e)=>{handleChange(e)}}
name="Subjects"
>
{sem3Subjects.map((item)=>(

<MenuItem key={item} value={item}>
<Checkbox checked={subjects.indexOf(item) > - 1} />
    <ListItemText primary={item} />
</MenuItem>

))}
</Select>



</>

: <></>}



{Year ==2 && Semester == 4 ? <><InputLabel>Subjects - Semester {Semester}</InputLabel>
<Select
sx={{m:1,width:300}}
multiple
value={subjects}
renderValue={(selected)=>selected.join(',')}
MenuProps={MenuProps}
onChange={handleChange}
name="subject"
>
{sem4Subjects.map((item)=>(

<MenuItem key={item} value={item}>
<Checkbox checked={subjects.indexOf(item) > - 1} />
    <ListItemText primary={item} />
</MenuItem>

))}
</Select>


</>

: <></>}



{Year ==3 && Semester == 5 ? <><InputLabel>Subjects - Semester {Semester}</InputLabel>
<Select
sx={{m:1,width:500}}
multiple
value={subjects}
renderValue={(selected)=>selected.join(',')}
MenuProps={MenuProps}
onChange={handleChange}
name="subject"
>
{sem5Subjects.map((item)=>(

<MenuItem key={item} value={item}>
<Checkbox checked={subjects.indexOf(item) > - 1}  />


    <ListItemText primary={item} />
</MenuItem>

))}
</Select>



</>

: <></>}




{Year ==3 && Semester == 6 ? <><InputLabel>Subjects - Semester {Semester}</InputLabel>
<Select
sx={{m:1,width:500}}
multiple
value={subjects}
renderValue={(selected)=>selected.join(',')}
MenuProps={MenuProps}
onChange={handleChange}
autoSave="true"
name="subject"
>
{sem6Subjects.map((item)=>(

<MenuItem key={item} value={item}>
<Checkbox checked={subjects.indexOf(item) > - 1}  />


    <ListItemText primary={item} />
</MenuItem>

))}
</Select>



</>

: <></>}







<Alert severity="info">Details of Lower Semester Examination</Alert>

{Year == 2 && Semester == 3 && admissionType == "Regular"? 
<>
<Accordion>
<AccordionSummary
expandIcon = {<FcExpand />}
aria-controls="panel1a-content"

>
<Typography variant="h5"> Semester 1</Typography>

</AccordionSummary>
<AccordionDetails>
<Typography>Marksheet of sem 1</Typography>
<TextField type="file" name="semDocs1" onChange={(e)=>{setSemA(e.target.value)}}/>

</AccordionDetails>
</Accordion>

<Accordion>
<AccordionSummary
expandIcon = {<FcExpand />}
aria-controls="panel1a-content"
>
<Typography variant="h5"> Semester 2</Typography>

</AccordionSummary>
<AccordionDetails>
<Typography>Marksheet of sem 2</Typography>
<TextField type="file" name="semDocs2" onChange={(e)=>{setSemB(e.target.value)}}/>

</AccordionDetails>
</Accordion>
</>
:
<></>
}




{Year == 2 && Semester == 4 &&  admissionType == "Regular"? 
<>
<Accordion>
<AccordionSummary
expandIcon = {<FcExpand />}
aria-controls="panel1a-content"
>
<Typography variant="h5"> Semester 2</Typography>

</AccordionSummary>
<AccordionDetails>

<Typography>Marksheet of sem 2</Typography>
<TextField type="file" name="semDocs1" onChange={(e)=>{setSemA(e.target.value)}}/>
</AccordionDetails>
</Accordion>

<Accordion>
<AccordionSummary
expandIcon = {<FcExpand />}
aria-controls="panel1a-content"
>
<Typography variant="h5"> Semester 3</Typography>

</AccordionSummary>
<AccordionDetails>
<Typography>Marksheet of sem 3</Typography>
<TextField type="file" name="semDocs2" onChange={(e)=>{setSemB(e.target.value)}}/>

</AccordionDetails>
</Accordion>
</>
:
<></>
}

{ Year == 3 && Semester == 5 ? 
<>
<Accordion>
<AccordionSummary
expandIcon = {<FcExpand />}
aria-controls="panel1a-content"
>
<Typography variant="h5"> Semester 3</Typography>

</AccordionSummary>
<AccordionDetails>
<Typography>Marksheet of sem 3</Typography>
<TextField type="file" name="semDocs1" onChange={(e)=>{setSemA(e.target.value)}}/>

</AccordionDetails>
</Accordion>

<Accordion>
<AccordionSummary
expandIcon = {<FcExpand />}
aria-controls="panel1a-content"
>
<Typography variant="h5"> Semester 4</Typography>

</AccordionSummary>
<AccordionDetails>
<Typography>Marksheet of sem 4</Typography>
<TextField type="file" name="semDocs2" onChange={(e)=>{setSemB(e.target.value)}}/>

</AccordionDetails>
</Accordion>
</>
:
<></>
}

{ Year == 3 && Semester == 6 ? 
<>
<Accordion>
<AccordionSummary
expandIcon = {<FcExpand />}
aria-controls="panel1a-content"
>
<Typography variant="h5"> Semester 4</Typography>

</AccordionSummary>
<AccordionDetails>
<Typography>Marksheet of sem 4</Typography>
<TextField type="file" name="semDocs1" onChange={(e)=>{setSemA(e.target.value)}}/>

</AccordionDetails>
</Accordion>

<Accordion>
<AccordionSummary
expandIcon = {<FcExpand />}
aria-controls="panel1a-content"
>
<Typography variant="h5"> Semester 5</Typography>

</AccordionSummary>
<AccordionDetails>

<Typography>Marksheet of sem 5</Typography>
<TextField type="file" name="semDocs2" onChange={(e)=>{setSemB(e.target.value)}}/>
</AccordionDetails>
</Accordion>
</>
:
<></>
}


 </Box>

</Stack>

<FormControlLabel control={<Checkbox color="success" onClick={()=>handleCheckBox()}/>} label="I agree that all details given above by me are correct and proven" />

 <Button variant="contained"  color="success" type="submit"onClick={(e)=>{sendExamForm(e)}} disabled={disable}>Send For Verification</Button>


</div>
)}

export default ExamForm;