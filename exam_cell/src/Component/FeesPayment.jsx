import {React,useState,useEffect} from "react";
import "../Component/FeesPayment.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { FormHelperText, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FeesReceipt from "./FeesReceipt";


const steps = ['Add Student Details', 'Make Payment', 'Fees Receipt'];
const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));
  
  const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }));
  
  function QontoStepIcon(props) {
    const { active, completed, className } = props;
  
    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }
  
  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
  };
  
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));
  
  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
  }));
  
  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;
  
    const icons = {
      1: <SettingsIcon />,
      2: <GroupAddIcon />,
      3: <VideoLabelIcon />,
    };
  
    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }
  
  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };

function FeesPayment() {
    const [number,setNumber] = useState('');
    const [name,setName] = useState('');
    const [expiry,setExpiry] = useState('');
    const [cvc,setCVC] = useState('');
    const [focus,setFocus] = useState('');
    const [Name,setname] = useState("");
    const [rollno,setRollno] = useState("");
    const [DOB,setDOB] = useState("");
    const [Gender,setGender] = useState("")
    const [admission,setAdmission] = useState("");
    const [Category,setCategory] = useState("");
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [Branch,setBranch]= useState("");
    const [Year,setYear] = useState("");
    const [amount,setAmount] = useState("")
    const navigate = useNavigate();

   const nextStep = () =>{
    setActiveStep((currentStep) =>currentStep!==2 ? currentStep + 1:currentStep );
    
   }
const prevStep = ()=>{
    setActiveStep((currentStep)=>currentStep!==0 ?currentStep - 1 : currentStep);
}


function handleFeePay()
{
    try {
        axios.post("http://localhost:3001/api/feesPayment",{rollno:rollno,amount:amount,name:name,DOB:DOB,AdmissionType:admission,Quota:Category,Branch:Branch,Gender:Gender,Year:Year}).then((response)=>{
            console.log(response);
            if (response.status === 200)
            {
            setActiveStep((currentStep)=>currentStep+1)
            alert("Fees Paid Successfully")
            }            
        })
    } catch (error) {
        
    }
}




  return (
 <div>
 <Stack sx={{ width: '100%' }} spacing={4}>
     
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
       <Step>
        <StepLabel StepIconComponent={ColorlibStepIcon}>Add Details </StepLabel>
        {activeStep}

      <div style={{display:activeStep == 0 ? "":"none"}}>
<Typography variant='h4'><b>Add Student Details</b></Typography>
        <Box component='container' justifyContent='center' alignItems='center'>
        
            <Grid container   flexGrow={1} flexDirection='row' spacing={3} alignItems='center' justifyContent='center' marginLeft='80%'> 
           
                    <Grid item xs={12} sm={6} md={6}>
                    <FormHelperText>Name</FormHelperText>
                        <TextField value={Name} placeholder="Name" onChange={(e)=>{setname(e.target.value)}}/>
                        
                    </Grid>
                   
                    <Grid item xs={12} sm={6} md={6}>

                    <FormHelperText>RollNo</FormHelperText>
                    <TextField  value={rollno} placeholder="e.g. 12345" onChange={(e)=>{setRollno(e.target.value)}}/>
                   
                    </Grid>
                   
                    <Grid item xs={12} sm={6} md={6}>
                    <FormHelperText>DOB</FormHelperText>
                    <TextField value={DOB} placeholder="DD/MM/YYYY" onChange={(e)=>{setDOB(e.target.value)}}/> 
                    </Grid>
                   
                    
                    <Grid item xs={12} sm={6} md={6}>
                    <FormHelperText>GENDER</FormHelperText>
                    <TextField value={Gender} onChange={(e)=>{setGender(e.target.value)}}/> 
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                    <FormHelperText>Admission Type</FormHelperText>
                    <TextField value={admission} placeholder="Admission Type e.g. DSE/REGULAR" onChange={(e)=>{setAdmission(e.target.value)}}/> 
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                    <FormHelperText>Category</FormHelperText>
                    <TextField value={Category} placeholder="Category e.g. (CAP,Vacancy,Institutional,etc)" onChange={(e)=>{setCategory(e.target.value)}}/> 
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                    <FormHelperText>Branch</FormHelperText>
                    <TextField value={Branch} placeholder="Branch e.g. (I.T,COMPS,EXTC)" onChange={(e)=>{setBranch(e.target.value)}}/> 
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={6}>
                    <FormHelperText>Year</FormHelperText>
                    <TextField value={Year} placeholder="Year" onChange={(e)=>{setYear(e.target.value)}}/> 
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                    <FormHelperText>Amount</FormHelperText>
                    <TextField value={amount} placeholder="Year" onChange={(e)=>{setAmount(e.target.value)}}/> 
                    </Grid>
            </Grid>
            </Box>
      </div>
       </Step>
       <Step>
        <StepLabel StepIconComponent={ColorlibStepIcon}>Make Payment</StepLabel>
        
<form 
style={{display : activeStep === 1 ? "" :"none"}}
>

<Cards
       number={number}
       name={name}
       expiry={expiry}
       cvc={cvc}
       focused={focus}
       />
    <input
    type="tel"
    name="number"
    placeholder="Card Number"
    value={number}
    onChange={e => setNumber(e.target.value)}
    onFocus={e=>setFocus(e.target.name)}
    
    />
    <br />
    <input 
    type="text"
    name="name"
    placeholder="Card Holder Name"
    value={name}
    onChange={e => setName(e.target.value)}
    onFocus={e=>setFocus(e.target.name)}
    />
<br />
<input 
    type="text"
    name="expiry"
    placeholder="MM/YY Expiry"
    value={expiry}
    onChange={e => setExpiry(e.target.value)}
    onFocus={e=>setFocus(e.target.name)}
    />
<br />
<input 
    type="text"
    name="cvc"
    placeholder="CVC"
    value={cvc}
    onChange={e => setCVC(e.target.value)}
    onFocus={e=>setFocus(e.target.name)}
    />

<br />

</form>
</Step>

       <Step>
        <StepLabel StepIconComponent={ColorlibStepIcon}>RESULT</StepLabel>


       <div style={{display:activeStep === 2 ?"":"none"}}><h1>Fees Paid Successfully.Get Back to Dashboard</h1></div>
       </Step>

      
      </Stepper>
      
    </Stack>
<br /><br /><br />

&nbsp;&nbsp;&nbsp;&nbsp;
{
    activeStep ==1?<Button variant ="contained" onClick={()=>{handleFeePay()}}>Pay and Generate Fees Receipt</Button>:<></>
}
&nbsp;&nbsp;&nbsp;&nbsp;
   {activeStep === 0 ?<Button variant="contained" onClick={()=>nextStep()}>Next</Button>: <Button variant ="contained" onClick={()=>{navigate('/DashBoard')}}>DashBoard</Button>
     } 
    


</div>
  )
}

export default FeesPayment;
