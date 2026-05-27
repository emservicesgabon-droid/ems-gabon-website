"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Users, CalendarCheck, FolderCheck, Headphones } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { stats } from "@/data/stats";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Users,
  CalendarCheck,
  FolderCheck,
  Headphones,
};

function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function StatItem({ stat, animate }: { stat: (typeof stats)[0]; animate: boolean }) {
  const t = useTranslations();
  const count = useCountUp(stat.value, 1800, animate);
  const Icon = iconMap[stat.icon] ?? Users;

  return (
    <div className="flex flex-col items-center text-center gap-2">
      <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-1">
        <Icon size={22} className="text-primary-700" />
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-primary-700 tabular-nums">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-sm text-text-muted font-medium">{t(stat.labelKey)}</div>
    </div>
  );
}

export function StatsCounter() {
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 bg-grey-50 border-y border-border">
      <Container>
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12"
        >
          {stats.map((stat) => (
            <StatItem key={stat.id} stat={stat} animate={animate} />
          ))}
        </div>
      </Container>
    </section>
  );
}
