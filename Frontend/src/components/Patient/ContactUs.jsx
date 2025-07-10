import Navbar from "../Shared/Navbar";
import service from "../../assets/services.png"

function ContactUs() {
  return (
    <section
      className="h-screen w-screen bg-[#FEFAE0]">
      <Navbar />
      <div 
       className="h-screen w-screen flex justify-center items-center pt-24">
        <div className="flex gap-10 mx-14 py-14">
          <div className="flex-col hidden md:flex">
            <span className="text-zinc-650 text-4xl">Locate Us</span>
            <br />
            <span className="text-zinc-550 text-2xl">
              HMS Bhubaneswar - India
            </span>
            <span className="text-zinc-500 text-base">
              HMS, Binalipi Bhawan, Baramunda Colony, Bhubaneswar - Odisha,
              India
            </span>
            <br />
            <div className="flex gap-20 items-start">
              <div className="flex flex-col">
                <span className="text-zinc-650 text-2xl">Telephone</span>
                <span className="text-zinc-500 text-base">
                  +91 9827189486
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-zinc-650 text-2xl">Emergency</span>
                <span className="text-zinc-500 text-base">
                  +91 7364738982
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-zinc-650 text-2xl">
                  Corporate Enquiries
                </span>
                <span className="text-zinc-500 text-base">
                  +91 7388721783
                </span>
              </div>
            </div>
            <br />
            <div className="flex flex-col">
              <span className="text-zinc-650 text-2xl">Email</span>
              <span className="text-zinc-500 text-base">hms@gmail.com</span>
            </div>
          </div>
          <div className='hidden md:block'><img src={service} alt="services" className='h-[400px]' /></div>
        </div>
      </div>
      
    </section>
  );
}

export default ContactUs;