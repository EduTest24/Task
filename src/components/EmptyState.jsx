"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const EmptyState = ({ 
  title = "Feature Coming Soon", 
  description = "", 
  Icon = Mail 
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Icon with subtle animation */}
      <motion.div
        className="text-gray-400"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon className="w-12 h-12" />
      </motion.div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>

      {/* Optional description */}
      {description && (
        <p className="text-gray-500 text-sm">{description}</p>
      )}
    </motion.div>
  );
};

export default EmptyState;
