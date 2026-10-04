"use client";
import { ActionIcon } from "@/components/action-icon";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePrefersReducedMotion, useMediaQuery } from "../use-media-query";
import { ProjectArt } from "./project-art";
import { clamp, ease, mix } from "@/lib/orbit";
import { heroTextEnvelopes, heroTrackPose, type HeroGeometry, type ReadingBox } from "./hero-composition";
import type { Project } from "@/content/projects";

const Universe = dynamic(() => import("./universe"), { ssr: false });

export function CosmicExperience({
  children,
  projects,
}: {
  children: ReactNode;
  projects: Project[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const portrait = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const origin = useRef<DOMRect | null>(null);
  const closing = useRef(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const mobile = useMediaQuery("(max-width: 1199px)");
  const stopped = paused || reduced || selected !== null;
  const stoppedRef = useRef(stopped);
  const interacting = useRef(false);
  const hovered = useRef(false);
  const focused = useRef(false);
  const sceneResume = useRef<(() => void) | null>(null);
  const heroGeometry = useRef<HeroGeometry | null>(null);
  useEffect(() => {
    stoppedRef.current = stopped;
    sceneResume.current?.();
  }, [stopped]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const copy = el.querySelector<HTMLElement>(".identity-copy");
    const proof = el.querySelector<HTMLElement>(".arrival-proof");
    const header = document.querySelector<HTMLElement>(".site-header");
    let scheduled = 0;
    let live = true;
    const glyphBoxes = (node: HTMLElement): ReadingBox[] => {
      const range = document.createRange();
      range.selectNodeContents(node);
      return Array.from(range.getClientRects()).filter((box) => box.width > 1 && box.height > 1).map((box) => ({
        left: box.left, right: box.right, top: box.top + window.scrollY, bottom: box.bottom + window.scrollY,
      }));
    };
    const fitComposition = () => {
      scheduled = 0;
      if (!live || !copy) return;
      const vw = el.clientWidth;
      const vh = window.innerHeight;
      const scale = vw / 1536;
      el.style.setProperty("--hero-scale", String(scale));
      el.style.setProperty("--huy-projection", String(0.001027158 / scale));
      el.style.setProperty("--nguyen-projection", String(-0.000454974 / scale));
      el.style.setProperty("--name-drop", String(30 * scale));
      const description = copy.querySelector<HTMLElement>(".hero-description");
      const enlarged = description && parseFloat(getComputedStyle(description).fontSize) > 22;
      const compact = vw < 1200 || Boolean(enlarged);
      const previousMode = el.dataset.heroLayout;
      el.dataset.heroLayout = compact ? "compact" : "wide";
      const rootY = el.getBoundingClientRect().top + window.scrollY;
      const scrollTranslation = copy.offsetTop - (copy.getBoundingClientRect().top + window.scrollY - rootY);
      const reading = Array.from(copy.querySelectorAll<HTMLElement>(".hero-positioning h2,.hero-description,.hero-explore")).flatMap(glyphBoxes).map((box) => ({ ...box, top: box.top - rootY + scrollTranslation, bottom: box.bottom - rootY + scrollTranslation }));
      // These are C's measured painted cap envelopes, rather than the fonts'
      // taller line boxes (which include empty descent below uppercase ink).
      if (!compact) reading.unshift(
        { left: 479 * scale, right: 883 * scale, top: 85 * scale, bottom: 262 * scale, signature: true },
        { left: 547 * scale, right: 1081 * scale, top: 241 * scale, bottom: 346 * scale, signature: true },
      );
      const proofHeight = compact ? 0 : proof?.offsetHeight ?? 245 * scale;
      el.style.setProperty("--proof-height", `${proofHeight}px`);
      const copyBottom = copy.offsetTop + copy.offsetHeight;
      let nextTop = compact ? copyBottom + 30 : Math.max(105 * scale, (header?.offsetHeight ?? 64) + 38);
      const frames = cards.current.map((card, index) => {
        const width = compact ? Math.min(vw * [ .47, .57, .55 ][index], [400, 510, 490][index]) : vw * [.243, .328, .355][index];
        // Measure a caption at its arrival width, independently of the focused
        // live card. Scroll must never feed a growing frame back into hero fit.
        const measuring = document.createElement("button");
        measuring.type = "button";
        measuring.inert = true;
        measuring.className = `orbit-project orbit-project-${index}`;
        Object.assign(measuring.style, { width: `${width}px`, position: "absolute", left: "-10000px", top: "0", transform: "none", visibility: "hidden", animation: "none" });
        const caption = card?.querySelector(".orbit-caption");
        if (caption) measuring.appendChild(caption.cloneNode(true));
        const art = document.createElement("div");
        art.style.height = `${width / (compact ? [2.4, 1.6, 3.2][index] : [2.4, 2.6, 4.8][index])}px`;
        measuring.appendChild(art);
        const contribution = card?.querySelector(".orbit-contribution");
        if (contribution) measuring.appendChild(contribution.cloneNode(true));
        el.appendChild(measuring);
        const height = measuring.offsetHeight;
        const measuringBox = measuring.getBoundingClientRect();
        const text = Array.from(measuring.querySelectorAll<HTMLElement>(".orbit-caption strong,.orbit-caption small,.orbit-contribution")).flatMap(glyphBoxes).map((box) => ({
          left: box.left - measuringBox.left, right: box.right - measuringBox.left,
          top: box.top - measuringBox.top - window.scrollY, bottom: box.bottom - measuringBox.top - window.scrollY,
        }));
        measuring.remove();
        const rotation = [4, 6, 7][index];
        const angle = rotation * Math.PI / 180;
        const span = compact || contribution ? height * Math.cos(angle) + width * Math.sin(angle) : height - 28;
        if (!compact) {
          const labels = heroTextEnvelopes({ width, height, text }, rotation + .6);
          const cornerRise = width * Math.sin((rotation + .6) * Math.PI / 180) / 2;
          // Use the same rotated reading bounds as the animation. A line that
          // clears the name before rotation must also clear it on first paint.
          for (let pass = 0; pass < reading.length; pass++) for (const box of reading) {
            const left = vw * .975 - width - Math.min(.11 * vw, nextTop / Math.max(vh, 1024 * scale) * .11 * vw);
            if (left >= box.right + 24 || box.right + 24 + width <= vw * .975) continue;
            const envelopes = box.signature ? labels : [{ top: -cornerRise, bottom: height + cornerRise }];
            const padding = box.signature ? 6 : 18;
            for (const label of envelopes) if (nextTop + label.bottom > box.top - padding && nextTop + label.top < box.bottom + padding + 16) {
              nextTop = Math.max(nextTop, box.bottom + padding + 16 - label.top);
            }
          }
        }
        const top = nextTop;
        nextTop += span + (compact ? 20 : 12);
        const center = top + height / 2;
        const left = vw * .975 - width - Math.min(.11 * vw, top / Math.max(vh, 1024 * scale) * .11 * vw);
        el.style.setProperty(`--hero-card-y-${index}`, `${compact ? top + (span - height) / 2 : center}px`);
        el.style.setProperty(`--hero-card-x-${index}`, `${left + width / 2}px`);
        return { width, height, span, rotation, offset: top + span, text };
      });
      const portraitSide = compact ? Math.min(900, vw * 1.1) : vw * .5;
      const portraitTop = compact ? copyBottom + 86 : 0;
      const arrivalHeight = compact
        ? Math.ceil(Math.max(nextTop + 44, portraitTop + portraitSide + 24))
        : Math.ceil(Math.max(vh, 1024 * scale, nextTop + proofHeight + 14));
      el.style.setProperty("--arrival-height", `${arrivalHeight}px`);
      el.style.setProperty("--portrait-side", `${portraitSide}px`);
      el.style.setProperty("--portrait-top", `${portraitTop}px`);
      const limit = arrivalHeight - proofHeight + 44;
      heroGeometry.current = { compact, width: vw, height: arrivalHeight, limit,
        readingLimit: compact ? arrivalHeight : arrivalHeight - proofHeight - 34,
        cycle: limit + Math.max(...frames.map((frame) => frame.span)) + 80,
        frames, reading };
      // Story fit is derived again only when geometry changes, never on each frame.
      if (previousMode !== el.dataset.heroLayout) window.dispatchEvent(new Event("resize"));
      sceneResume.current?.();
    };
    const schedule = () => { if (!scheduled) scheduled = requestAnimationFrame(fitComposition); };
    fitComposition();
    const observer = new ResizeObserver(schedule);
    if (copy) observer.observe(copy);
    if (proof) observer.observe(proof);
    window.addEventListener("resize", schedule);
    void document.fonts.ready.then(schedule);
    return () => {
      live = false;
      cancelAnimationFrame(scheduled);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    el.dataset.enhanced = "true";
    if (reduced) return;
    const panels = Array.from(
      el.querySelectorAll<HTMLElement>(".chapter-mobile-art"),
    );
    const advanceInlineArtwork = () => {
      panels.forEach((panel) => {
        const top = panel.getBoundingClientRect().top;
        panel.style.setProperty(
          "--workflow",
          String(ease((window.innerHeight - top) / (window.innerHeight * 0.62))),
        );
      });
    };
    if (mobile) {
      // Smaller screens keep native flow; the workflow still advances as each artwork enters view.
      let frame = 0;
      const updatePanels = () => {
        frame = 0;
        advanceInlineArtwork();
      };
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(updatePanels);
      };
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      schedule();
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        panels.forEach((panel) => panel.style.removeProperty("--workflow"));
      };
    }
    const cardNodes = cards.current;
    const portraitNode = portrait.current;
    const heroCopy = el.querySelector<HTMLElement>(".identity-copy");
    const heroExplore = heroCopy?.querySelector<HTMLElement>("a");
    const arrivalProof = el.querySelector<HTMLElement>(".arrival-proof");
    const heroBottom = el.querySelector<HTMLElement>(".hero-bottom");
    const chapterNodes = projects.map((project) =>
      document.getElementById(project.slug),
    );
    const copyNodes = chapterNodes.map((chapter) =>
      chapter?.querySelector<HTMLElement>(".chapter-copy") ?? null,
    );
    const copyLinks = copyNodes.map((copy) =>
      Array.from(copy?.querySelectorAll<HTMLElement>("a[href],button") ?? []),
    );
    // Hide the visual reading envelopes before enabling fixed placement. All
    // headings and prose remain in the accessibility tree in every scroll beat.
    copyNodes.forEach((copy, index) => {
      if (copy) {
        copy.style.opacity = "0";
        copy.style.pointerEvents = "none";
      }
      copyLinks[index].forEach((link) => { link.inert = true; });
    });
    // Each case has its own acquisition and departure, within one reading envelope.
    const choreography = [
      { width: 78, curveX: 5, curveY: 11, turn: -8, exitX: 24, exitY: 24, exitTurn: 8 },
      { width: 89, curveX: -6, curveY: 5, turn: 11, exitX: 18, exitY: 30, exitTurn: -6 },
      { width: 82, curveX: 3, curveY: -5, turn: -12, exitX: 30, exitY: 22, exitTurn: 10 },
    ];
    let raf = 0,
      elapsed = 0,
      last = performance.now(),
      visible = true;
    let chapterStarts: number[] = [];
    let evidenceStart = 0;
    let flowLayout = false;
    let live = true;
    let focusBoxes: { width: number; centerY: number }[] = [];
    const measure = () => {
      if (!live) return;
      // Re-enter the retained layout before measuring after a resize, so a short
      // viewport's taller inline copy cannot trap a later tall viewport in flow.
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      if (vh < 720 || el.dataset.heroLayout === "compact") el.dataset.storyLayout = "flow";
      else {
        if (el.dataset.storyLayout === "flow") {
          copyNodes.forEach((copy, index) => {
            if (copy) {
              copy.style.opacity = "0";
              copy.style.pointerEvents = "none";
            }
            copyLinks[index].forEach((link) => { link.inert = true; });
          });
        }
        el.dataset.storyLayout = "retained";
      }
      focusBoxes = copyNodes.map((copy, index) => {
        const copyBottom = vh * 0.1 + (copy?.offsetHeight ?? 240);
        const captionHeight = cardNodes[index]?.querySelector<HTMLElement>(".orbit-caption")?.offsetHeight ?? 82;
        const availableHeight = vh - copyBottom - 32 - 32;
        const widthPx = Math.max(0, Math.min(vw * choreography[index].width / 100, (availableHeight - captionHeight - 3) * 2.7));
        const cardHeight = widthPx / 2.7 + captionHeight + 3;
        return {
          width: widthPx / vw * 100,
          centerY: (copyBottom + 32 + cardHeight / 2) / vh * 100,
        };
      });
      flowLayout = el.dataset.heroLayout === "compact" || vh < 720 || focusBoxes.some((box) => box.width * vw / 100 < 640);
      el.dataset.storyLayout = flowLayout ? "flow" : "retained";
      const rootTop = el.getBoundingClientRect().top;
      chapterStarts = chapterNodes.map((chapter) =>
        chapter ? chapter.getBoundingClientRect().top - rootTop : 0,
      );
      const engineering = document.getElementById("engineering");
      evidenceStart = engineering ? engineering.getBoundingClientRect().top - rootTop : el.offsetHeight;
      if (flowLayout) {
        cardNodes.forEach((card) => {
          card?.removeAttribute("style");
          if (card) {
            card.inert = false;
            card.querySelector(".project-art")?.classList.remove("art-wide");
          }
        });
        copyNodes.forEach((copy) => {
          copy?.removeAttribute("style");
          if (copy) copy.inert = false;
        });
        copyLinks.flat().forEach((link) => { link.inert = false; });
        heroCopy?.removeAttribute("style");
        arrivalProof?.removeAttribute("style");
        heroBottom?.removeAttribute("style");
        portraitNode?.removeAttribute("style");
        if (heroExplore) heroExplore.inert = false;
        el.style.removeProperty("--intro-progress");
      }
      sceneResume.current?.();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    copyNodes.forEach((copy) => { if (copy) observer.observe(copy); });
    window.addEventListener("resize", measure);
    void document.fonts.ready.then(measure);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    intersection.observe(el);
    const update = (now: number) => {
      raf = 0;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible || document.hidden) return;
      if (!stoppedRef.current && !interacting.current) elapsed += dt;
      const y = -el.getBoundingClientRect().top;
      const vh = window.innerHeight;
      const geometry = heroGeometry.current;
      if (!geometry) { resume(); return; }
      if (flowLayout) {
        advanceInlineArtwork();
        cards.current.forEach((card, index) => {
          if (!card || geometry.compact) return;
          const pose = heroTrackPose(index, elapsed, geometry);
          card.style.left = `${pose.x}%`;
          card.style.top = `${pose.y}px`;
          card.style.transform = `translate(-50%,-50%) perspective(1200px) rotateY(-5deg) rotate(${pose.rotation}deg)`;
          card.style.opacity = String(pose.opacity);
          card.inert = pose.opacity < .2;
          card.style.pointerEvents = pose.opacity > .2 ? "auto" : "none";
        });
        if (!stoppedRef.current && !interacting.current) raf = requestAnimationFrame(update);
        return;
      }
      const intro = ease((y - vh * 0.025) / (vh * 0.595));
      const identityExit = ease((y - vh * 0.055) / (vh * 0.42));
      const proofExit = ease((y - vh * 0.5) / (vh * 0.35));
      if (heroCopy) {
        heroCopy.style.opacity = String(1 - identityExit);
        heroCopy.style.transform = `translate3d(0,${-identityExit * 28}px,0)`;
        if (heroExplore) heroExplore.inert = identityExit > 0.96;
      }
      if (arrivalProof) {
        arrivalProof.style.opacity = String(1 - proofExit);
        arrivalProof.style.transform = `translate3d(0,${-proofExit * 20}px,0)`;
      }
      if (heroBottom) heroBottom.style.opacity = String(1 - intro);
      if (portrait.current) {
        portrait.current.style.transform = `translate3d(${-intro * 45}%,${intro * 10}%,0) scale(${1 - intro * 0.12})`;
        portrait.current.style.opacity = String(1 - intro);
      }
      el.style.setProperty("--intro-progress", String(intro));
      cards.current.forEach((card, index) => {
        if (!card) return;
        const profile = choreography[index];
        const box = focusBoxes[index];
        const orbit = heroTrackPose(index, elapsed, geometry);
        const start = chapterStarts[index];
        const next = index === 2 ? evidenceStart : chapterStarts[index + 1];
        const entryLead = index === 0 ? 0.26 : 0.34;
        const enter = ease((y - start + vh * entryLead) / (vh * (entryLead - 0.025)));
        const exitLead = index === 2 ? 0.98 : 0.59;
        const leave = ease((y - next + vh * exitLead) / (vh * 0.21));
        const copyEnter = ease((y - start + vh * 0.02) / (vh * 0.1));
        const copyExitLead = index === 2 ? .98 : 0.78;
        const copyExit = ease((y - next + vh * copyExitLead) / (vh * 0.16));
        const copyPresence = copyEnter * (1 - copyExit);
        const copy = copyNodes[index];
        if (copy) {
          copy.style.setProperty("--copy-enter", String(copyEnter));
          copy.style.setProperty("--copy-exit", String(copyExit));
          copy.style.opacity = String(copyPresence);
          copy.style.pointerEvents = copyPresence < 0.1 ? "none" : "auto";
          copy.style.transform = `translate3d(0,${(1 - copyEnter) * 14 - copyExit * 16}px,0)`;
          copyLinks[index].forEach((link) => { link.inert = copyPresence < 0.1; });
        }
        const bend = Math.sin(enter * Math.PI) * (1 - enter);
        const x = mix(orbit.x, 50, enter) + bend * profile.curveX + leave * profile.exitX;
        const cardY = mix(orbit.y, box.centerY * vh / 100, enter) + (bend * profile.curveY + leave * profile.exitY) * vh / 100;
        const baseOpacity = orbit.opacity * (1 - ease((y - vh * 0.3) / (vh * 0.32)));
        const opacity = mix(baseOpacity, 1, enter) * (1 - leave);
        const workflow = mix(1, ease((y - start - vh * 0.1) / (vh * 0.55)), enter);
        // Entry, reading, demonstration and exit have separate native-scroll
        // windows. The original object remains retained through every beat.
        card.style.setProperty("--card-focus", String(enter));
        card.style.setProperty("--overview", String(1 - enter));
        card.querySelector(".project-art")?.classList.toggle("art-wide", enter > 0.6);
        card.style.setProperty("--workflow", String(workflow));
        card.style.left = `${x}%`;
        card.style.top = `${cardY}px`;
        card.style.width = `${mix(orbit.width, box.width, enter)}%`;
        card.style.transform = `translate(-50%,-50%) perspective(1200px) rotateY(${mix(profile.turn, 0, enter) + leave * profile.turn * 0.5}deg) rotate(${mix(orbit.rotation, 0, enter) + leave * profile.exitTurn}deg) scale(${mix(orbit.scale, 1, enter) - leave * 0.22})`;
        card.style.opacity = String(clamp(opacity));
        card.style.zIndex = String(Math.round(10 + orbit.y / 10));
        card.style.pointerEvents = opacity > 0.2 ? "auto" : "none";
        card.inert = opacity < 0.2;
      });
      if (!stoppedRef.current && !interacting.current)
        raf = requestAnimationFrame(update);
    };
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      visible = rect.top < window.innerHeight && rect.bottom > 0;
      cancelAnimationFrame(raf);
      raf = 0;
      update(performance.now());
    };
    function resume() {
      if (!raf && visible && !document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(update);
      }
    }
    sceneResume.current = resume;
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", resume);
    resume();
    return () => {
      live = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      sceneResume.current = null;
      cardNodes.forEach((card) => {
        card?.removeAttribute("style");
        if (card) {
          card.inert = false;
          card.querySelector(".project-art")?.classList.remove("art-wide");
        }
      });
      portraitNode?.removeAttribute("style");
      [heroCopy, arrivalProof, heroBottom, ...copyNodes].forEach((node) => {
        node?.removeAttribute("style");
        if (node) node.inert = false;
      });
      copyLinks.flat().forEach((link) => { link.inert = false; });
      if (heroExplore) heroExplore.inert = false;
      panels.forEach((panel) => panel.style.removeProperty("--workflow"));
      el.style.removeProperty("--intro-progress");
      delete el.dataset.storyLayout;
    };
  }, [mobile, reduced, projects]);

  useEffect(() => {
    if (selected === null) return;
    const modal = dialog.current;
    const activeTrigger = trigger.current;
    modal?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const from = origin.current;
    if (modal && from && !reduced) {
      const to = modal.getBoundingClientRect();
      modal.animate(
        [
          {
            transform: `translate(${from.x - to.x}px, ${from.y - to.y}px) scale(${from.width / to.width}, ${from.height / to.height})`,
            opacity: 0.5,
            borderRadius: "18px",
          },
          { transform: "none", opacity: 1, borderRadius: "24px" },
        ],
        { duration: 620, easing: "cubic-bezier(.22,1,.36,1)" },
      );
    }
    modal?.querySelector<HTMLButtonElement>("button")?.focus();
    return () => {
      modal?.close();
      document.body.style.overflow = previous;
      activeTrigger?.focus({ preventScroll: true });
    };
  }, [selected, reduced]);

  const closePreview = () => {
    if (closing.current) return;
    const modal = dialog.current;
    const destination = trigger.current?.getBoundingClientRect();
    if (!modal || !destination || reduced) {
      setSelected(null);
      return;
    }
    closing.current = true;
    const from = modal.getBoundingClientRect();
    const animation = modal.animate(
      [
        { transform: "none", opacity: 1 },
        {
          transform: `translate(${destination.x - from.x}px, ${destination.y - from.y}px) scale(${destination.width / from.width}, ${destination.height / from.height})`,
          opacity: 0,
        },
      ],
      { duration: 360, easing: "cubic-bezier(.4,0,.2,1)" },
    );
    animation.finished
      .then(() => {
        closing.current = false;
        setSelected(null);
      })
      .catch(() => {
        closing.current = false;
        setSelected(null);
      });
  };

  const project = selected !== null ? projects[selected] : null;
  return (
    <div
      className="cosmic-experience"
      ref={root}
      data-reduced={reduced}
      data-paused={stopped}
    >
      <div className="cosmic-stage">
        <div className="star-field" />
        <Universe paused={stopped} />
        <div className="scene-vignette" />
        <div className="chapter-reading-scrim" />
        <div className="hero-portrait" ref={portrait}>
          <Image
            src="/images/cosmic/portrait-c-lit.webp"
            alt="Huy Nguyen in his black zip hoodie, looking to the right, with headphones around his neck"
            fill
            preload
            sizes="(max-width: 1199px) 110vw, 50vw"
          />
        </div>
        <div
          className="orbit-projects"
          aria-label="Project previews"
          onPointerEnter={() => {
            hovered.current = true;
            interacting.current = true;
          }}
          onPointerLeave={() => {
            hovered.current = false;
            interacting.current = focused.current;
            sceneResume.current?.();
          }}
          onFocus={() => {
            focused.current = true;
            interacting.current = true;
          }}
          onBlur={(event) => {
            if (event.currentTarget.contains(event.relatedTarget)) return;
            focused.current = false;
            interacting.current = hovered.current;
            sceneResume.current?.();
          }}
        >
          {projects.map((p, i) => (
            <button
              key={p.slug}
              ref={(node) => {
                cards.current[i] = node;
              }}
              className={`orbit-project orbit-project-${i}`}
              aria-label={`Preview ${p.title}`}
              onClick={(e) => {
                trigger.current = e.currentTarget;
                origin.current = e.currentTarget.getBoundingClientRect();
                setSelected(i);
              }}
            >
              <span className="orbit-caption">
                <span>
                  <strong>{p.title}</strong>
                  <small>{i === 0 ? "Your daily brief. AI pipeline & agent layer." : i === 1 ? "Menu + Visual DNA. Concept preview." : "In development."}</small>
                </span>
                <span className="round-arrow">
                  <ActionIcon name="right" />
                </span>
              </span>
              <ProjectArt slug={p.slug} />
              {i === 1 && <span className="orbit-contribution">My contribution: reference-image DNA guidelines.</span>}
            </button>
          ))}
        </div>
      </div>
        <div className="stage-controls">
          <button
            onClick={() => setPaused((p) => !p)}
            disabled={reduced}
            aria-label={
              reduced
                ? "Reduced motion enabled"
                : paused
                  ? "Play ambient motion"
                  : "Pause ambient motion"
            }
          >
            {reduced ? (
              <><span className="motion-label">Motion reduced</span><ActionIcon name="pause" /></>
            ) : (
              <>
                <span className="motion-label">{paused ? "Play motion" : "Pause motion"}</span>
                <ActionIcon name={paused ? "play" : "pause"} />
              </>
            )}
          </button>
        </div>
      <div className="story-content">{children}</div>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-label={project?.title ?? "Project preview"}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const targets = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              "a[href], button:not([disabled])",
            ),
          );
          const first = targets[0];
          const last = targets.at(-1);
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onCancel={(e) => {
          e.preventDefault();
          closePreview();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closePreview();
        }}
      >
        {project && (
          <div className="preview-body">
            <button
              className="preview-close"
              aria-label="Close project preview"
              onClick={closePreview}
            >
              Close <ActionIcon name="close" />
            </button>
            <div className="preview-art">
              <ProjectArt slug={project.slug} />
              <span className="status-tag">{project.status}</span>
            </div>
            <div className="preview-copy">
              <p className="eyebrow">{project.eyebrow}</p>
              <h2>{project.title}</h2>
              <p>{project.intro}</p>
              <div className="preview-role">
                <small>My contribution</small>
                <strong>{project.role}</strong>
              </div>
              <Link
                className="pill-link"
                href={`/work/${project.slug}`}
                onClick={() => setSelected(null)}
              >
                Explore the case study <ActionIcon />
              </Link>
              <small className="art-note">
                Concept artwork · {project.company}
              </small>
            </div>
          </div>
        )}
      </dialog>
      <noscript>
        <style>{`.stage-controls,.orbit-projects{display:none}.chapter-mobile-art{display:block!important;width:100%;max-width:700px}.project-chapter{flex-wrap:wrap;min-height:auto;padding-block:90px}.chapter-copy{width:100%}.hero-portrait{opacity:1!important}.cosmic-stage{position:absolute;height:100svh}.cosmic-experience{position:relative}.story-content{margin-top:0}`}</style>
      </noscript>
    </div>
  );
}
