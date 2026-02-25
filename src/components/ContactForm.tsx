import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { useSubmitMessage } from "@/hooks/use-portfolio";
import { FlyingArrow } from "./SendAnimation";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Ripple = ({ x, y }: { x: number; y: number }) => (
  <motion.span
    initial={{ scale: 0, opacity: 0.5 }}
    animate={{ scale: 4, opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="absolute bg-white/40 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
    style={{ left: x, top: y, width: 20, height: 20 }}
  />
);

export function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const submitMutation = useSubmitMessage();

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples(prev => [...prev, { id: Date.now(), x, y }]);
    setTimeout(() => setRipples(prev => prev.slice(1)), 1000);
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      setTriggerAnimation(true);
      await submitMutation.mutateAsync(data);
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Submission error", error);
    }
  };

  return (
    <>
      <div className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden">
        {/* Decorative gradient inside form */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 relative z-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80" htmlFor="name">Name</label>
                  <input
                    {...register("name")}
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80" htmlFor="email">Email</label>
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80" htmlFor="message">Message</label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                />
                {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                onClick={handleButtonClick}
                disabled={submitMutation.isPending}
                className="w-full group py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-2 hover:shadow-neon disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden relative active:scale-95 shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                {ripples.map(r => <Ripple key={r.id} x={r.x} y={r.y} />)}
              </button>

              {submitMutation.isError && (
                <p className="text-destructive text-center mt-4 text-sm font-medium">Failed to send message. Please try again.</p>
              )}
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center space-y-6"
            >
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary"
              >
                <CheckCircle2 size={56} />
              </motion.div>
              <div className="space-y-2">
                <h3 className="text-4xl font-black text-white tracking-tight">MISSION ACCOMPLISHED</h3>
                <p className="text-primary font-mono text-sm tracking-widest uppercase">Message Transmission Successful</p>
              </div>
              <p className="text-white/60 max-w-sm text-lg leading-relaxed">
                Your message has been beamed to my inbox. I'll decode it and reach out within 24 hours.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-8 px-8 py-3 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors font-bold text-sm"
              >
                SEND ANOTHER TRANSMISSION
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FlyingArrow isTriggered={triggerAnimation} onComplete={() => setTriggerAnimation(false)} />
    </>
  );
}
