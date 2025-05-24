import React from 'react';

function Testimonials() {
  const testimonials = [
    {
      name: 'Ayesha Basit',
      role: 'Computer Science Student',
      message:
        'Mentora helped me gain the confidence I needed for my internship interviews. My mentor reviewed my resume, did mock interviews with me, and gave really practical advice. I landed a great opportunity thanks to her guidance!',
    },
    {
      name: 'Zain Tahir',
      role: 'Software Engineer & Mentor',
      message:
        'Being a mentor on Mentora has been a fulfilling experience. I’ve been able to connect with ambitious students, share insights from the industry, and genuinely help them move forward in their careers.',
    },
    {
      name: 'Fatima Raza',
      role: 'Business Management Student',
      message:
        'What I love about Mentora is the personal attention. My mentor helped me explore career paths I hadn’t even considered before. I now have a clear direction and goals to work towards.',
    },
    {
      name: 'Ali Raza',
      role: 'Data Science Student',
      message:
        'I was struggling to break into data science until I joined Mentora. The mentor I connected with helped me refine my portfolio and guided me through real-world projects. I finally feel job-ready!',
    },
    {
      name: 'Sana Iqbal',
      role: 'UX Designer & Mentor',
      message:
        'Mentoring on Mentora is incredibly rewarding. I get to help students build meaningful portfolios and prepare for design challenges, while also learning new perspectives from them.',
    },
    {
      name: 'Hamza Siddiqui',
      role: 'Final Year Engineering Student',
      message:
        'The support I got from my mentor was more than just academic—it was motivational. Mentora gave me access to someone who truly understood my challenges and goals.',
    },
  ];

  return (
    <div className="w-full min-h-screen p-10 md:p-20 text-black">
      <h1 className="text-[6vw] md:text-[3vw] font-bold mb-10">What People Say About Mentora</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white text-black rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
          >
            <p className="text-lg md:text-base font-['Neue_Montreal'] leading-relaxed mb-4">
              “{t.message}”
            </p>
            <h3 className="text-lg font-semibold">{t.name}</h3>
            <p className="text-sm text-gray-600">{t.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
