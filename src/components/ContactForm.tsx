import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { useSubmitMessage } from "@/hooks/use-portfolio";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });
  
  const [isSuccess, setIsSuccess] = useState(false);
  const submitMutation = useSubmitMessage();

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitMutation.mutateAsync(data);
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Submission error", error);
    }
  };

  return (
    <div className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden">
      {/* Decorative gradient inside form */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
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
          disabled={submitMutation.isPending || isSuccess}
          className="w-full group py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-2 hover:shadow-neon disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden relative"
        >
          <span className="relative z-10 flex items-center gap-2">
            {submitMutation.isPending ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Sending...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 size={20} /> Message Sent!
              </>
            ) : (
              <>
                Send Message
                <Send size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </span>
          {/* Button hover effect background */}
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </button>
        
        {submitMutation.isError && (
          <p className="text-destructive text-center mt-4">Failed to send message. Please try again.</p>
        )}
      </form>
    </div>
  );
}
