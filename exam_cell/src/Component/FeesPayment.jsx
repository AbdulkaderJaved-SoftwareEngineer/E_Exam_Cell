import {React,useState,useEffect} from "react";
import "../Component/FeesPayment.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
function FeesPayment() {
    const [number,setNumber] = useState('');
    const [name,setName] = useState('');
    const [expiry,setExpiry] = useState('');
    const [cvc,setCVC] = useState('');
    const [focus,setFocus] = useState('');
    
  return (
 <div>
       <Cards
       number={number}
       name={name}
       xpiry={expiry}
       cvc={cvc}
       focused={focus}
       
       />
<form>
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
</div>
  )
}

export default FeesPayment;
