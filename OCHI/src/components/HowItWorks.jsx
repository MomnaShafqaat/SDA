import React from 'react';

function HowItWorks() {
  const steps = [
    {
      title: '1. Sign Up as a Student or Mentor',
      description:
        'Create your free account on Mentora. Whether you’re a student seeking guidance or a professional looking to mentor, we’ve got a place for you.',
    },
    {
      title: '2. Build Your Profile',
      description:
        'Add details like your interests, goals, expertise, and availability. This helps us match students with mentors who truly align with their needs.',
    },
    {
      title: '3. Explore & Connect',
      description:
        'Students can browse through mentor profiles, read about their background, and choose the one who best fits their career path or learning goals.',
    },
    {
      title: '4. Schedule Sessions',
      description:
        'Once you find the right match, you can request a mentorship session directly. Mentors can accept or reschedule based on their availability.',
    },
    {
      title: '5. Meet & Grow',
      description:
        'Join live one-on-one sessions via video calls or chat, share your challenges, and get real, actionable advice tailored just for you.',
    },
    {
      title: '6. Stay Connected',
      description:
        'Mentora encourages long-term mentorship relationships. Stay in touch, follow up, and track your progress as you grow.',
    },
  ];

  return (
    <div className="w-full min-h-screen p-10 md:p-20 text-black">
      <h1 className="text-[6vw] md:text-[3vw] font-bold mb-10">How Mentora Works</h1>

      <div className="flex flex-col gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white text-black rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-bold mb-2">{step.title}</h2>
            <p className="text-md md:text-base font-['Neue_Montreal'] leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowItWorks;
