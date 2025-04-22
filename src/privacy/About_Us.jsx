import React from 'react'

const About_Us = () => {
  return (
    <div className="px-6 md:px-20 py-12 text-white">
    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-600">🚀 About DevMate</h1>
    <p className="text-lg mb-8 max-w-3xl">
      <strong>DevMate</strong> is more than just an app — it's a growing community designed <strong>by developers, for developers</strong>. Whether you're a front-end fanatic, a back-end wizard, a full-stack adventurer, or a curious beginner, DevMate provides a space where you can <strong>connect with like-minded individuals</strong>, <strong>share ideas</strong>, and <strong>grow together</strong>.
    </p>

    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold mb-2">🧠 Why DevMate?</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>👥 Find peers with similar tech stacks and passions</li>
          <li>🛠️ Collaborate on open-source or personal projects</li>
          <li>💬 Engage in meaningful conversations</li>
          <li>📚 Learn, share knowledge, and grow together</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🌱 Our Mission</h2>
        <p>
          To build a welcoming and supportive space where developers of all levels can <strong>meet, collaborate, and evolve</strong> — together.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🔍 How It Works</h2>
        <ol className="list-decimal ml-6 space-y-1">
          <li>Sign up with your profile and interests</li>
          <li>Connect with other developers based on skills, goals, or curiosity</li>
          <li>Chat, collaborate, or contribute — it’s your space to thrive</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🤝 Join the Movement</h2>
        <p>
          Whether you're looking to brainstorm your next app, contribute to a project, or simply meet someone who understands your obsession with clean code — DevMate is your new digital playground.
        </p>
      </section>
    </div>
  </div>
  )
}

export default About_Us
