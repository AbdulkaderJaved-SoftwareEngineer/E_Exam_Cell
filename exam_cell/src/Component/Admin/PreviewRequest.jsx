import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Divider,Grid,Stack,Container,Paper,Chip,Avatar, Button, Accordion,AccordionSummary,AccordionDetails,Typography} from '@mui/material';
import { useParams } from 'react-router-dom';
import { FcAbout, FcBookmark, FcCancel,FcExpand,FcOk } from "react-icons/fc";
import "../Admin/PreviewRequest.css";
function PreviewRequest() {
const { formId } = useParams();
const [data,setData] = useState([]);
const[loading,setLoading] = useState(true);
useEffect(()=>{
 
    
    Axios.get(`http://localhost:3001/admin/examform/${formId}`).
    then((response)=>{
       
        console.log(loading)
        setData(response.data);
        console.log(data);
        
    })
    .catch((error)=>{
      console.error(error)
    })
    .finally(
      ()=>{
      setLoading(false);
    })
  

},[data]);


function getExamFormById(formId)
{ 


}











  return (
    <>
    {data && data.map((item)=>(
    <div>
   
      <section>
      <div className="container">
        <div className="admit-card">
          <div className="BoxA border- padding mar-bot"> 
            <div className="row">
              <div className="col-sm-4">
                <h5>M.H SABOO SIDDIK COLLEGE OF ENGINEERING </h5>
                <p>BYCULLA, MUMBAI-400008 <br/> MAHARASHTRA, INDIA</p>
              </div>
              <div className="col-sm-4 txt-center">
                <img src="" width="100px;" />
              </div>
              <div className="col-sm-4">
                <h5>EXAM FORM </h5>
                <h4>{item.ExamFormId}</h4>
              </div>
            </div>
          </div>
          <div className="BoxC border- padding mar-bot">
            <div className="row">
              <div className="col-sm-6">
                <h5>Enrollment No : {item.Enrollment}</h5>
                
              </div>
              <div className="col-sm-6">
                <h5>Scheme : {item.Scheme}</h5>
                
              </div>
              
            </div>
          </div>
          <div className="BoxD border- padding mar-bot">
            <div className="row">
            <div className="col-sm-6">
                <h5><b>Admission Type</b> : {item.AdmissionType}</h5>
                
              </div>
              <div className="col-sm-10">
                <table className="table table-bordered">
                  <tbody>
                  <tr>
                    <td><b>RollNo : </b>{item.Rollno}</td>
                    <td><b>Course: </b> {item.Branch}</td>
                  </tr>
                  <tr>
                    <td><b>CANDIDATE Name: </b>   {item.Fullname}    </td>
                    <td><b>GENDER: </b>   {item.Gender} </td>
                  </tr>
                  <tr>
                    <td><b>Exam Section: </b>{item.ExamSection}</td>
                    <td><b>Mobile: </b>{item.Mobile}</td>
                    
                  </tr>
                  <tr>
                  <td><b>Year: </b>{item.Year}</td>
                  <td><b>Semester: </b>{item.Semester}</td>
                    

                  </tr>
                  <tr>
                    <td colspan="2" style={{height: "125px"}}> <b>Address: </b>{item.Address}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-sm-2 txt-center">
                <table className="table table-bordered">
                  <tbody>
                  <tr>
                    <th scope="row txt-center"><img src={`http://localhost:3001/Exam/${item.Profile}`} width="123px" height="165px" alt={item.Fullname}/></th>
                  </tr>
                  <tr>
                    <th scope="row txt-center"><p>{item.Fullname}</p>
                    </th>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="BoxE border- padding mar-bot txt-center">
            <div className="row">
              <div className="col-sm-12">
                <h5>EXAMINATION VENUE</h5>
                <p>M.H SABOO SIDDIK COLLEGE OF ENGINEERING , MUMBAI<br/> MAHARASHTRA, INDIA</p>
              </div>
            </div>
          </div>
          <div className="BoxF border- padding mar-bot txt-center">
            <div className="row">
              <div className="col-sm-12">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      
                      <th>Subjects</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                   
                    <td>{item.Subjects}</td>
                   
                  </tr>
                  
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <footer className="txt-center">
            <p>*** M.H SABOO SIDDIK COLLEGE OF ENGINEERING***</p>
          </footer>
          
        </div>
      </div>
      
     </section>
     <Accordion>
<AccordionSummary
expandIcon = {<FcExpand />}
aria-controls="panel1a-content"

>
<Typography>Result</Typography>
</AccordionSummary>
<AccordionDetails>
<Typography>Marksheet of sem 1</Typography>

</AccordionDetails>
</Accordion>

<Accordion>
<AccordionSummary
expandIcon = {<FcExpand />}
aria-controls="panel1a-content"
>
<Typography> Result 2</Typography>

</AccordionSummary>
<AccordionDetails>
<Typography>Marksheet of sem 2</Typography>

</AccordionDetails>
</Accordion>

<Accordion>
<AccordionSummary
expandIcon = {<FcExpand />}
aria-controls="panel1a-content"
>
<Typography>Fees Receipt</Typography>

</AccordionSummary>
<AccordionDetails>
<Typography>Fees Reciept</Typography>

</AccordionDetails>
</Accordion>
<Button variant='contained'>Download           </Button>
</div>
 ))}
    </>
  ) 
      
}

export default PreviewRequest;
