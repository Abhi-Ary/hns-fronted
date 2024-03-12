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

    const [previewImage, setPreviewImage] = useState("");

    const [signupData, setSignupData] = useState({
        officialName: "",
        governmentID: "",
        email: "", 
        password: "",
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
        })
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

    async function createNewAccount(event){
        event.preventDefault();
        if(!signupData.location || !signupData.phone || !signupData.governmentID || !signupData.email || !signupData.password || !signupData.officialName || !signupData.avatar)
        {
            toast.error("Please fill all the details");
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
        formData.append("descriptio", signupData.description);
        formData.append("avatar", signupData.avatar);

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
                            <label htmlFor="email" className="font-semibold"> Email </label>
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

                    <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="font-semibold"> Password </label>
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