import { motion } from 'framer-motion';

interface NeonBorderProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export const NeonBorder: React.FC<NeonBorderProps> = ({ children, isActive = false, onClick }) => {
  return (
    <motion.div
      className={`relative rounded-lg overflow-hidden cursor-pointer ${
        isActive ? 'animate-safety-glow' : ''
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Content */}
      <div className="relative bg-black rounded-lg overflow-hidden z-10">
        {children}
      </div>
    </motion.div>
  );
};