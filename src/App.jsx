import { useEffect, useState } from "react";
import "./App.css";

const CONTACT_PHONE = "08125229560";
const CONTACT_EMAIL = "yakubuabdulsalam24434@gmail.com";
const WHATSAPP_PHONE = "2348125229560";
const FEEDBACK_STORAGE_KEY = "mdyx_client_feedback";

const services = [
  {
    title: "Brand-Focused Web Design",
    description:
      "Clean, high-conversion interface systems with premium typography and strong visual hierarchy.",
  },
  {
    title: "Frontend Engineering",
    description:
      "Fast React builds with responsive behavior, smooth interactions, and production-ready structure.",
  },
  {
    title: "Business Automation",
    description:
      "Smart workflows for leads, communication, and follow-up to reduce manual work and increase close rates.",
  },
  {
    title: "Growth & Optimization",
    description:
      "Performance monitoring, UX improvements, and strategic updates that keep your product evolving.",
  },
];

const projects = [
  {
    name: "Velocity Capital Dashboard",
    summary:
      "A data-heavy executive dashboard with role-based views, analytics cards, and animated KPI insights.",
    tags: ["React", "API", "Data Viz"],
  },
  {
    name: "Nova Black Real Estate",
    summary:
      "Luxury property platform featuring immersive listings, smart filters, and lead-capture automation.",
    tags: ["UX", "CRM", "Automation"],
  },
  {
    name: "PulseFit Pro",
    summary:
      "A premium coaching portal with onboarding funnels, booking systems, and subscription-ready pages.",
    tags: ["Funnels", "Payments", "Mobile"],
  },
];

const processSteps = [
  "Discovery and strategy session",
  "High-end visual direction and wireframing",
  "Build, animation, and optimization",
  "Launch and growth support",
];

const stack = [
  "React",
  "Vite",
  "JavaScript",
  "UI Motion",
  "SEO",
  "Figma",
  "Analytics",
  "Automation",
];

const testimonials = [
  {
    quote:
      "Our site went from average to elite. Leads increased in the first two weeks after launch.",
    name: "Aisha Bello",
    role: "Founder, Nova Black",
  },
  {
    quote:
      "The quality is top-tier. Smooth animations, sharp branding, and a serious business feel.",
    name: "Samuel Eze",
    role: "Director, Velocity Capital",
  },
  {
    quote:
      "Fast delivery, clear process, and real outcomes. This is premium work from end to end.",
    name: "Tobi Kareem",
    role: "CEO, PulseFit Pro",
  },
];

