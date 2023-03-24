import React from 'react';
import "./calander.css"
import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from 'react';
import Calendar from 'react-calendar'; 



function VacationForm ()
{
        const [startDate, setStartDate] = useState(new Date())
        const [endDate, setEndDate] = useState(new Date(Date.now() + (3600 * 1000 * 24)))
        const [yearlyVacation,setYearlyVation] = useState(false)
        const [sickLeave,setSickLeave] = useState(false)
        const [email,setEmail] = useState()
        const [errEmail,setErrorEmail] = useState(false)
        const [phoneNumber,setPhoneNumber] = useState()
        const [errPhoneNumber,setErrPhoneNumber] = useState(false)
    

        const handleYearlyVacation = (event)=>{
            setSickLeave(false)
            setYearlyVation(event.target.checked)
        }

        const handleSickLeave = (event)=> {
            setYearlyVation(false)
            setSickLeave(event.target.checked)
        }

        const handleStartDate = (date) => {
            setStartDate(date)
            var stdate =  Date(date)
            date.setDate(date.getDate() + 1)
            setEndDate(new Date(date))
        }

        const validateEmail =(event) => {
            const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
            var isValid =  regex.test(event.target.value);
            
            if (isValid)
            {
                setEmail(event.target.value)
                setErrorEmail(false)
            }
            else{
                setErrorEmail(true)
            }
        }

        const validatePhoneNumber =(event) => {
            const phone = event.target.value
            const splittedPair = phone.substring(0,2)
            const arr = ["03","81","70","71","76","78","79"]
            
            if (phone.length ==8 && arr.includes(splittedPair))
            {
                setPhoneNumber(phone)
                setErrPhoneNumber(false)
            }else{
                setErrPhoneNumber(true)
            }
        }

        const submitForm = (event) => {
            event.preventDefault();
            if (!errEmail && !errPhoneNumber)
            {
                console.log("submitted")
            }else{
                console.log("not submitted")
            }
        }
        

      
        return(
            <form>
                <div className="form-group">
                    <label htmlFor="validationEmploeyeeName" className='align-self-start'>Name:</label>
                    <input type="text" className="form-control is-valid" id="validationEmploeyeeName" placeholder="Full Name" required></input>
                </div>

                <div className="form-group">
                    <label htmlFor="validationEmail">Email:</label>
                    <input type="text" className={ errEmail? "form-control is-valid border-danger" : "form-control is-valid"} id="validationEmail" onChange={validateEmail} placeholder="abc@gmail.com" required></input>
                </div>

                <div className="form-group">
                    <label htmlFor="validationPhoneNumber">Phone Number:</label>
                    <input type="text" className={ errPhoneNumber? "form-control is-valid border-danger" : "form-control is-valid"} id="validationPhoneNumber" onChange={validatePhoneNumber} placeholder="81234567" required></input>
                </div>

                <p>Type of vacation:</p>

                <input type="radio" id="yVacation" name="type" value="yearly" onChange={handleYearlyVacation}></input>
                <label htmlFor="yVacation">Yearly Vacation</label><br></br>
                <br/>
                {yearlyVacation && 
                <div className='row'>
                <div className="calendar-container col-auto">
                    <h6>From:</h6>
                    <Calendar onChange={handleStartDate} value={startDate}/>
                </div>

                <div className="calendar-container col-auto">
                    <h6>To:</h6>
                    <Calendar onChange={setEndDate} value={endDate} minDate={endDate}/>
                </div>
                </div>
                }





                <input type="radio" id="sVacation" name="type" value="sick" onClick={handleSickLeave}></input>

                
                <label htmlFor="sVacation">Sick leave</label><br/>
                {sickLeave &&
                <select className='form-select form-select-lg mb-3'> 
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
                }
                <br></br>


                <button className="btn btn-primary" onClick={submitForm}>Submit form</button>

            
            </form>
        )
}

export default VacationForm;