import { useState, useEffect } from "react";
import { MessageCircle, Send, User } from "lucide-react";
import { userService } from "../services/userService";
import Modal from "./Modal"; // Assuming Modal is in the same directory

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const data = await userService.getUser(listing.userRef);
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const handleSubmit = () => {
    window.location.href = `mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`;
    setIsOpen(false);
  };

  const modalContent = (
    <>
      <div className="mb-4">
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg dark:bg-gray-700/50">
          <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Contacting
            </p>
            <p className="font-medium text-gray-900 dark:text-white">
              {landlord?.username}
            </p>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Your message regarding {listing.name.toLowerCase()}
        </label>
        <textarea
          name="message"
          id="message"
          rows="4"
          value={message}
          onChange={onChange}
          placeholder="Write your message here..."
          className="w-full p-3 text-gray-900 bg-white border border-gray-300 rounded-lg 
                   focus:ring-2 focus:ring-blue-600 focus:border-transparent 
                   dark:bg-gray-700/50 dark:border-gray-600 dark:text-white 
                   dark:placeholder-gray-400"
        />
      </div>
    </>
  );

  return (
    <>
      {landlord && (
        <div>
          <div className="flex justify-center">
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center justify-centergap-2 px-4 py-3 mt-4 
                     text-sm font-medium text-white transition-all duration-200 
                     bg-green-600 rounded-lg hover:bg-green-700 
                     focus:outline-none focus:ring-2 focus:ring-green-600 
                     focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Landlord
            </button>
          </div>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Contact Landlord"
            primaryAction={handleSubmit}
            primaryActionText="Send Message"
            primaryActionStyle="primary"
            showSecondaryAction={true}
            secondaryActionText="Cancel"
          >
            {modalContent}
          </Modal>
        </div>
      )}
    </>
  );
}
