import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, MoveUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import envelope from "@/assets/envelope.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Hello — A little conversation goes a long way" },
    { name: "description", content: "Start a conversation with Hello, a playful contact form with a little motion." },
    { property: "og:title", content: "Hello — Let's talk" },
    { property: "og:description", content: "A little conversation goes a long way. Drop a note with Hello." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }
  return (
    <div className="hello-page">
      <header className="site-header">
        <a href="/" className="wordmark" aria-label="Hello home">hello<span>.</span></a>
        <span className="header-note"><span className="status-dot" />Good things start with a hello</span>
      </header>
      <main className="contact-layout">
        <section className="intro">
          <span className="eyebrow"><Sparkles size={15} /> A LITTLE CONNECTION</span>
          <h1>Big ideas.<br />Small <span>hellos.</span></h1>
          <p>Have a thought, a question, or something good to share? We'd love to hear it.</p>
          <div className={`illustration ${submitted ? "celebrate" : ""}`}>
            <img src={envelope} width={1024} height={1024} alt="A coral envelope with a note and colorful floating shapes" />
            <span className="illustration-caption">A little conversation goes a long way.<MoveUpRight size={17} /></span>
          </div>
        </section>
        <section className="form-section" aria-label="Contact form">
          <div className="form-heading"><span className="eyebrow">LET'S TALK</span><span className="section-number">01 / HELLO</span></div>
          {submitted ? <div className="success-state" role="status">
            <span className="success-icon"><Check size={30} /></span>
            <h2>Nice to meet you{name.trim() ? `, ${name.trim().split(" ")[0]}` : ""}.</h2>
            <p>Your demo message is complete. Nothing has been sent or saved.</p>
            <Button variant="hello" onClick={() => setSubmitted(false)}>Write another note <ArrowUpRight /></Button>
          </div> : <>
            <h2>Drop us a note<span>.</span></h2>
            <p className="form-description">Nothing fancy. Just you, and what's on your mind.</p>
            <form onSubmit={submit}>
              <label htmlFor="name">Your name <span>*</span></label>
              <input id="name" name="name" autoComplete="name" placeholder="What should we call you?" required maxLength={100} value={name} onChange={e => setName(e.target.value)} />
              <label htmlFor="email">Email address <span>*</span></label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              <label htmlFor="message">Your message <span>*</span></label>
              <textarea id="message" name="message" placeholder="Hey! I've been thinking about..." rows={4} required maxLength={3000} />
              <Button variant="hello" type="submit">Send a little hello <ArrowUpRight /></Button>
              <p className="privacy-note">Just a demo — your message isn't sent or stored.</p>
            </form>
          </>}
        </section>
      </main>
      <footer className="site-footer"><span>A little more human. A little more connected.</span><span>Made with a little <span className="heart">♥</span></span></footer>
    </div>
  );
}
