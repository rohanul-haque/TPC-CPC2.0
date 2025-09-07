import SectionTitle from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  return (
    <section className="mt-6">
      <SectionTitle
        title="📬 Get in Touch ✨"
        paragraph={`💬 Have questions or ideas? Reach out to us! 🌟 We love hearing from you — let's connect and collaborate! 🤝📧`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
        {/* Contact Form */}
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-4 py-2 border-2 rounded-md border-blue-500 dark:border-white outline-none 
              placeholder:text-gray-500 dark:placeholder:text-gray-300"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-4 py-2 border-2 rounded-md border-blue-500 dark:border-white outline-none 
              placeholder:text-gray-500 dark:placeholder:text-gray-300"
              placeholder="Your Email"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full px-4 py-2 border-2 rounded-md border-blue-500 dark:border-white outline-none 
              placeholder:text-gray-500 dark:placeholder:text-gray-300"
              rows="5"
              placeholder="Your Message"
              required
            ></textarea>
          </div>

          <Button
            type="submit"
            className="w-full bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Send Message
          </Button>
        </form>

        {/* Location Map */}
        <div className="h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d682.6582969290503!2d88.44305151003621!3d26.03907650530866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4eb618da025ab%3A0x95cf23c7ca0cb9e3!2sThakurgaon%20Polytechnic%20Institute!5e1!3m2!1sen!2sbd!4v1756376198461!5m2!1sen!2sbd"
            className="w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Thakurgaon Polytechnic Institute Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
