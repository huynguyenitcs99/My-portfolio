"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  createCelestialSystem,
  loadCelestialMaps,
  disposeMaps,
  type CelestialSystem,
} from "./celestial-system";

export default function Universe({ paused }: { paused: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const pauseRef = useRef(paused);
  const wakeRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    pauseRef.current = paused;
    wakeRef.current?.();
  }, [paused]);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      el.dataset.state = "unavailable";
      return;
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 300);
    camera.position.z = 10;
    renderer.setClearColor(0, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, window.innerWidth < 800 ? 1 : 1.5),
    );
    el.appendChild(renderer.domElement);
    let disposed = false,
      inView = true,
      elapsed = 0,
      raf = 0,
      last = 0,
      dirty = true,
      compact = false,
      scrollProgress = 0,
      scrollTarget = 0,
      contextUnavailable = false,
      mapsFailed = false;
    let system: CelestialSystem | undefined;
    const render = () => renderer.render(scene, camera);
    const compose = () => {
      if (!system) return;
      system.update(elapsed, camera, compact, scrollProgress);
    };
    const measureScroll = () => {
      const story = el.closest(".cosmic-experience");
      if (!story) return;
      const rect = story.getBoundingClientRect();
      scrollTarget = THREE.MathUtils.clamp(
        -rect.top / Math.max(1, rect.height - window.innerHeight),
        0,
        1,
      );
      if (pauseRef.current) scrollProgress = scrollTarget;
      dirty = true;
      restart();
    };
    const resize = () => {
      if (contextUnavailable || mapsFailed) return;
      const { width, height } = el.getBoundingClientRect();
      compact = width <= 800;
      if (!width || !height) return;
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, width < 800 ? 1 : 1.5),
      );
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      measureScroll();
      compose();
      render();
      dirty = false;
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(el);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      restart();
    });
    observer.observe(el);
    function tick(now: number) {
      raf = 0;
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!document.hidden && inView && !contextUnavailable) {
        if (!pauseRef.current) {
          elapsed += delta;
          scrollProgress +=
            (scrollTarget - scrollProgress) * (1 - Math.exp(-delta * 5));
        }
        if (system && (dirty || !pauseRef.current)) {
          compose();
          render();
          dirty = false;
        }
        if (!pauseRef.current) raf = requestAnimationFrame(tick);
      }
    }
    wakeRef.current = restart;
    function restart() {
      if (
        !raf &&
        !disposed &&
        !contextUnavailable &&
        !mapsFailed &&
        system &&
        inView &&
        !document.hidden
      ) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    }
    const contextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(raf);
      raf = 0;
      contextUnavailable = true;
      el.dataset.state = "unavailable";
    };
    const contextRestored = () => {
      if (disposed || mapsFailed) return;
      contextUnavailable = false;
      dirty = true;
      el.dataset.state = system ? "ready" : "loading";
      resize();
      restart();
    };
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    renderer.domElement.addEventListener(
      "webglcontextrestored",
      contextRestored,
    );
    document.addEventListener("visibilitychange", restart);
    window.addEventListener("scroll", measureScroll, { passive: true });
    loadCelestialMaps((path) => `/images/cosmic/${path.replace("assets/", "")}`)
      .then((maps) => {
        if (disposed) {
          disposeMaps(maps);
          return;
        }
        system = createCelestialSystem(scene, maps);
        el.dataset.state = contextUnavailable ? "unavailable" : "ready";
        if (!contextUnavailable) {
          resize();
          restart();
        }
      })
      .catch(() => {
        if (disposed) return;
        mapsFailed = true;
        cancelAnimationFrame(raf);
        raf = 0;
        el.dataset.state = "unavailable";
      });
    return () => {
      disposed = true;
      wakeRef.current = null;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", restart);
      window.removeEventListener("scroll", measureScroll);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      renderer.domElement.removeEventListener(
        "webglcontextrestored",
        contextRestored,
      );
      system?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return <div className="universe-canvas" ref={host} aria-hidden="true" />;
}