function App() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  );
  const [formData, setFormData] = useState({
    name: "",
    project: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    type: "",
    message: "",
  });
  const [feedbackForm, setFeedbackForm] = useState({
    feedbackName: "",
    feedbackRole: "",
    feedbackRating: "5",
    feedbackComment: "",
  });
  const [feedbackStatus, setFeedbackStatus] = useState({
    type: "",
    message: "",
  });
  const [feedbackEntries, setFeedbackEntries] = useState([]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 4500);

    return () => clearInterval(testimonialInterval);
  }, []);

  useEffect(() => {
    const revealNodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.18 },
    );

    revealNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--cursor-x", `${x}%`);
      document.documentElement.style.setProperty("--cursor-y", `${y}%`);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useEffect(() => {
    try {
      const storedFeedback = localStorage.getItem(FEEDBACK_STORAGE_KEY);
      if (!storedFeedback) {
        return;
      }

      const parsedFeedback = JSON.parse(storedFeedback);
      if (Array.isArray(parsedFeedback)) {
        setFeedbackEntries(parsedFeedback);
      }
    } catch {
      setFeedbackEntries([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedbackEntries));
  }, [feedbackEntries]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((current) => ({ ...current, [id]: value }));
  };

  const handleInquirySubmit = (event) => {
    event.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedProject = formData.project.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedProject || !trimmedMessage) {
      setFormStatus({
        type: "error",
        message: "Please fill in name, project type, and message.",
      });
      return;
    }

    const inquiryText = [
      "New portfolio enquiry",
      `Name: ${trimmedName}`,
      `Project Type: ${trimmedProject}`,
      `Message: ${trimmedMessage}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(inquiryText)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setFormStatus({
      type: "success",
      message:
        "Inquiry ready. WhatsApp opened in a new tab. If it did not open, use the email fallback below.",
    });

    setFormData({ name: "", project: "", message: "" });
  };

  const handleFeedbackChange = (event) => {
    const { id, value } = event.target;
    setFeedbackForm((current) => ({ ...current, [id]: value }));
  };

  const handleFeedbackSubmit = (event) => {
    event.preventDefault();

    const trimmedName = feedbackForm.feedbackName.trim();
    const trimmedRole = feedbackForm.feedbackRole.trim();
    const trimmedComment = feedbackForm.feedbackComment.trim();
    const numericRating = Number(feedbackForm.feedbackRating);

    if (!trimmedName || !trimmedComment) {
      setFeedbackStatus({
        type: "error",
        message: "Please enter your name and feedback comment.",
      });
      return;
    }

    if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      setFeedbackStatus({
        type: "error",
        message: "Rating must be between 1 and 5.",
      });
      return;
    }

    const newFeedback = {
      id: `${Date.now()}`,
      name: trimmedName,
      role: trimmedRole || "Client",
      rating: numericRating,
      comment: trimmedComment,
      date: new Date().toLocaleDateString(),
    };

    setFeedbackEntries((current) => [newFeedback, ...current].slice(0, 8));
    setFeedbackStatus({
      type: "success",
      message: "Thank you. Your feedback has been added.",
    });
    setFeedbackForm({
      feedbackName: "",
      feedbackRole: "",
      feedbackRating: "5",
      feedbackComment: "",
    });
  };

  return (
    <div className="portfolio-shell">
      <div className="bg-noise" />
      <div className="bg-glow bg-glow-left" />
      <div className="bg-glow bg-glow-right" />

      <header className="topbar reveal">
        <div className="logo">MDYX SOLUTIONS</div>
        <nav className="topnav">
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#feedback">Feedback</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="btn btn-ghost" href="tel:08125229560">
          Call Now
        </a>
      </header>

      <main>
        <section className="hero reveal" id="home">
          <p className="status-line">
            <span className="live-dot" />
            Available for premium projects
          </p>
          <h1>I build premium websites that help you win more clients.</h1>
          <p className="hero-copy">
            I design and build elegant, conversion-focused digital products with
            advanced animation and strategic UX that feels high-value from first
            glance.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#contact">
              Start a Project
            </a>
            <a
              className="btn btn-ghost"
              href="mailto:yakubuabdulsalam24434@gmail.com"
            >
              Email Me
            </a>
          </div>
          <div className="hero-meta">
            <div>
              <span>Phone</span>
              <a href="tel:08125229560">08125229560</a>
            </div>
            <div>
              <span>Email</span>
              <a href="mailto:yakubuabdulsalam24434@gmail.com">
                yakubuabdulsalam24434@gmail.com
              </a>
            </div>
            <div>
              <span>Local Time</span>
              <strong>{time}</strong>
            </div>
          </div>
        </section>

        <section className="stats reveal">
          <article>
            <h3>40+</h3>
            <p>Projects Delivered</p>
          </article>
          <article>
            <h3>95%</h3>
            <p>Client Satisfaction</p>
          </article>
          <article>
            <h3>24/7</h3>
            <p>Support Window</p>
          </article>
          <article>
            <h3>4x</h3>
            <p>Average Engagement Lift</p>
          </article>
        </section>

        <section className="section reveal" id="services">
          <div className="section-head">
            <h2>Services</h2>
            <p>
              Built for ambitious founders, creators, and growing companies.
            </p>
          </div>
          <div className="grid-services">
            {services.map((service) => (
              <article key={service.title} className="card card-service">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal" id="projects">
          <div className="section-head">
            <h2>Featured Work</h2>
            <p>Clean execution, strategic design, and measurable results.</p>
          </div>
          <div className="grid-projects">
            {projects.map((project) => (
              <article key={project.name} className="card card-project">
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section reveal process">
          <div className="section-head">
            <h2>My Process</h2>
            <p>Simple, fast, and transparent from concept to delivery.</p>
          </div>
          <div className="process-line">
            {processSteps.map((step, index) => (
              <div key={step} className="process-step">
                <span>{`0${index + 1}`}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section reveal stack">
          <div className="section-head">
            <h2>Core Stack</h2>
            <p>Modern tools to keep your product fast and future-proof.</p>
          </div>
          <div className="stack-track">
            <div className="stack-row">
              {[...stack, ...stack].map((item, idx) => (
                <span key={`${item}-${idx}`}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section reveal testimonials">
          <div className="section-head">
            <h2>Client Stories</h2>
            <p>Proof that premium execution drives real outcomes.</p>
          </div>
          <article className="testimonial-card">
            <p>"{testimonials[activeTestimonial].quote}"</p>
            <h4>{testimonials[activeTestimonial].name}</h4>
            <span>{testimonials[activeTestimonial].role}</span>
          </article>
          <div className="testimonial-dots">
            {testimonials.map((item, index) => (
              <button
                type="button"
                key={item.name}
                onClick={() => setActiveTestimonial(index)}
                className={index === activeTestimonial ? "active" : ""}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>
        </section>

        <section className="section reveal feedback" id="feedback">
          <div className="section-head">
            <h2>Give Feedback</h2>
            <p>Worked with me before? Share your experience here.</p>
          </div>
          <div className="feedback-layout">
            <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
              <label htmlFor="feedbackName">Your Name</label>
              <input
                id="feedbackName"
                type="text"
                placeholder="Your full name"
                value={feedbackForm.feedbackName}
                onChange={handleFeedbackChange}
              />
              <label htmlFor="feedbackRole">Your Role / Company</label>
              <input
                id="feedbackRole"
                type="text"
                placeholder="CEO, Founder, Manager..."
                value={feedbackForm.feedbackRole}
                onChange={handleFeedbackChange}
              />
              <label htmlFor="feedbackRating">Rating</label>
              <select
                id="feedbackRating"
                value={feedbackForm.feedbackRating}
                onChange={handleFeedbackChange}
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>
              <label htmlFor="feedbackComment">Feedback</label>
              <textarea
                id="feedbackComment"
                rows="4"
                placeholder="Tell others how the project went..."
                value={feedbackForm.feedbackComment}
                onChange={handleFeedbackChange}
              />
              <button type="submit" className="btn btn-primary">
                Submit Feedback
              </button>
              {feedbackStatus.message ? (
                <p className={`form-status ${feedbackStatus.type}`}>
                  {feedbackStatus.message}
                </p>
              ) : null}
            </form>

            <div className="feedback-wall">
              {feedbackEntries.length === 0 ? (
                <p className="feedback-empty">
                  No new feedback yet. Be the first to share your experience.
                </p>
              ) : (
                feedbackEntries.map((entry) => (
                  <article key={entry.id} className="feedback-card">
                    <p className="feedback-rating">{`Rating: ${entry.rating}/5`}</p>
                    <p className="feedback-comment">"{entry.comment}"</p>
                    <h4>{entry.name}</h4>
                    <span>{`${entry.role} - ${entry.date}`}</span>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="section reveal contact" id="contact">
          <div className="contact-copy">
            <h2>Let's Build Something Elite</h2>
            <p>
              Ready to launch a premium portfolio or business website with bold
              visuals, smooth animation, and high-conversion structure.
            </p>
            <div className="contact-links">
              <a href={`tel:${CONTACT_PHONE}`}>{CONTACT_PHONE}</a>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleInquirySubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <label htmlFor="project">Project Type</label>
            <input
              id="project"
              type="text"
              placeholder="Portfolio / Business website"
              value={formData.project}
              onChange={handleInputChange}
            />
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="4"
              placeholder="Tell me what you want to build..."
              value={formData.message}
              onChange={handleInputChange}
            />
            <button type="submit" className="btn btn-primary">
              Send Inquiry
            </button>
            <a
              className="form-fallback-link"
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("New portfolio enquiry")}`}
            >
              Fallback: Send via Email
            </a>
            {formStatus.message ? (
              <p className={`form-status ${formStatus.type}`}>
                {formStatus.message}
              </p>
            ) : null}
          </form>
        </section>
      </main>

      <footer className="footer reveal">
        <p>MDYX Solutions</p>
        <p>Designed for premium impact.</p>
      </footer>
    </div>
  );
}

export default App;
