import React from 'react';
import {palette} from './theme';

/** A deliberately shared design grammar; every placed specimen has its own JSX node. */
export function OrbitGlyph({color = palette.copper, pale = palette.plum}: {color?: string; pale?: string}) {
  return <g>
    <ellipse cx="239" cy="348" rx="153" ry="66" fill="none" stroke={pale} strokeWidth="41" transform="rotate(-43 239 348)" />
    <ellipse cx="252" cy="370" rx="145" ry="53" fill="none" stroke={color} strokeWidth="24" transform="rotate(35 252 370)" />
    <circle cx="343" cy="268" r="16" fill={color} />
  </g>;
}

export function PosterSpecimen() {
  return <svg viewBox="0 0 480 640" width="100%" height="100%" role="img" aria-label="Original Form and Field poster design specimen">
    <rect width="480" height="640" fill={palette.ivory} />
    <text x="36" y="49" fill={palette.graphite} fontFamily="HuyInter, sans-serif" fontSize="13" letterSpacing="3">FOOD · CULTURE · CONNECTION</text>
    <path d="M36 68H444" stroke={palette.line} />
    <text x="30" y="161" fill={palette.graphite} fontFamily="HuyInter, sans-serif" fontSize="96" fontWeight="650" letterSpacing="-8">FORM</text>
    <text x="33" y="241" fill={palette.graphite} fontFamily="HuyInter, sans-serif" fontSize="76" fontWeight="550" letterSpacing="-6">& FIELD</text>
    <OrbitGlyph />
    <rect x="0" y="528" width="480" height="112" fill={palette.plumDark} />
    <text x="36" y="567" fill={palette.ivory} fontFamily="HuyInter, sans-serif" fontSize="19" fontWeight="550">An evening of good taste.</text>
    <text x="36" y="603" fill="#D7C6D1" fontFamily="HuyInter, sans-serif" fontSize="12" letterSpacing="1">AN ORIGINAL DESIGN STUDY / 01</text>
    <path d="M395 592h40m-12-12 12 12-12 12" stroke={palette.copper} strokeWidth="2" fill="none" />
  </svg>;
}

export function MenuSpecimen() {
  return <svg viewBox="0 0 480 640" width="100%" height="100%" role="img" aria-label="Menu using the same Form and Field design grammar">
    <rect width="480" height="640" fill={palette.ivory} />
    <rect width="480" height="115" fill={palette.plumDark} />
    <text x="32" y="46" fill={palette.ivory} fontFamily="HuyInter, sans-serif" fontSize="22" fontWeight="600" letterSpacing="-1">FORM & FIELD</text>
    <text x="32" y="87" fill="#D7C6D1" fontFamily="HuyInter, sans-serif" fontSize="12" letterSpacing="2">A SEASONAL TABLE / 01</text>
    <text x="31" y="204" fill={palette.graphite} fontFamily="HuyInter, sans-serif" fontSize="80" fontWeight="550" letterSpacing="-5">MENU</text>
    <text x="34" y="258" fill={palette.plum} fontFamily="HuyInter, sans-serif" fontSize="12" letterSpacing="3">TO BEGIN</text>
    <text x="34" y="296" fill={palette.graphite} fontFamily="HuyInter, sans-serif" fontSize="22">Roasted roots</text>
    <text x="34" y="324" fill="#77716C" fontFamily="HuyInter, sans-serif" fontSize="13">Garden herbs · warm grain · citrus</text>
    <path d="M34 348H446" stroke={palette.line} />
    <text x="34" y="389" fill={palette.graphite} fontFamily="HuyInter, sans-serif" fontSize="22">Fire & field</text>
    <text x="34" y="417" fill="#77716C" fontFamily="HuyInter, sans-serif" fontSize="13">Charred greens · brown butter</text>
    <path d="M34 441H446" stroke={palette.line} />
    <text x="34" y="482" fill={palette.graphite} fontFamily="HuyInter, sans-serif" fontSize="22">Something sweet</text>
    <text x="34" y="510" fill="#77716C" fontFamily="HuyInter, sans-serif" fontSize="13">Poached pear · toasted almond</text>
    <g transform="translate(287 370) scale(.35)"><OrbitGlyph /></g>
    <path d="M34 578H268" stroke={palette.line} />
    <text x="34" y="609" fill="#77716C" fontFamily="HuyInter, sans-serif" fontSize="12" letterSpacing="1">FOOD · CULTURE · CONNECTION</text>
  </svg>;
}

export function BusinessCardSpecimen() {
  return <svg viewBox="0 0 560 320" width="100%" height="100%" role="img" aria-label="Business card using the same Form and Field design grammar">
    <rect width="560" height="320" fill={palette.plumDark} />
    <text x="34" y="65" fill={palette.ivory} fontFamily="HuyInter, sans-serif" fontSize="35" fontWeight="600" letterSpacing="-2">FORM & FIELD</text>
    <text x="36" y="95" fill="#CFBCC9" fontFamily="HuyInter, sans-serif" fontSize="11" letterSpacing="2">FOOD · CULTURE · CONNECTION</text>
    <g transform="translate(315 80) scale(.44)"><OrbitGlyph pale="#98788D" /></g>
    <text x="36" y="238" fill={palette.ivory} fontFamily="HuyInter, sans-serif" fontSize="17">A place to come together.</text>
    <text x="36" y="279" fill={palette.copper} fontFamily="HuyInter, sans-serif" fontSize="12" letterSpacing="1">ORIGINAL DESIGN STUDY / 03</text>
  </svg>;
}
