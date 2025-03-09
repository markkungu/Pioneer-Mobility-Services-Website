import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Submitted:", formData);
  
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: formData.email,
          subject: `Contact Form Submission from ${formData.name}`,
          message: formData.message,
        }),
        credentials: "include",
      });
  
      const data = await response.json();
      console.log("📩 Server Response:", data); // Debugging log
  
      if (data.success) {
        alert("✅ Email successfully sent!");
      } else {
        alert("❌ Failed to send email, please try again later!");
      }
    } catch (err) {
      console.error("❌ Error sending email:", err);
    }
  
    setFormData({ name: "", email: "", message: "" });
  };
  

  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Title */}
        <h2 className="text-3xl font-bold text-[#0B3D5A] text-center mb-6">Get in Touch</h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#0B3D5A] mb-4">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none"
                required
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none"
                required
              />
              <button type="submit" className="bg-[#0B3D5A] text-white px-4 py-2 rounded-lg hover:bg-[#128178] transition">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div>
            <h3 className="text-xl font-semibold text-[#0B3D5A] mb-4">Contact Information</h3>
            <p className="text-gray-700 mb-2"><strong>Phone:</strong> +1 (123) 456-7890</p>
            <p className="text-gray-700 mb-2"><strong>Email:</strong> info@nemtservices.com</p>
            <p className="text-gray-700 mb-4"><strong>Address:</strong> 123 Medical St, Washington, USA</p>

           
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

