import { useState } from "react";

import HomeLayout from "../Layouts/HomeLayout";

import { BsPersonCircle } from "react-icons/bs";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { toast } from "react-hot-toast";

import { createAccount } from "../Redux/Slices/AuthSlice";

import { isEmail, isValidPassword } from "../Helpers/regexMatcher";

function Signup(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedOptions, setSelectedOptions] = useState({
        serviceCategory: [],
        specialisedService: [],
        insurancePlan: [],
        hospitalAffiliation: []
    });

    const handleOptionClick = (field, value) => {
        // Check if the option is already selected, if so, remove it
        const updatedOptions = selectedOptions[field].includes(value)
            ? selectedOptions[field].filter(option => option !== value)
            : [...selectedOptions[field], value];
    
        setSelectedOptions({
            ...selectedOptions,
            [field]: updatedOptions
        });
    };

    const [previewImage, setPreviewImage] = useState("");

    const [otp, setOtp] = useState("");



    const [signupData, setSignupData] = useState({
        officialName: "",
        governmentID: "",
        email: "", 
        password: "",
        confirmPassword: "",
        phone: "",
        website: "",
        location: "",
        description: "",
        avatar: ""
    }); 

    function handleUserInput(e){
        const {name, value} = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        });
         // Check if password confirmation matches
            if (name === "confirmPassword") {
                if (value !== signupData.password) {
                    toast.error("Password confirmation does not match.");
            }
        }
    }

    function getImage(event){
        event.preventDefault();
        // getting the image
        const uploadedImage = event.target.files[0];

        if(uploadedImage){
            setSignupData({
                ...signupData,
                 avatar: uploadedImage
            });

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function (){
                setPreviewImage(this.result);
            });
        }
    }

    async function generateAndSendOTP() {
        try {
            // Generate a random OTP
            const otp = Math.floor(1000 + Math.random() * 9000);

            // Simulate sending OTP to the user's email (replace with actual API call)
            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: signupData.email,
                    otp: otp
                })
            });

            if (response.ok) {
                // OTP sent successfully
                toast.success("OTP has been sent to your email.");
                setOtp(otp); // Store the generated OTP
            } else {
                // Error sending OTP
                toast.error("Failed to send OTP. Please try again later.");
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            toast.error("An unexpected error occurred. Please try again later.");
        }
    }

    async function createNewAccount(event){
        event.preventDefault();
        if(!signupData.location || !signupData.phone || !signupData.governmentID || !signupData.email || !signupData.password || !signupData.officialName || !signupData.avatar)
        {
            toast.error("Please fill all the details");
            return;
        }

        if (!selectedOptions.serviceCategory || !selectedOptions.specialisedService || !selectedOptions.insurancePlan || !selectedOptions.hospitalAffiliation) {
            toast.error("Please select all options.");
            return;
        }

        // Check if OTP is entered
         if (!otp) {
            toast.error("Please generate and enter OTP.");
            return;
        }

        // checking name field length
        if(signupData.officialName.length < 5){
            toast.error("Name should be atleast of 5 characters");
            return;
        }
        // checking valid email
        if(!isEmail(signupData.email)){
            toast.error("Invalid email id");
            return;
        }

        // checking password validation
        if(!isValidPassword(signupData.password)){
            toast.error("Password length should be atleast 8 characters with atleast one uppercase and one lowercase and one digit and one special character");
            return;
        }

        const formData = new FormData();
        formData.append("officialName", signupData.officialName);
        formData.append("governmentID", signupData.governmentID);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("phone", signupData.phone);
        formData.append("website", signupData.website);
        formData.append("location", signupData.location);
        formData.append("description", signupData.description);
        formData.append("avatar", signupData.avatar);
        formData.append("otp", otp); // Send the entered OTP to the backend for verification

        // dispatch create account action
        const response = await dispatch(createAccount(formData));
        console.log(response);
        if(response?.payload?.success)
        navigate("/");

        setSignupData({
            officialName: "",
            governmentID: "",
            email: "", 
            password: "",
            confirmPassword: "",
            phone: "",
            website: "",
            location: "",
            description: "",
            avatar: ""
        });
        setPreviewImage("");
        
    }

    return (
        <HomeLayout>
            <div className="flex itmes-center justify-center">
                <form noValidate onSubmit={createNewAccount} className="flex flex-col m-8 itmes-center justify-center gap-2 rounded-lg p-5 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Registration Page</h1>

                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage} />
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                        )}
                    </label>
                    <input 
                        onChange={getImage}
                        className="hidden"
                        type="file"
                        name="image_uploads"
                        id="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg"
                    />

                    <div className="flex flex-col gap-1">
                            <label htmlFor="officialName" className="font-semibold"> Official Name: </label>
                            <input 
                                type="text"
                                required 
                                name="officialName"
                                id="officialName"
                                placeholder="Enter official name.."
                                className="bg-transparent px-2 py-1 border "
                                onChange={handleUserInput}
                                value={signupData.officialName}
                            />
                    </div>

                    <div className="flex flex-col gap-1">
                            <label htmlFor="governmentID" className="font-semibold"> Government Issued Unique ID: </label>
                            <input 
                                type="text"
                                required 
                                name="governmentID"
                                id="governmentID"
                                placeholder="Enter id here.."
                                className="bg-transparent px-2 py-1 border "
                                onChange={handleUserInput}
                                value={signupData.governmentID}
                            />
                    </div>

                    <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="font-semibold"> Email: </label>
                            <input 
                                type="email"
                                required 
                                name="email"
                                id="email"
                                placeholder="Enter your email.."
                                className="bg-transparent px-2 py-1 border "
                                onChange={handleUserInput}
                                value={signupData.email}
                            />
                            
                    </div>

                    <div>
                    <button type="button" onClick={generateAndSendOTP} className="bg-yellow-600 hover:bg-yellow-500 cursor-pointer text-white text-lg font-semibold px-3 py-1 rounded-md mt-2">Generate OTP</button>
                    </div>

                    <div className="flex flex-col gap-1">
                            <label htmlFor="otp" className="font-semibold"> OTP: </label>
                            <input 
                                type="number"
                                required 
                                name="otp"
                                id="otp"
                                placeholder="Enter OTP.."
                                className="bg-transparent px-2 py-1 border "
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                    </div>

                    <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="font-semibold"> Password: </label>
                            <input 
                                type="password"
                                required 
                                name="password"
                                id="password"
                                placeholder="Enter your password.."
                                className="bg-transparent px-2 py-1 border "
                                onChange={handleUserInput}
                                value={signupData.password}
                            />
                    </div>

                    <div className="flex flex-col gap-1">
                            <label htmlFor="confirmPassword" className="font-semibold"> Confirm Password: </label>
                            <input 
                                type="password"
                                required 
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm your password.."
                                className="bg-transparent px-2 py-1 border "
                                onChange={handleUserInput}
                                value={signupData.confirmPassword}
                            />
                    </div>

                    <div className="flex flex-col gap-1">
                            <label htmlFor="phone" className="font-semibold"> Phone Number: </label>
                            <input 
                                type="tel"
                                required 
                                name="phone"
                                id="phone"
                                placeholder="Enter your phone number.."
                                className="bg-transparent px-2 py-1 border "
                                onChange={handleUserInput}
                                pattern="[0-9]{10}"
                                value={signupData.phone}
                            />
                    </div>

                    <div className="flex flex-col gap-1">
                            <label htmlFor="website" className="font-semibold"> Website URL: </label>
                            <input 
                                type="text"
                                name="website"
                                id="website"
                                placeholder="Enter your website url.."
                                className="bg-transparent px-2 py-1 border "
                                onChange={handleUserInput}
                                value={signupData.website}
                            />
                    </div>

                    <div className="flex flex-col gap-1">
                            <label htmlFor="location" className="font-semibold"> Location: </label>
                            <input 
                                type="text"
                                required
                                name="location"
                                id="location"
                                placeholder="Enter your location.."
                                className="bg-transparent px-2 py-1 border "
                                onChange={handleUserInput}
                                value={signupData.location}
                            />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="serviceCategory" className="font-semibold">Service Category:</label>
                        <select
                            name="serviceCategory"
                            id="serviceCategory"
                            className="bg-transparent px-2 py-1 border"
                            multiple
                            value={selectedOptions.serviceCategory}
                            onClick={(e) => handleOptionClick("serviceCategory", e.target.value)}
                        >
                            <option value="Cardiology">Cardiology</option>
                            <option value="Orthopedics">Orthopedics</option>
                            <option value="Neurology">Neurology</option>
                            <option value="Gynecology">Gynecology</option>
                            <option value="Pediatrics">Pediatrics</option>
                            <option value="Oncology">Oncology</option>
                            <option value="Urology">Urology</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="specialisedService" className="font-semibold">Specialised Service:</label>
                        <select
                            name="specialisedService"
                            id="specialisedService"
                            className="bg-transparent px-2 py-1 border"
                            multiple
                            value={selectedOptions.specialisedService}
                            onClick={(e) => handleOptionClick("specialisedService", e.target.value)}
                        >
                            <option value="Robotic Surgery">Robotic Surgery</option>
                            <option value="Intensive Care Unit">Intensive Care Unit</option>
                            <option value="Emergency Services">Emergency Services</option>
                            <option value="Diagnostic Imaaging">Diagnostic Imaaging</option>
                            <option value="Physical Therapy">Physical Therapy</option>
                            <option value="Dialysis Center">Dialysis Center</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="insurancePlan" className="font-semibold">Insurance Plan:</label>
                        <select
                            name="insurancePlan"
                            id="insurancePlan"
                            className="bg-transparent px-2 py-1 border"
                            multiple
                            value={selectedOptions.insurancePlan}
                            onClick={(e) => handleOptionClick("insurancePlan", e.target.value)}
                        >
                            <option value="Basic Health Insurance">Basic Health Insurance</option>
                            <option value="Family Health Insurance">Family Health Insurance</option>
                            <option value="Senior Citizen Health Insurance">Senior Citizen Health Insurance</option>
                            <option value="Maternity Insurance">Maternity Insurance</option>
                            <option value="Personal Accident Insurance">Personal Accident Insurance</option>
                            <option value="Travel Health Insurance">Travel Health Insurance</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="hospitalAffiliation" className="font-semibold">Hospital Affiliation:</label>
                        <select
                            name="hospitalAffiliation"
                            id="hospitalAffiliation"
                            className="bg-transparent px-2 py-1 border"
                            multiple
                            value={selectedOptions.hospitalAffiliation}
                            onClick={(e) => handleOptionClick("hospitalAffiliation", e.target.value)}
                        >
                            <option value="Health System">Health System</option>
                            <option value="Insurance Networks">Insurance Networks</option>
                            <option value="Specialty Organizations">Specialty Organizations</option>
                            <option value="Government Programs">Government Programs</option>
                            <option value="Medical University">Medical University</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                            <label htmlFor="description" className="font-semibold"> Description: </label>
                            <textarea 
                                name="description"
                                id="description"
                                placeholder="Enter your description.."
                                className="bg-transparent px-2 py-1 border rounded-sm resize-none h-40 "
                                onChange={handleUserInput}
                                value={signupData.description}
                            />
                    </div>

                    <button type="submit" className="mt-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                        Create account
                    </button>
                    <p className="text-center">
                        Already have an account ? <Link to='/login' className="link text-accent cursor-pointer">Login</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}
export default Signup;