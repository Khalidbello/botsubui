import { ReactNode } from "react";
import { MotionDiv } from "@/components/motion-client";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <MotionDiv
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
    >
      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </MotionDiv>
  );
}
