import { useRef, useState, useEffect } from "react";
import React from "react";
import { useReducedMotion } from "../hooks/useAnimations";

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 700,
  threshold = 0.1,
  once = true,
  style,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay, threshold, once]);

  const baseStyles = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? "translate3d(0,0,0)"
      : direction === "up"
      ? "translate3d(0,40px,0)"
      : direction === "down"
      ? "translate3d(0,-40px,0)"
      : direction === "left"
      ? "translate3d(40px,0,0)"
      : "translate3d(-40px,0,0)",
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
    willChange: "opacity, transform",
  };

  return (
    <div ref={ref} className={className} style={{ ...baseStyles, ...style }}>
      {children}
    </div>
  );
}

export function StaggeredReveal({
  children,
  className = "",
  itemClassName = "",
  delay = 100,
  direction = "up",
  duration = 600,
  threshold = 0.1,
}) {
  const [visibleIndices, setVisibleIndices] = useState(new Set());
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          React.Children.toArray(children).forEach((_, i) => {
            setTimeout(() => {
              setVisibleIndices((prev) => new Set([...prev, i]));
            }, i * delay);
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [children.length, delay, threshold]);

  return (
    <div ref={containerRef} className={className}>
      {React.Children.map(children, (child, i) =>
        React.isValidElement(child) ? (
          <div
            key={i}
            className={itemClassName}
            style={{
              opacity: visibleIndices.has(i) ? 1 : 0,
              transform: visibleIndices.has(i)
                ? "translate3d(0,0,0)"
                : direction === "up"
                ? "translate3d(0,30px,0)"
                : "translate3d(0,-30px,0)",
              transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
              willChange: "opacity, transform",
            }}
          >
            {child}
          </div>
        ) : null
      )}
    </div>
  );
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.3,
  wrapperClassName = "",
  ...props
}) {
  const [offset, setOffset] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
        const distance = (scrolled + windowHeight - elementTop) / (windowHeight + elementHeight);
        setOffset(distance * speed * 150);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${wrapperClassName}`}>
      <img
        src={src}
        alt={alt}
        className={className}
        style={{
          transform: `translate3d(0, ${offset}px, 0)`,
          willChange: "transform",
          transition: "transform 0.1s linear",
        }}
        {...props}
      />
    </div>
  );
}

export function FloatingElement({
  children,
  className = "",
  intensity = 15,
  rotation = 0,
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setPosition({ x: x * intensity, y: y * intensity });
    };

    const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [intensity, prefersReduced]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: prefersReduced
          ? "none"
          : `translate3d(${position.x}px, ${position.y}px, 0) rotate(${position.x * rotation}deg)`,
        transition: prefersReduced ? "none" : "transform 0.3s ease-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}