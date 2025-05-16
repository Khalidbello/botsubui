"use client";

import { MotionH2, MotionDiv } from "../motion-client";
import FeatureCard from "../ui/FeatureCard";
import { features } from "@/data/features";

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <MotionH2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-16"
        >
          Why Choose BotSub?
        </MotionH2>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <MotionDiv
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FeatureCard {...feature} />
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
