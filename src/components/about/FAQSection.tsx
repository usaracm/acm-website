"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Do I need coding experience to join?",
    answer:
      "Absolutely not! ACM welcomes members from all backgrounds. Whether you're a seasoned programmer or have never written a line of code, you'll find a place here. Our creative wing also offers opportunities in design, content creation, and event management.",
  },
  {
    question: "What's the time commitment?",
    answer:
      "ACM is flexible by design. You can participate as much or as little as you'd like. Most events are standalone, and project teams accommodate various schedules. Typically, active members spend 2-5 hours per week on ACM activities.",
  },
  {
    question: "How do I join a project team?",
    answer:
      "Project teams form organically around ideas and interests. Watch for announcements about new initiatives on our social channels, or propose your own project idea! We help connect people with complementary skills to build amazing things together.",
  },
  {
    question: "Are there membership fees?",
    answer:
      "Core membership to the ACM Student Chapter at GGSIPU EDC is completely free. We believe in making tech education and community accessible to everyone. Some premium events or certifications may have nominal fees.",
  },
  {
    question: "Can non-CS majors join?",
    answer:
      "Absolutely! Some of our most valuable contributors come from non-CS backgrounds. Diverse perspectives—from design and business to humanities and sciences—enrich our projects and strengthen our community.",
  },
  {
    question: "What kind of events do you organize?",
    answer:
      "We organize a wide variety of events including technical workshops (DSA, Web Dev, ML), hackathons, coding competitions, industry speaker sessions, design sprints, networking meetups, and fun team-building activities.",
  },
  {
    question: "How can I become a core team member?",
    answer:
      "Core team recruitments typically happen at the beginning of each academic year. We look for passionate individuals who have actively contributed to the community. Keep participating in events and show initiative!",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[var(--background)] overflow-hidden py-24 md:py-40"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-acm-blue/3 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Label */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6 mb-8"
        >
          <div className="w-16 md:w-24 h-px bg-linear-to-r from-acm-blue/60 to-transparent" />
          <span
            className="text-[10px] md:text-[11px] font-light tracking-[0.5em] text-white/30 uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Common Questions
          </span>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Left - Title */}
          <div className="lg:col-span-2">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-[var(--foreground)] tracking-normal leading-[0.95] mb-6 sticky top-32"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              FREQUENTLY
              <br />
              <span className="text-acm-blue">ASKED</span>
            </motion.h2>
          </div>

          {/* Right - FAQ Items */}
          <div className="lg:col-span-3">
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group"
                >
                  <div
                    className={`relative bg-[var(--surface)] border transition-all duration-300 ${openIndex === index
                      ? 'border-acm-blue/30'
                      : 'border-white/5 hover:border-white/10'
                      }`}
                  >
                    {/* Question Button */}
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                    >
                      <span
                        className={`pr-8 text-sm md:text-base font-medium transition-colors duration-300 ${openIndex === index ? 'text-white' : 'text-white/70'
                          }`}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {faq.question}
                      </span>
                      <div
                        className={`shrink-0 w-8 h-8 flex items-center justify-center border transition-all duration-300 ${openIndex === index
                          ? 'border-acm-blue bg-acm-blue/10'
                          : 'border-white/10 bg-transparent'
                          }`}
                      >
                        {openIndex === index ? (
                          <Minus className="w-4 h-4 text-acm-blue" />
                        ) : (
                          <Plus className="w-4 h-4 text-white/40" />
                        )}
                      </div>
                    </button>

                    {/* Answer */}
                    <AnimatePresence initial={false}>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                            <div className="pt-4 border-t border-white/5">
                              <p
                                className="text-sm text-white/40 leading-[1.8]"
                                style={{ fontFamily: "var(--font-body)" }}
                              >
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
