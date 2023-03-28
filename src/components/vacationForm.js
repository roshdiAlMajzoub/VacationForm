import React from 'react';
import "./calander.css"
import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from 'react';
import Calendar from 'react-calendar'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select, { components } from "react-select";



function VacationForm ()
{
        const [startDate, setStartDate] = useState(new Date())
        const [endDate, setEndDate] = useState(new Date(Date.now() + (3600 * 1000 * 24)))
        const [yearlyVacation,setYearlyVation] = useState(false)
        const [sickLeave,setSickLeave] = useState(false)
        const [email,setEmail] = useState("")
        const [errEmail,setErrorEmail] = useState(false)
        const [phoneNumber,setPhoneNumber] = useState("")
        const [errPhoneNumber,setErrPhoneNumber] = useState(false)
        const [selectedSickLeave,setSelectedSickLeave] = useState()

        const options = [
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4", label: "4" },
          ];

        
       
    

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

        const validateEmail =(em) => {
            const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
            var isValid =  regex.test(em);
            
            if (isValid)
            {
                setErrorEmail(false)
                return true
            }
            else{
                toast.error("Invalid email format")
                setErrorEmail(true)
                return false
            }
        }

        const validatePhoneNumber =(ph) => {
            const phone = ph
            const splittedPair = phone.substring(0,2)
            const arr = ["03","81","70","71","76","78","79"]
            
            if (phone.length ==8 && arr.includes(splittedPair) )
            {
                setErrPhoneNumber(false)
                return true
            }else{
                toast.error("Invalid Phone Number")
                setErrPhoneNumber(true)
                return false
            }
        }

        const validateVacation = () => {
            if (!sickLeave && !yearlyVacation)
            {
                toast.error("select vacation type")
                return false
            }
            return true
        }

        const handleSickLeaveDays = (selectedOption) => {
            setSelectedSickLeave(selectedOption.value)
        }

        

        const submitForm = (event) => {
            event.preventDefault();
            var emailValid = validateEmail(email);
            var phoneValid = validatePhoneNumber(phoneNumber);
            var vacationValid = validateVacation();
            if (emailValid && phoneValid && vacationValid)
            {
                var obj = 
                {
                    "EmployeeId":1,
                    "VacationType": "Yearly",
                    "From": startDate,
                    "To": endDate,
                    "NumberOfDays": "5",
                    "Email": email,
                    "PhoneNumber": phoneNumber,
                    "Name": "roshdi",
                    "Status":"t"
                }

                const id = toast.loading("Please wait...")

                fetch('https://localhost:7146/VacationRequest', {  

                method: 'POST', 
                mode: 'cors', 
                body: JSON.stringify(obj) ,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                  },

                }).then( (response) => response.json())
                .then((data) => {
                   console.log(data);
                   toast.update(id, {render: data["message"], type: "success", isLoading: false});
                   // Handle data
                })
                .catch((err) => {
                    console.log(err)
                    toast.update(id, {render: err["message"], type: "error", isLoading: false});;
                });



                
            }
        }
        

      
        return(
            
            <form className='w-25'>
                <ToastContainer />
                <div className='bg-dark  p-3 rounded'>
                <div className="form-group">
                    <label htmlFor="validationEmploeyeeName" className='align-self-start'>Name:</label>
                    <input type="text" className="form-control is-valid" id="validationEmploeyeeName" placeholder="Full Name" required></input>
                </div>

                <div className="form-group">
                    <label htmlFor="validationEmail">Email:</label>
                    <input type="text" className={ errEmail? "form-control is-valid border-danger" : "form-control is-valid"} id="validationEmail" value={email} onChange={(event)=>{setEmail(event.target.value)}} placeholder="abc@gmail.com" required></input>
                </div>

                <div className="form-group">
                    <label htmlFor="validationPhoneNumber">Phone Number:</label>
                    <input type="text" className={ errPhoneNumber? "form-control is-valid border-danger" : "form-control is-valid"} id="validationPhoneNumber" value={phoneNumber} onChange={(event)=>{setPhoneNumber(event.target.value)}} placeholder="81234567" required></input>
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
                
                <Select
                onChange={handleSickLeaveDays}
                className="text-dark"
                options={options}
                />
                }
                <br></br>


                <input type="submit" className="btn btn-primary" onClick={submitForm}></input>

                </div>
            </form>
        )
}

export default VacationForm;