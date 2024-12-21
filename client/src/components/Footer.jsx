import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import MaintenanceModal from "./MaintenanceModal";

export default function Footer() {
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(true);

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Contact", href: "/contact" },
    ],
    resources: [
      { name: "Blog", href: "/blog" },
      { name: "Market Reports", href: "/reports" },
      { name: "FAQ", href: "/faq" },
      { name: "Help Center", href: "/help" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Disclaimer", href: "/disclaimer" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsMaintenanceModalOpen(true);
  };

  return (
    <>
      <footer className="bg-slate-200 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center">
                <h2 className="text-xl font-bold text-slate-700 dark:text-white">
                  EstateLink
                </h2>
              </Link>
              <p className="text-sm text-slate-600 dark:text-gray-300 max-w-xs">
                Your trusted partner in real estate, connecting people with
                their dream properties across the globe.
              </p>
              {/* Newsletter Signup */}
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-white mb-2">
                  Subscribe to our newsletter
                </h3>
                <form className="flex gap-2" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 rounded-lg text-sm 
                    text-slate-700 dark:text-white border border-slate-300 dark:border-gray-600
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                    text-sm font-medium transition-colors duration-200"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Quick Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-white">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-slate-600 hover:text-blue-600 dark:text-gray-300
                        dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-slate-300 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-sm text-slate-600 dark:text-gray-300">
                © {currentYear} EstateLink. All rights reserved.
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-blue-600 dark:text-gray-300
                      dark:hover:text-blue-400 transition-colors duration-200"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
                <a
                  href="mailto:contact@estatelink.com"
                  className="text-slate-600 hover:text-blue-600 dark:text-gray-300
                  dark:hover:text-blue-400 transition-colors duration-200"
                  aria-label="Email us"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <MaintenanceModal
        isOpen={isMaintenanceModalOpen}
        onClose={() => setIsMaintenanceModalOpen(false)}
        type="repairs"
      />
    </>
  );
}
