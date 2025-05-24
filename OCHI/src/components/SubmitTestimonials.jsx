import React, { useState } from 'react';

function SubmitTestimonial() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.role || !formData.message) {
      alert('Please fill out all fields');
      return;
    }

    // You can connect this to a backend/Firebase later
    console.log('Submitted testimonial:', formData);

    setFormData({ name: '', role: '', message: '' });
    setSubmitted(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#CDEA68] p-10 md:p-20 text-black flex flex-col items-center">
      <h1 className="text-[6vw] md:text-[3vw] font-bold mb-8">Submit Your Testimonial</h1>

      <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="p-3 rounded border border-gray-300"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="role"
            placeholder="Your Role (e.g., Student, Mentor)"
            className="p-3 rounded border border-gray-300"
            value={formData.role}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Testimonial"
            rows={4}
            className="p-3 rounded border border-gray-300"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Submit
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-green-600 font-semibold">Thank you for your testimonial!</p>
        )}
      </div>
    </div>
  );
}

export default SubmitTestimonial;
