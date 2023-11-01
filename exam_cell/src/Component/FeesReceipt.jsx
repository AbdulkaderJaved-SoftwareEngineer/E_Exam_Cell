import React, { useEffect, useState } from 'react';
// import "../Component/FeesPayment.css";
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import logo from "../asset/logo.jpg"
import { Bars } from  'react-loader-spinner';



function FeesReceipt() {
const [data,setData]=useState([]);
const {id} = useParams();
const navigate = useNavigate();
useEffect(()=>{
 
    
    axios.get(`http://localhost:3001/api/FeesReceipt/${id}`).
    then((response)=>{
       
       
        setData(response.data);
        console.log(data);
        
    })
    .catch((error)=>{
      console.error(error)
    })
    .finally(
      ()=>{
     
    })
  

});









    return (
    <div>
       
   {data.length < 1 ? <Bars
  
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/> :  data && data.map((item,index)=>(
    
  
  <div class="main">
  
        <div class="box">
           
            <div class="head">
                <div class="one">
                    <img src={logo} class="up" alt=""/>
                </div>
                <div class="two">
                    <p class="small">Anjuman-i-Islam's </p>
                    <p class="college-name">M. H. Saboo Siddik College of Engineering</p>
                    <p class="small">8, Saboo Siddik Polytechnic Road, Byculla, Mumbai-4000 08</p>
                </div>
                <div class="three">
                    Receipt No. {item.r_no}
                </div>
            </div>
       

            <div class="main-body">
                <div class="info">
                    <ul class="left">
                        <li>
                            Account No. :        124567890
                        </li>
                        <li>
                            Form No. :      {item.r_no}
                        </li>
                        <li>
                           Candidate:   {item.name}
                        </li>
                        <li>
                            Branch :    {item.Branch}
                        </li>
                        <li>
                            Quota :     {item.Quota}
                        </li>
                        <li>
                            Email :     tester@test.com
                        </li>
                    </ul>
                    <ul class="right">
                        <li>
                            Receipt Date :  {item.paidOn}
                        </li>
                        <li>
                            Admit Type :        {item.AdmissionType}
                        </li>
                        <li>
                            Gender:     {item.Gender}
                        </li>
                        <li>
                            Year :      {item.Year}
                        </li>
                        <li>
                            Category :      {item.Quota}
                        </li>
                        <li>
                            Mobile No. :        8591466974
                        </li>
                    </ul>
                </div>
               <div class="tables">
                    <table class="tab1" border="1">
                        <tr>
                            <th>Sr. No.</th>
                            <th>Fee Structure</th>
                            <th>Amount</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Tuition Fee</td>
                            <td>127400</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Development Fee</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Caution Money Deposit (Refundable)</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Enrolment Fee (University)</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Leaving Certificate Fee (University)</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Convocation fee (University)</td>
                            <td>0</td>
                        </tr>
                        <tr><td>7</td>
                            <td>Examination Fee (University)</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>Sports and Cultural Activity Fee (University)</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>Disaster Relief Fund (University) </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>eSuvidha Fee (University)</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>11</td>
                            <td>Student Welfare Fund (University)</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>12</td>
                            <td>Vice Chancellors' Fund (University)</td>
                            <td></td>
                        </tr>
                        <tr><td>13</td>
                            <td>E-Charges (University)</td>
                            <td></td>
                        </tr>
                        <tr><td>14</td>
                            <td>National Service Scheme: Ekta Yojana (University)</td>
                            <td></td>
                        </tr>
                        <tr><td>15</td>
                            <td> National Insurance</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="high">Amount Due</td>
                            <td>137400</td>
                        </tr>
                    </table>
                    <div>
                        <table border="1" class="tab2">
                            <tr>
                                <th>Sr. No.</th>
                                <th>Receipt No.</th>
                                <th>Date</th>
                                <th>Amount</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>{item.r_no}</td>
                                <td>{item.paidOn}</td>
                                <td>{item.amount}</td>
                            </tr>
                            <tr>
                                <td colspan="3">Total Paid</td>
                                <td>{item.amount}</td>
                            </tr>
                        </table>
                
                        <p class="bold-font">Payable Balance: {137400-`${item.amount}` }</p>
                    </div>
                </div>
                
                <div class="sign">
                    <p>Student Signature</p>
                    <p>Authorized Signature</p>
                </div>

                <div class="note">Note : Any change in approved fees for 2022-23 by the Fee Regulating Authority will be implemented and 
                    payable by the student's/parents
                </div>
            </div>
            
                    <div class="bank">
                        <p class="bank-name">DCB BANK</p>
                        <div class="l1">
                            <pre>                </pre>
                            <p>Saboo Siddik Branch, Byculla,Mumbai-4000 08.</p>
                            <p>IFSC : DCBL0000053</p>
                        </div>
                        <div class="l2">
                            <p>Name: AIS MHSS COLLEGE OF ENGG</p>
                            <p>A/c. No. : 05320100000027 </p>
                        </div>
                        <table border="1" class="tab3">
                            <tr>
                                <th>Sr. No.</th>
                                <th>Particulars</th>
                                <th>DD/Chq No.</th>
                                <th>Dated</th>
                                <th>Amount</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>_________________</td>
                                <td>_______</td>
                                <td>__/__/____</td>
                                <td>1,37,408</td>
                            </tr>
                            <tr>
                                <td colspan="4">Receipt Total</td>
                                <td>{137400-`${item.amount}`} </td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="stamp">
                        <p><b>(In Figure):</b> {137400-`${item.amount}`}</p>
                        <p><b>(In Words):</b> One Lakh Thirty Seven Thousand Four Hundred Eight Only</p>
                        <p class="ki">Bankers Stamp and Signature</p>
                    </div>
                   
                </div>
      
    </div>
   ))
}<Button variant='outlined'>Download</Button> &nbsp;&nbsp;&nbsp;<Button variant='contained'onClick={()=>{navigate('/Dashboard')}}>Back</Button>
    </div>
  )
}

export default FeesReceipt
