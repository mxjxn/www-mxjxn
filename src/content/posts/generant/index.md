---
title: "Generant: a DAW for instruments and OSC"
slug: generant
date: 2026-10-16
tags:
  - supersonic
  - blender
  - osc
  - music
excerpt: "I built a desktop DAW on SuperSonic — tracker sequencing, instruments assembled from synthdefs, and OSC output that becomes Blender timeline data. One protocol, three tools: Generant, the OSC Score Bridge, and a Renoise extension."
draft: false
---

> **In progress.** This article is being written — the summary on the front page
> is live, the full story lands here.

I wanted a DAW running on [SuperSonic](https://github.com/samaaron/supersonic)
that I could use to build my own instruments, and I wanted to work more deeply
with OSC. Generant is that workstation: a tracker sequencer, instruments and CV
devices, and score output that doesn't stop at audio.

## The three pieces

- **[Generant](https://mxjxn.github.io/Generant)** — the workstation. Sequence
  notes, velocity, and parameter changes; arrange patterns into songs; build
  instruments from synthdefs with LFOs, envelopes, gates, scales, and effects.
- **[OSC Score Bridge](https://mxjxn.github.io/osc-score-bridge/)** — the Blender
  side. Note-ons, knob turns, envelope values, and arbitrary markers like
  `/song/part1` become animation data — objects, lights, cameras, materials.
- **[Renoise OSC Sequencer](https://mxjxn.github.io/renoise-osc-sequencer/)** —
  the same messages, written from Renoise patterns and automation.

## Planned for this article

- Why I built a DAW instead of using one
- The system: tracker / instruments / OSC score output
- Screenshots — rack view, tracker view, a bake into Blender
- What's next
