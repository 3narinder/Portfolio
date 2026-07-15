"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormState({ name: "", email: "", message: "" });

      // Reset success status after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-mono text-sm mb-4">
            04. What&apos;s Next?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            I&apos;m currently looking for new opportunities and my inbox is
            always open. Whether you have a question, a project idea, or just
            want to say hi, I&apos;ll try my best to get back to you!
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-card border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-card border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              value={formState.message}
              onChange={(e) =>
                setFormState({ ...formState, message: e.target.value })
              }
              required
              rows={6}
              className="w-full px-4 py-3 bg-card border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
              placeholder="Hi Narinder, I'd love to discuss a project with you..." // Updated here
            />
          </div>

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-destructive text-sm"
            >
              <AlertCircle size={16} />
              {errorMessage}
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-primary text-sm"
            >
              <CheckCircle size={16} />
              Message sent successfully! I&apos;ll get back to you soon.
            </motion.div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
              whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </motion.button>

            <span className="text-muted-foreground text-sm">or</span>

            <a
              href="mailto:narinderd9@gmail.com" // Updated here
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-md font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 w-full sm:w-auto justify-center"
            >
              <Mail size={20} />
              Email Directly
            </a>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
