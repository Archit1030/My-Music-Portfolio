import React from 'react';
import { motion } from 'framer-motion';
import { Github, Phone, Instagram, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/Archit1030', target: '_blank' },
    { icon: Phone, label: 'Phone', href: 'tel:+919997294048', target: '_self' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/archit_badoni/', target: '_blank' },
    { icon: Mail, label: 'Email', href: 'mailto:archit.badoni1015@gmail.com', target: '_self' }
  ];

  return (
    <footer className="relative bg-black border-t border-gray-900 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3
              className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-3"
              style={{ fontFamily: '"Bebas Neue", sans-serif' }}
            >
              ARCHIT
            </h3>
            <p className="text-gray-500 text-sm">
              Music Producer & Creative Developer
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#music" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">
                  Music
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target={social.target}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 hover:border-cyan-500/50 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all duration-300 interactive"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Archit. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm flex items-center gap-1">
            Crafted with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> and code
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
