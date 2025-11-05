import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Help() {
  const [question, setQuestion] = useState('');
  const [email, setEmail] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: integrate your API endpoint here
    console.log({ question, email, specialty, accepted });
    alert('Your question has been submitted.');
    setQuestion('');
    setEmail('');
    setSpecialty('');
    setAccepted(false);
  };

  const specialties = [
    'Cardiology',
    'Dermatology',
    'Gynecology',
    'Pediatrics',
    'Psychiatry',
    'Dentistry',
    'Nutrition',
    'Orthopedics',
    'Urology',
    'Other',
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Ask an Expert</h1>
            <p className="text-gray-600 text-lg mb-6">
              Get reliable, high‑quality answers to your health questions for free.
            </p>
            <p className="text-sm text-gray-500 mb-10">
              Inspired by Doctoralia’s “Pregunta al Experto”. Reference: https://www.doctoralia.com.mx/preguntas-respuestas
            </p>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your question</label>
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Your question will be posted anonymously. Keep it clear and brief."
                      rows={6}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <ul className="mt-2 text-xs text-gray-500 list-disc pl-5 space-y-1">
                      <li>Not a substitute for a medical consultation or emergency care.</li>
                      <li>No specific cases or second opinions.</li>
                      <li>Don’t include medication dosages.</li>
                    </ul>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                    <select
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="">Choose a specialty</option>
                      {specialties.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Used only to notify you about responses. Not publicly visible.
                    </p>
                  </div>

                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={accepted}
                      onChange={(e) => setAccepted(e.target.checked)}
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I accept the terms, privacy policy, and data processing.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Submit question
                  </button>
                </form>
              </div>

              <aside className="space-y-6">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">How it works</h2>
                  <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                    <li>Patients ask brief questions</li>
                    <li>Moderators review and route to specialists</li>
                    <li>Specialists reply (often multiple answers)</li>
                    <li>You’re notified by email</li>
                  </ol>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">517k+</div>
                    <div className="text-sm text-gray-600">Questions asked</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">968k+</div>
                    <div className="text-sm text-gray-600">Answers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">108k+</div>
                    <div className="text-sm text-gray-600">Professionals</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Reference: https://www.doctoralia.com.mx/preguntas-respuestas
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


