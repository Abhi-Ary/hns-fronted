import HomeLayout from "../Layouts/HomeLayout";
import AboutUsImage from '../Assets/Images/about.jpg';

function AboutUs(){
    return (
        <HomeLayout>
            <div className="bg-gray-900 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8 text-center">About Us</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                        <p className="text-base md:text-lg lg:text-xl mb-4">
                            Welcome to OurHospital, a leading healthcare provider dedicated to serving our community with excellence and compassion. OurHospital has been a cornerstone of medical care in our area for over 50 years, and we take pride in our reputation for providing high-quality healthcare services.
                        </p>
                        <p className="text-base md:text-lg lg:text-xl mb-4">
                            At OurHospital, we believe in putting patients first. Our team of skilled healthcare professionals is committed to delivering personalized care and treatment to every individual who walks through our doors. Whether you're visiting for a routine check-up or seeking treatment for a complex medical condition, you can trust that you'll receive the highest standard of care at OurHospital.
                        </p>
                        <p className="text-base md:text-lg lg:text-xl mb-4">
                            As a community-focused healthcare provider, we are dedicated to meeting the diverse needs of our patients. We offer a comprehensive range of medical services, including general medicine, specialist consultations, and treatment for various diseases. OurHospital is also proud to provide innovative healthcare solutions, such as our digital patient referral system, to enhance the patient experience and improve access to care.
                        </p>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Our Services</h2>
                        <ul className="list-disc ml-8 mb-6">
                            <li className="text-base md:text-lg lg:text-xl mb-2">General Medicine</li>
                            <li className="text-base md:text-lg lg:text-xl mb-2">Specialist Consultations:
                                <ul className="list-disc ml-8 mb-2">
                                    <li className="text-base md:text-lg lg:text-xl mb-2">Cardiology</li>
                                    <li className="text-base md:text-lg lg:text-xl mb-2">Orthopedics</li>
                                    <li className="text-base md:text-lg lg:text-xl mb-2">Oncology</li>
                                    <li className="text-base md:text-lg lg:text-xl mb-2">Neurology</li>
                                    <li className="text-base md:text-lg lg:text-xl mb-2">Gynecology</li>
                                </ul>
                            </li>
                            <li className="text-base md:text-lg lg:text-xl mb-2">Treatment of Various Diseases:
                                <ul className="list-disc ml-8 mb-2">
                                    <li className="text-base md:text-lg lg:text-xl mb-2">Diabetes Management</li>
                                    <li className="text-base md:text-lg lg:text-xl mb-2">Hypertension Treatment</li>
                                    <li className="text-base md:text-lg lg:text-xl mb-2">Respiratory Disorders</li>
                                    <li className="text-base md:text-lg lg:text-xl mb-2">Psychological Counseling</li>
                                </ul>
                            </li>
                            <li className="text-base md:text-lg lg:text-xl">Digital Patient Referral System</li>
                        </ul>
                    </div>
                    <div className="md:w-1/2">
                        <div className="aspect-w-4 aspect-h-3">
                            <img src={AboutUsImage} alt="Hospital" className="object-cover w-full h-full rounded-lg" />
                        </div>
                    </div>
                </div>
                <p className="text-base md:text-lg lg:text-xl mb-4">
                    OurHospital is more than just a medical facility; it is a place of healing and hope. We are committed to creating a welcoming and supportive environment where patients feel valued and respected. Our dedicated staff works tirelessly to ensure that every patient receives the care and attention they deserve, from the moment they enter our doors to the moment they leave.
                </p>
                <p className="text-base md:text-lg lg:text-xl mb-4">
                    Thank you for choosing OurHospital for your healthcare needs. We are honored to serve you and your family, and we look forward to providing you with exceptional medical care for years to come.
                </p>
                <p className="text-base md:text-lg lg:text-xl mb-4">
                    If you have any questions or would like to schedule an appointment, please don't hesitate to contact us. Our friendly staff is here to assist you and ensure that you receive the best possible care.
                </p>
            </div>
        </div>
        </HomeLayout>
    );
}

export default AboutUs;