"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Moon, Sun, RotateCcw, Palette, Sliders } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ThemeStyle = "brutalist" | "soft" | "rounded"

type Theme = {
  name: string
  style: ThemeStyle
  radius: string
  colors: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    border: string
    input: string
    ring: string
    chart1: string
    chart2: string
    chart3: string
    chart4: string
    chart5: string
  }
  preview: { bg: string; primary: string; accent: string }
}

const themes: Theme[] = [
  {
    name: "Default",
    style: "brutalist",
    radius: "0rem",
    colors: {
      background: "oklch(0.9721 0.0158 110.5501)",
      foreground: "oklch(0.5066 0.2501 271.8903)",
      card: "oklch(0.9721 0.0158 110.5501)",
      cardForeground: "oklch(0.5066 0.2501 271.8903)",
      popover: "oklch(0.9721 0.0158 110.5501)",
      popoverForeground: "oklch(0.5066 0.2501 271.8903)",
      primary: "oklch(0.5066 0.2501 271.8903)",
      primaryForeground: "oklch(1 0 0)",
      secondary: "oklch(1 0 0)",
      secondaryForeground: "oklch(0.5066 0.2501 271.8903)",
      muted: "oklch(0.9189 0.0147 106.6853)",
      mutedForeground: "oklch(0.5066 0.2501 271.8903)",
      accent: "oklch(0.9168 0.0214 109.7161)",
      accentForeground: "oklch(0.4486 0.2266 271.5512)",
      border: "oklch(0.5066 0.2501 271.8903)",
      input: "oklch(0.5066 0.2501 271.8903)",
      ring: "oklch(0.468 0.2721 279.6007)",
      chart1: "oklch(0.5066 0.2501 271.8903)",
      chart2: "oklch(0.7 0.19 48)",
      chart3: "oklch(0.77 0.2 131)",
      chart4: "oklch(0.68 0.15 237)",
      chart5: "oklch(0.66 0.21 354)",
    },
    preview: { bg: "#f0f0d8", primary: "#5040d9", accent: "#e8e8c0" },
  },
  {
    name: "Midnight",
    style: "soft",
    radius: "0.5rem",
    colors: {
      background: "oklch(0.15 0.02 260)",
      foreground: "oklch(0.95 0.01 260)",
      card: "oklch(0.18 0.025 260)",
      cardForeground: "oklch(0.95 0.01 260)",
      popover: "oklch(0.18 0.025 260)",
      popoverForeground: "oklch(0.95 0.01 260)",
      primary: "oklch(0.65 0.18 250)",
      primaryForeground: "oklch(0.98 0.005 260)",
      secondary: "oklch(0.25 0.03 260)",
      secondaryForeground: "oklch(0.9 0.01 260)",
      muted: "oklch(0.22 0.02 260)",
      mutedForeground: "oklch(0.7 0.02 260)",
      accent: "oklch(0.55 0.2 280)",
      accentForeground: "oklch(0.98 0.005 260)",
      border: "oklch(0.3 0.03 260)",
      input: "oklch(0.25 0.025 260)",
      ring: "oklch(0.65 0.18 250)",
      chart1: "oklch(0.65 0.18 250)",
      chart2: "oklch(0.6 0.15 320)",
      chart3: "oklch(0.7 0.12 180)",
      chart4: "oklch(0.55 0.2 280)",
      chart5: "oklch(0.65 0.15 30)",
    },
    preview: { bg: "#1a1a2e", primary: "#4a90d9", accent: "#7b2cbf" },
  },
  {
    name: "Forest",
    style: "rounded",
    radius: "0.75rem",
    colors: {
      background: "oklch(0.96 0.02 140)",
      foreground: "oklch(0.25 0.08 150)",
      card: "oklch(0.98 0.015 140)",
      cardForeground: "oklch(0.25 0.08 150)",
      popover: "oklch(0.98 0.015 140)",
      popoverForeground: "oklch(0.25 0.08 150)",
      primary: "oklch(0.5 0.15 150)",
      primaryForeground: "oklch(0.98 0.01 140)",
      secondary: "oklch(0.9 0.04 140)",
      secondaryForeground: "oklch(0.3 0.08 150)",
      muted: "oklch(0.92 0.03 140)",
      mutedForeground: "oklch(0.45 0.06 150)",
      accent: "oklch(0.7 0.12 85)",
      accentForeground: "oklch(0.25 0.08 150)",
      border: "oklch(0.85 0.04 145)",
      input: "oklch(0.88 0.03 145)",
      ring: "oklch(0.5 0.15 150)",
      chart1: "oklch(0.5 0.15 150)",
      chart2: "oklch(0.6 0.14 120)",
      chart3: "oklch(0.7 0.12 85)",
      chart4: "oklch(0.55 0.1 180)",
      chart5: "oklch(0.45 0.12 160)",
    },
    preview: { bg: "#e8f5e9", primary: "#2e7d32", accent: "#a5d6a7" },
  },
  {
    name: "Ocean",
    style: "soft",
    radius: "0.5rem",
    colors: {
      background: "oklch(0.97 0.015 220)",
      foreground: "oklch(0.25 0.08 230)",
      card: "oklch(0.99 0.01 220)",
      cardForeground: "oklch(0.25 0.08 230)",
      popover: "oklch(0.99 0.01 220)",
      popoverForeground: "oklch(0.25 0.08 230)",
      primary: "oklch(0.55 0.15 230)",
      primaryForeground: "oklch(0.98 0.01 220)",
      secondary: "oklch(0.92 0.03 220)",
      secondaryForeground: "oklch(0.3 0.08 230)",
      muted: "oklch(0.94 0.02 220)",
      mutedForeground: "oklch(0.5 0.06 230)",
      accent: "oklch(0.7 0.1 200)",
      accentForeground: "oklch(0.25 0.08 230)",
      border: "oklch(0.88 0.03 220)",
      input: "oklch(0.9 0.025 220)",
      ring: "oklch(0.55 0.15 230)",
      chart1: "oklch(0.55 0.15 230)",
      chart2: "oklch(0.6 0.12 200)",
      chart3: "oklch(0.5 0.1 250)",
      chart4: "oklch(0.65 0.08 180)",
      chart5: "oklch(0.45 0.15 240)",
    },
    preview: { bg: "#e3f2fd", primary: "#1565c0", accent: "#81d4fa" },
  },
  {
    name: "Rose",
    style: "rounded",
    radius: "0.75rem",
    colors: {
      background: "oklch(0.98 0.015 350)",
      foreground: "oklch(0.3 0.1 350)",
      card: "oklch(0.99 0.01 350)",
      cardForeground: "oklch(0.3 0.1 350)",
      popover: "oklch(0.99 0.01 350)",
      popoverForeground: "oklch(0.3 0.1 350)",
      primary: "oklch(0.6 0.18 350)",
      primaryForeground: "oklch(0.98 0.01 350)",
      secondary: "oklch(0.94 0.03 350)",
      secondaryForeground: "oklch(0.35 0.1 350)",
      muted: "oklch(0.95 0.02 350)",
      mutedForeground: "oklch(0.5 0.08 350)",
      accent: "oklch(0.8 0.1 20)",
      accentForeground: "oklch(0.3 0.1 350)",
      border: "oklch(0.9 0.04 350)",
      input: "oklch(0.92 0.03 350)",
      ring: "oklch(0.6 0.18 350)",
      chart1: "oklch(0.6 0.18 350)",
      chart2: "oklch(0.7 0.15 20)",
      chart3: "oklch(0.65 0.12 330)",
      chart4: "oklch(0.55 0.2 340)",
      chart5: "oklch(0.75 0.1 10)",
    },
    preview: { bg: "#fce4ec", primary: "#c2185b", accent: "#f8bbd9" },
  },
  {
    name: "Mint",
    style: "soft",
    radius: "0.5rem",
    colors: {
      background: "oklch(0.97 0.02 170)",
      foreground: "oklch(0.25 0.08 175)",
      card: "oklch(0.98 0.015 170)",
      cardForeground: "oklch(0.25 0.08 175)",
      popover: "oklch(0.98 0.015 170)",
      popoverForeground: "oklch(0.25 0.08 175)",
      primary: "oklch(0.6 0.12 175)",
      primaryForeground: "oklch(0.98 0.01 170)",
      secondary: "oklch(0.93 0.03 170)",
      secondaryForeground: "oklch(0.3 0.08 175)",
      muted: "oklch(0.94 0.025 170)",
      mutedForeground: "oklch(0.5 0.06 175)",
      accent: "oklch(0.8 0.1 160)",
      accentForeground: "oklch(0.25 0.08 175)",
      border: "oklch(0.88 0.04 170)",
      input: "oklch(0.9 0.035 170)",
      ring: "oklch(0.6 0.12 175)",
      chart1: "oklch(0.6 0.12 175)",
      chart2: "oklch(0.55 0.1 190)",
      chart3: "oklch(0.7 0.08 155)",
      chart4: "oklch(0.5 0.14 180)",
      chart5: "oklch(0.65 0.1 165)",
    },
    preview: { bg: "#e0f2f1", primary: "#26a69a", accent: "#80cbc4" },
  },
  {
    name: "Slate",
    style: "brutalist",
    radius: "0rem",
    colors: {
      background: "oklch(0.95 0.005 250)",
      foreground: "oklch(0.25 0.02 250)",
      card: "oklch(0.97 0.003 250)",
      cardForeground: "oklch(0.25 0.02 250)",
      popover: "oklch(0.97 0.003 250)",
      popoverForeground: "oklch(0.25 0.02 250)",
      primary: "oklch(0.45 0.04 250)",
      primaryForeground: "oklch(0.98 0.003 250)",
      secondary: "oklch(0.9 0.008 250)",
      secondaryForeground: "oklch(0.3 0.02 250)",
      muted: "oklch(0.92 0.005 250)",
      mutedForeground: "oklch(0.5 0.02 250)",
      accent: "oklch(0.55 0.08 220)",
      accentForeground: "oklch(0.98 0.003 250)",
      border: "oklch(0.85 0.01 250)",
      input: "oklch(0.88 0.008 250)",
      ring: "oklch(0.45 0.04 250)",
      chart1: "oklch(0.45 0.04 250)",
      chart2: "oklch(0.55 0.08 220)",
      chart3: "oklch(0.6 0.06 200)",
      chart4: "oklch(0.5 0.05 270)",
      chart5: "oklch(0.4 0.03 250)",
    },
    preview: { bg: "#eceff1", primary: "#546e7a", accent: "#90a4ae" },
  },
  {
    name: "Amber",
    style: "rounded",
    radius: "0.75rem",
    colors: {
      background: "oklch(0.97 0.025 85)",
      foreground: "oklch(0.3 0.1 70)",
      card: "oklch(0.98 0.02 85)",
      cardForeground: "oklch(0.3 0.1 70)",
      popover: "oklch(0.98 0.02 85)",
      popoverForeground: "oklch(0.3 0.1 70)",
      primary: "oklch(0.7 0.18 75)",
      primaryForeground: "oklch(0.2 0.05 70)",
      secondary: "oklch(0.93 0.04 85)",
      secondaryForeground: "oklch(0.35 0.1 70)",
      muted: "oklch(0.94 0.03 85)",
      mutedForeground: "oklch(0.5 0.08 70)",
      accent: "oklch(0.8 0.12 90)",
      accentForeground: "oklch(0.3 0.1 70)",
      border: "oklch(0.88 0.06 80)",
      input: "oklch(0.9 0.05 80)",
      ring: "oklch(0.7 0.18 75)",
      chart1: "oklch(0.7 0.18 75)",
      chart2: "oklch(0.75 0.15 60)",
      chart3: "oklch(0.65 0.2 90)",
      chart4: "oklch(0.6 0.15 50)",
      chart5: "oklch(0.8 0.1 100)",
    },
    preview: { bg: "#fff8e1", primary: "#ffa000", accent: "#ffe082" },
  },
  {
    name: "Cyberpunk",
    style: "brutalist",
    radius: "0rem",
    colors: {
      background: "oklch(0.12 0.03 300)",
      foreground: "oklch(0.85 0.2 320)",
      card: "oklch(0.15 0.035 300)",
      cardForeground: "oklch(0.85 0.2 320)",
      popover: "oklch(0.15 0.035 300)",
      popoverForeground: "oklch(0.85 0.2 320)",
      primary: "oklch(0.8 0.3 320)",
      primaryForeground: "oklch(0.1 0.03 300)",
      secondary: "oklch(0.2 0.04 300)",
      secondaryForeground: "oklch(0.8 0.2 320)",
      muted: "oklch(0.18 0.035 300)",
      mutedForeground: "oklch(0.65 0.15 320)",
      accent: "oklch(0.75 0.25 180)",
      accentForeground: "oklch(0.1 0.03 300)",
      border: "oklch(0.5 0.25 320)",
      input: "oklch(0.2 0.04 300)",
      ring: "oklch(0.8 0.3 320)",
      chart1: "oklch(0.8 0.3 320)",
      chart2: "oklch(0.75 0.25 180)",
      chart3: "oklch(0.7 0.2 60)",
      chart4: "oklch(0.6 0.3 280)",
      chart5: "oklch(0.85 0.15 100)",
    },
    preview: { bg: "#0d0221", primary: "#ff00ff", accent: "#00ffff" },
  },
  {
    name: "Coffee",
    style: "rounded",
    radius: "0.75rem",
    colors: {
      background: "oklch(0.95 0.02 60)",
      foreground: "oklch(0.3 0.08 50)",
      card: "oklch(0.97 0.015 60)",
      cardForeground: "oklch(0.3 0.08 50)",
      popover: "oklch(0.97 0.015 60)",
      popoverForeground: "oklch(0.3 0.08 50)",
      primary: "oklch(0.45 0.1 50)",
      primaryForeground: "oklch(0.97 0.01 60)",
      secondary: "oklch(0.9 0.035 60)",
      secondaryForeground: "oklch(0.35 0.08 50)",
      muted: "oklch(0.92 0.025 60)",
      mutedForeground: "oklch(0.5 0.06 50)",
      accent: "oklch(0.7 0.12 70)",
      accentForeground: "oklch(0.3 0.08 50)",
      border: "oklch(0.85 0.04 55)",
      input: "oklch(0.88 0.035 55)",
      ring: "oklch(0.45 0.1 50)",
      chart1: "oklch(0.45 0.1 50)",
      chart2: "oklch(0.55 0.08 40)",
      chart3: "oklch(0.65 0.1 70)",
      chart4: "oklch(0.4 0.12 35)",
      chart5: "oklch(0.7 0.06 80)",
    },
    preview: { bg: "#f5f0e6", primary: "#6f4e37", accent: "#c4a77d" },
  },
  {
    name: "Monokai",
    style: "brutalist",
    radius: "0rem",
    colors: {
      background: "oklch(0.22 0.02 70)",
      foreground: "oklch(0.92 0.02 100)",
      card: "oklch(0.25 0.025 70)",
      cardForeground: "oklch(0.92 0.02 100)",
      popover: "oklch(0.25 0.025 70)",
      popoverForeground: "oklch(0.92 0.02 100)",
      primary: "oklch(0.75 0.2 100)",
      primaryForeground: "oklch(0.18 0.02 70)",
      secondary: "oklch(0.3 0.03 70)",
      secondaryForeground: "oklch(0.88 0.02 100)",
      muted: "oklch(0.28 0.025 70)",
      mutedForeground: "oklch(0.7 0.02 100)",
      accent: "oklch(0.7 0.22 350)",
      accentForeground: "oklch(0.95 0.01 100)",
      border: "oklch(0.35 0.03 70)",
      input: "oklch(0.3 0.025 70)",
      ring: "oklch(0.75 0.2 100)",
      chart1: "oklch(0.75 0.2 100)",
      chart2: "oklch(0.7 0.22 350)",
      chart3: "oklch(0.7 0.18 200)",
      chart4: "oklch(0.75 0.15 60)",
      chart5: "oklch(0.65 0.2 280)",
    },
    preview: { bg: "#272822", primary: "#a6e22e", accent: "#f92672" },
  },
  {
    name: "Nord",
    style: "soft",
    radius: "0.5rem",
    colors: {
      background: "oklch(0.28 0.02 240)",
      foreground: "oklch(0.9 0.02 220)",
      card: "oklch(0.32 0.025 240)",
      cardForeground: "oklch(0.9 0.02 220)",
      popover: "oklch(0.32 0.025 240)",
      popoverForeground: "oklch(0.9 0.02 220)",
      primary: "oklch(0.7 0.1 220)",
      primaryForeground: "oklch(0.25 0.02 240)",
      secondary: "oklch(0.35 0.03 240)",
      secondaryForeground: "oklch(0.85 0.02 220)",
      muted: "oklch(0.38 0.025 240)",
      mutedForeground: "oklch(0.7 0.02 220)",
      accent: "oklch(0.65 0.12 180)",
      accentForeground: "oklch(0.92 0.01 220)",
      border: "oklch(0.42 0.03 240)",
      input: "oklch(0.38 0.025 240)",
      ring: "oklch(0.7 0.1 220)",
      chart1: "oklch(0.7 0.1 220)",
      chart2: "oklch(0.65 0.12 180)",
      chart3: "oklch(0.7 0.15 130)",
      chart4: "oklch(0.6 0.18 350)",
      chart5: "oklch(0.75 0.12 60)",
    },
    preview: { bg: "#2e3440", primary: "#88c0d0", accent: "#8fbcbb" },
  },
  {
    name: "Dracula",
    style: "rounded",
    radius: "0.75rem",
    colors: {
      background: "oklch(0.25 0.04 280)",
      foreground: "oklch(0.92 0.02 300)",
      card: "oklch(0.28 0.045 280)",
      cardForeground: "oklch(0.92 0.02 300)",
      popover: "oklch(0.28 0.045 280)",
      popoverForeground: "oklch(0.92 0.02 300)",
      primary: "oklch(0.7 0.2 310)",
      primaryForeground: "oklch(0.22 0.04 280)",
      secondary: "oklch(0.32 0.05 280)",
      secondaryForeground: "oklch(0.88 0.02 300)",
      muted: "oklch(0.35 0.045 280)",
      mutedForeground: "oklch(0.7 0.02 300)",
      accent: "oklch(0.72 0.18 180)",
      accentForeground: "oklch(0.22 0.04 280)",
      border: "oklch(0.4 0.05 280)",
      input: "oklch(0.35 0.045 280)",
      ring: "oklch(0.7 0.2 310)",
      chart1: "oklch(0.7 0.2 310)",
      chart2: "oklch(0.72 0.18 180)",
      chart3: "oklch(0.78 0.15 100)",
      chart4: "oklch(0.65 0.22 350)",
      chart5: "oklch(0.7 0.15 260)",
    },
    preview: { bg: "#282a36", primary: "#ff79c6", accent: "#8be9fd" },
  },
  {
    name: "Solarized Light",
    style: "soft",
    radius: "0.5rem",
    colors: {
      background: "oklch(0.95 0.02 90)",
      foreground: "oklch(0.4 0.08 200)",
      card: "oklch(0.97 0.015 90)",
      cardForeground: "oklch(0.4 0.08 200)",
      popover: "oklch(0.97 0.015 90)",
      popoverForeground: "oklch(0.4 0.08 200)",
      primary: "oklch(0.55 0.15 230)",
      primaryForeground: "oklch(0.97 0.01 90)",
      secondary: "oklch(0.9 0.03 90)",
      secondaryForeground: "oklch(0.45 0.08 200)",
      muted: "oklch(0.92 0.025 90)",
      mutedForeground: "oklch(0.55 0.06 200)",
      accent: "oklch(0.65 0.15 50)",
      accentForeground: "oklch(0.97 0.01 90)",
      border: "oklch(0.85 0.04 90)",
      input: "oklch(0.88 0.035 90)",
      ring: "oklch(0.55 0.15 230)",
      chart1: "oklch(0.55 0.15 230)",
      chart2: "oklch(0.6 0.18 350)",
      chart3: "oklch(0.7 0.15 130)",
      chart4: "oklch(0.65 0.15 50)",
      chart5: "oklch(0.55 0.2 280)",
    },
    preview: { bg: "#fdf6e3", primary: "#268bd2", accent: "#cb4b16" },
  },
  {
    name: "Solarized Dark",
    style: "soft",
    radius: "0.5rem",
    colors: {
      background: "oklch(0.22 0.04 205)",
      foreground: "oklch(0.75 0.05 95)",
      card: "oklch(0.25 0.045 205)",
      cardForeground: "oklch(0.75 0.05 95)",
      popover: "oklch(0.25 0.045 205)",
      popoverForeground: "oklch(0.75 0.05 95)",
      primary: "oklch(0.6 0.15 230)",
      primaryForeground: "oklch(0.95 0.02 95)",
      secondary: "oklch(0.28 0.05 205)",
      secondaryForeground: "oklch(0.72 0.05 95)",
      muted: "oklch(0.3 0.045 205)",
      mutedForeground: "oklch(0.6 0.04 95)",
      accent: "oklch(0.65 0.15 50)",
      accentForeground: "oklch(0.95 0.02 95)",
      border: "oklch(0.35 0.05 205)",
      input: "oklch(0.3 0.045 205)",
      ring: "oklch(0.6 0.15 230)",
      chart1: "oklch(0.6 0.15 230)",
      chart2: "oklch(0.6 0.18 350)",
      chart3: "oklch(0.7 0.15 130)",
      chart4: "oklch(0.65 0.15 50)",
      chart5: "oklch(0.55 0.2 280)",
    },
    preview: { bg: "#002b36", primary: "#2aa198", accent: "#cb4b16" },
  },
  {
    name: "Arctic",
    style: "soft",
    radius: "0.5rem",
    colors: {
      background: "oklch(0.98 0.01 220)",
      foreground: "oklch(0.3 0.06 230)",
      card: "oklch(0.99 0.008 220)",
      cardForeground: "oklch(0.3 0.06 230)",
      popover: "oklch(0.99 0.008 220)",
      popoverForeground: "oklch(0.3 0.06 230)",
      primary: "oklch(0.6 0.1 220)",
      primaryForeground: "oklch(0.98 0.01 220)",
      secondary: "oklch(0.95 0.015 220)",
      secondaryForeground: "oklch(0.35 0.06 230)",
      muted: "oklch(0.96 0.012 220)",
      mutedForeground: "oklch(0.5 0.05 230)",
      accent: "oklch(0.75 0.08 200)",
      accentForeground: "oklch(0.3 0.06 230)",
      border: "oklch(0.9 0.02 220)",
      input: "oklch(0.92 0.018 220)",
      ring: "oklch(0.6 0.1 220)",
      chart1: "oklch(0.6 0.1 220)",
      chart2: "oklch(0.65 0.08 240)",
      chart3: "oklch(0.7 0.09 190)",
      chart4: "oklch(0.55 0.12 210)",
      chart5: "oklch(0.75 0.06 180)",
    },
    preview: { bg: "#f0f8ff", primary: "#87ceeb", accent: "#b0e0e6" },
  },
  {
    name: "Volcanic",
    style: "brutalist",
    radius: "0rem",
    colors: {
      background: "oklch(0.18 0.05 30)",
      foreground: "oklch(0.9 0.05 50)",
      card: "oklch(0.22 0.06 30)",
      cardForeground: "oklch(0.9 0.05 50)",
      popover: "oklch(0.22 0.06 30)",
      popoverForeground: "oklch(0.9 0.05 50)",
      primary: "oklch(0.65 0.25 30)",
      primaryForeground: "oklch(0.95 0.02 50)",
      secondary: "oklch(0.28 0.06 30)",
      secondaryForeground: "oklch(0.85 0.05 50)",
      muted: "oklch(0.25 0.055 30)",
      mutedForeground: "oklch(0.65 0.04 50)",
      accent: "oklch(0.7 0.28 15)",
      accentForeground: "oklch(0.15 0.05 30)",
      border: "oklch(0.45 0.15 25)",
      input: "oklch(0.28 0.06 30)",
      ring: "oklch(0.65 0.25 30)",
      chart1: "oklch(0.65 0.25 30)",
      chart2: "oklch(0.7 0.28 15)",
      chart3: "oklch(0.6 0.22 45)",
      chart4: "oklch(0.55 0.2 5)",
      chart5: "oklch(0.75 0.15 60)",
    },
    preview: { bg: "#1a0a00", primary: "#ff4500", accent: "#ff6347" },
  },
  {
    name: "Neon",
    style: "brutalist",
    radius: "0rem",
    colors: {
      background: "oklch(0.08 0.02 280)",
      foreground: "oklch(0.95 0.05 100)",
      card: "oklch(0.1 0.025 280)",
      cardForeground: "oklch(0.95 0.05 100)",
      popover: "oklch(0.1 0.025 280)",
      popoverForeground: "oklch(0.95 0.05 100)",
      primary: "oklch(0.75 0.35 150)",
      primaryForeground: "oklch(0.05 0.02 280)",
      secondary: "oklch(0.15 0.03 280)",
      secondaryForeground: "oklch(0.9 0.05 100)",
      muted: "oklch(0.12 0.025 280)",
      mutedForeground: "oklch(0.7 0.04 100)",
      accent: "oklch(0.7 0.32 320)",
      accentForeground: "oklch(0.05 0.02 280)",
      border: "oklch(0.6 0.3 150)",
      input: "oklch(0.15 0.03 280)",
      ring: "oklch(0.75 0.35 150)",
      chart1: "oklch(0.75 0.35 150)",
      chart2: "oklch(0.7 0.32 320)",
      chart3: "oklch(0.8 0.3 60)",
      chart4: "oklch(0.65 0.35 200)",
      chart5: "oklch(0.75 0.28 280)",
    },
    preview: { bg: "#0a0a14", primary: "#00ff00", accent: "#ff00ff" },
  },
  {
    name: "Earth",
    style: "rounded",
    radius: "0.75rem",
    colors: {
      background: "oklch(0.94 0.03 70)",
      foreground: "oklch(0.3 0.08 50)",
      card: "oklch(0.96 0.025 70)",
      cardForeground: "oklch(0.3 0.08 50)",
      popover: "oklch(0.96 0.025 70)",
      popoverForeground: "oklch(0.3 0.08 50)",
      primary: "oklch(0.5 0.12 65)",
      primaryForeground: "oklch(0.96 0.02 70)",
      secondary: "oklch(0.88 0.04 70)",
      secondaryForeground: "oklch(0.35 0.08 50)",
      muted: "oklch(0.9 0.035 70)",
      mutedForeground: "oklch(0.5 0.06 50)",
      accent: "oklch(0.65 0.1 85)",
      accentForeground: "oklch(0.3 0.08 50)",
      border: "oklch(0.8 0.05 65)",
      input: "oklch(0.85 0.045 65)",
      ring: "oklch(0.5 0.12 65)",
      chart1: "oklch(0.5 0.12 65)",
      chart2: "oklch(0.55 0.1 45)",
      chart3: "oklch(0.6 0.08 90)",
      chart4: "oklch(0.45 0.14 55)",
      chart5: "oklch(0.7 0.08 75)",
    },
    preview: { bg: "#e8dcc4", primary: "#8b7355", accent: "#d2b48c" },
  },
  {
    name: "Grape",
    style: "rounded",
    radius: "0.75rem",
    colors: {
      background: "oklch(0.96 0.02 300)",
      foreground: "oklch(0.3 0.1 300)",
      card: "oklch(0.98 0.015 300)",
      cardForeground: "oklch(0.3 0.1 300)",
      popover: "oklch(0.98 0.015 300)",
      popoverForeground: "oklch(0.3 0.1 300)",
      primary: "oklch(0.5 0.2 295)",
      primaryForeground: "oklch(0.98 0.01 300)",
      secondary: "oklch(0.92 0.035 300)",
      secondaryForeground: "oklch(0.35 0.1 300)",
      muted: "oklch(0.94 0.025 300)",
      mutedForeground: "oklch(0.5 0.08 300)",
      accent: "oklch(0.65 0.15 280)",
      accentForeground: "oklch(0.98 0.01 300)",
      border: "oklch(0.86 0.05 300)",
      input: "oklch(0.9 0.04 300)",
      ring: "oklch(0.5 0.2 295)",
      chart1: "oklch(0.5 0.2 295)",
      chart2: "oklch(0.55 0.18 310)",
      chart3: "oklch(0.6 0.15 320)",
      chart4: "oklch(0.45 0.22 285)",
      chart5: "oklch(0.7 0.12 275)",
    },
    preview: { bg: "#f3e5f5", primary: "#6a1b9a", accent: "#9c27b0" },
  },
  {
    name: "Matrix",
    style: "brutalist",
    radius: "0rem",
    colors: {
      background: "oklch(0.05 0.01 150)",
      foreground: "oklch(0.8 0.2 145)",
      card: "oklch(0.08 0.015 150)",
      cardForeground: "oklch(0.8 0.2 145)",
      popover: "oklch(0.08 0.015 150)",
      popoverForeground: "oklch(0.8 0.2 145)",
      primary: "oklch(0.7 0.25 145)",
      primaryForeground: "oklch(0.03 0.01 150)",
      secondary: "oklch(0.12 0.02 150)",
      secondaryForeground: "oklch(0.75 0.2 145)",
      muted: "oklch(0.1 0.015 150)",
      mutedForeground: "oklch(0.6 0.15 145)",
      accent: "oklch(0.75 0.22 160)",
      accentForeground: "oklch(0.03 0.01 150)",
      border: "oklch(0.5 0.2 145)",
      input: "oklch(0.12 0.02 150)",
      ring: "oklch(0.7 0.25 145)",
      chart1: "oklch(0.7 0.25 145)",
      chart2: "oklch(0.75 0.22 160)",
      chart3: "oklch(0.65 0.28 140)",
      chart4: "oklch(0.6 0.2 155)",
      chart5: "oklch(0.8 0.18 165)",
    },
    preview: { bg: "#000a00", primary: "#00ff41", accent: "#008f11" },
  },
  {
    name: "Peachy",
    style: "soft",
    radius: "0.5rem",
    colors: {
      background: "oklch(0.98 0.02 55)",
      foreground: "oklch(0.35 0.08 40)",
      card: "oklch(0.99 0.015 55)",
      cardForeground: "oklch(0.35 0.08 40)",
      popover: "oklch(0.99 0.015 55)",
      popoverForeground: "oklch(0.35 0.08 40)",
      primary: "oklch(0.7 0.15 45)",
      primaryForeground: "oklch(0.98 0.01 55)",
      secondary: "oklch(0.94 0.03 55)",
      secondaryForeground: "oklch(0.4 0.08 40)",
      muted: "oklch(0.95 0.025 55)",
      mutedForeground: "oklch(0.55 0.06 40)",
      accent: "oklch(0.8 0.12 35)",
      accentForeground: "oklch(0.35 0.08 40)",
      border: "oklch(0.9 0.04 50)",
      input: "oklch(0.92 0.035 50)",
      ring: "oklch(0.7 0.15 45)",
      chart1: "oklch(0.7 0.15 45)",
      chart2: "oklch(0.75 0.12 60)",
      chart3: "oklch(0.8 0.1 35)",
      chart4: "oklch(0.65 0.18 50)",
      chart5: "oklch(0.85 0.08 25)",
    },
    preview: { bg: "#fff5f0", primary: "#ff9a76", accent: "#ffd4c8" },
  },
  {
    name: "Midnight Blue",
    style: "soft",
    radius: "0.5rem",
    colors: {
      background: "oklch(0.2 0.04 250)",
      foreground: "oklch(0.9 0.03 240)",
      card: "oklch(0.24 0.045 250)",
      cardForeground: "oklch(0.9 0.03 240)",
      popover: "oklch(0.24 0.045 250)",
      popoverForeground: "oklch(0.9 0.03 240)",
      primary: "oklch(0.6 0.15 240)",
      primaryForeground: "oklch(0.95 0.02 240)",
      secondary: "oklch(0.28 0.05 250)",
      secondaryForeground: "oklch(0.85 0.03 240)",
      muted: "oklch(0.3 0.045 250)",
      mutedForeground: "oklch(0.7 0.03 240)",
      accent: "oklch(0.65 0.2 220)",
      accentForeground: "oklch(0.95 0.02 240)",
      border: "oklch(0.35 0.05 250)",
      input: "oklch(0.3 0.045 250)",
      ring: "oklch(0.6 0.15 240)",
      chart1: "oklch(0.6 0.15 240)",
      chart2: "oklch(0.65 0.2 220)",
      chart3: "oklch(0.55 0.18 260)",
      chart4: "oklch(0.7 0.12 200)",
      chart5: "oklch(0.5 0.22 235)",
    },
    preview: { bg: "#1a1a3e", primary: "#4169e1", accent: "#6495ed" },
  },
  {
    name: "Crimson",
    style: "brutalist",
    radius: "0rem",
    colors: {
      background: "oklch(0.15 0.04 15)",
      foreground: "oklch(0.92 0.03 15)",
      card: "oklch(0.18 0.045 15)",
      cardForeground: "oklch(0.92 0.03 15)",
      popover: "oklch(0.18 0.045 15)",
      popoverForeground: "oklch(0.92 0.03 15)",
      primary: "oklch(0.55 0.25 15)",
      primaryForeground: "oklch(0.95 0.02 15)",
      secondary: "oklch(0.22 0.05 15)",
      secondaryForeground: "oklch(0.88 0.03 15)",
      muted: "oklch(0.25 0.045 15)",
      mutedForeground: "oklch(0.65 0.03 15)",
      accent: "oklch(0.6 0.28 5)",
      accentForeground: "oklch(0.95 0.02 15)",
      border: "oklch(0.4 0.15 15)",
      input: "oklch(0.22 0.05 15)",
      ring: "oklch(0.55 0.25 15)",
      chart1: "oklch(0.55 0.25 15)",
      chart2: "oklch(0.6 0.28 5)",
      chart3: "oklch(0.65 0.22 25)",
      chart4: "oklch(0.5 0.3 10)",
      chart5: "oklch(0.7 0.18 355)",
    },
    preview: { bg: "#1a0000", primary: "#dc143c", accent: "#ff6b6b" },
  },
  {
    name: "Aquamarine",
    style: "rounded",
    radius: "0.75rem",
    colors: {
      background: "oklch(0.97 0.02 190)",
      foreground: "oklch(0.3 0.08 190)",
      card: "oklch(0.98 0.015 190)",
      cardForeground: "oklch(0.3 0.08 190)",
      popover: "oklch(0.98 0.015 190)",
      popoverForeground: "oklch(0.3 0.08 190)",
      primary: "oklch(0.65 0.12 185)",
      primaryForeground: "oklch(0.98 0.01 190)",
      secondary: "oklch(0.93 0.03 190)",
      secondaryForeground: "oklch(0.35 0.08 190)",
      muted: "oklch(0.94 0.025 190)",
      mutedForeground: "oklch(0.5 0.06 190)",
      accent: "oklch(0.75 0.1 175)",
      accentForeground: "oklch(0.3 0.08 190)",
      border: "oklch(0.88 0.04 190)",
      input: "oklch(0.9 0.035 190)",
      ring: "oklch(0.65 0.12 185)",
      chart1: "oklch(0.65 0.12 185)",
      chart2: "oklch(0.7 0.1 170)",
      chart3: "oklch(0.6 0.14 195)",
      chart4: "oklch(0.55 0.15 180)",
      chart5: "oklch(0.75 0.08 200)",
    },
    preview: { bg: "#e0f7fa", primary: "#00bcd4", accent: "#7fdeea" },
  },
  {
    name: "Honey",
    style: "soft",
    radius: "0.5rem",
    colors: {
      background: "oklch(0.96 0.03 75)",
      foreground: "oklch(0.3 0.08 65)",
      card: "oklch(0.98 0.025 75)",
      cardForeground: "oklch(0.3 0.08 65)",
      popover: "oklch(0.98 0.025 75)",
      popoverForeground: "oklch(0.3 0.08 65)",
      primary: "oklch(0.65 0.15 70)",
      primaryForeground: "oklch(0.98 0.02 75)",
      secondary: "oklch(0.92 0.04 75)",
      secondaryForeground: "oklch(0.35 0.08 65)",
      muted: "oklch(0.93 0.035 75)",
      mutedForeground: "oklch(0.5 0.06 65)",
      accent: "oklch(0.75 0.12 80)",
      accentForeground: "oklch(0.3 0.08 65)",
      border: "oklch(0.86 0.05 70)",
      input: "oklch(0.9 0.045 70)",
      ring: "oklch(0.65 0.15 70)",
      chart1: "oklch(0.65 0.15 70)",
      chart2: "oklch(0.7 0.13 85)",
      chart3: "oklch(0.6 0.17 60)",
      chart4: "oklch(0.55 0.14 75)",
      chart5: "oklch(0.8 0.1 90)",
    },
    preview: { bg: "#fff8dc", primary: "#daa520", accent: "#f0e68c" },
  },
  {
    name: "Emerald",
    style: "rounded",
    radius: "0.75rem",
    colors: {
      background: "oklch(0.96 0.02 155)",
      foreground: "oklch(0.25 0.08 160)",
      card: "oklch(0.98 0.015 155)",
      cardForeground: "oklch(0.25 0.08 160)",
      popover: "oklch(0.98 0.015 155)",
      popoverForeground: "oklch(0.25 0.08 160)",
      primary: "oklch(0.55 0.15 160)",
      primaryForeground: "oklch(0.98 0.01 155)",
      secondary: "oklch(0.92 0.03 155)",
      secondaryForeground: "oklch(0.3 0.08 160)",
      muted: "oklch(0.93 0.025 155)",
      mutedForeground: "oklch(0.5 0.06 160)",
      accent: "oklch(0.7 0.12 145)",
      accentForeground: "oklch(0.25 0.08 160)",
      border: "oklch(0.86 0.04 155)",
      input: "oklch(0.9 0.035 155)",
      ring: "oklch(0.55 0.15 160)",
      chart1: "oklch(0.55 0.15 160)",
      chart2: "oklch(0.6 0.12 145)",
      chart3: "oklch(0.65 0.1 175)",
      chart4: "oklch(0.5 0.18 155)",
      chart5: "oklch(0.7 0.08 165)",
    },
    preview: { bg: "#d5f4e6", primary: "#10b981", accent: "#6ee7b7" },
  },
  {
    name: "Steel",
    style: "brutalist",
    radius: "0rem",
    colors: {
      background: "oklch(0.88 0.01 260)",
      foreground: "oklch(0.25 0.03 260)",
      card: "oklch(0.92 0.008 260)",
      cardForeground: "oklch(0.25 0.03 260)",
      popover: "oklch(0.92 0.008 260)",
      popoverForeground: "oklch(0.25 0.03 260)",
      primary: "oklch(0.45 0.06 260)",
      primaryForeground: "oklch(0.95 0.005 260)",
      secondary: "oklch(0.8 0.015 260)",
      secondaryForeground: "oklch(0.3 0.03 260)",
      muted: "oklch(0.85 0.012 260)",
      mutedForeground: "oklch(0.45 0.02 260)",
      accent: "oklch(0.55 0.08 240)",
      accentForeground: "oklch(0.95 0.005 260)",
      border: "oklch(0.6 0.04 260)",
      input: "oklch(0.8 0.015 260)",
      ring: "oklch(0.45 0.06 260)",
      chart1: "oklch(0.45 0.06 260)",
      chart2: "oklch(0.55 0.08 240)",
      chart3: "oklch(0.5 0.05 280)",
      chart4: "oklch(0.4 0.07 250)",
      chart5: "oklch(0.6 0.06 230)",
    },
    preview: { bg: "#b0c4de", primary: "#4682b4", accent: "#778899" },
  },
  {
    name: "Concrete",
    style: "brutalist",
    radius: "0rem",
    colors: {
      background: "oklch(0.9 0.005 200)",
      foreground: "oklch(0.2 0.01 200)",
      card: "oklch(0.93 0.003 200)",
      cardForeground: "oklch(0.2 0.01 200)",
      popover: "oklch(0.93 0.003 200)",
      popoverForeground: "oklch(0.2 0.01 200)",
      primary: "oklch(0.35 0.02 200)",
      primaryForeground: "oklch(0.95 0.003 200)",
      secondary: "oklch(0.85 0.008 200)",
      secondaryForeground: "oklch(0.25 0.01 200)",
      muted: "oklch(0.87 0.005 200)",
      mutedForeground: "oklch(0.4 0.01 200)",
      accent: "oklch(0.5 0.03 210)",
      accentForeground: "oklch(0.95 0.003 200)",
      border: "oklch(0.65 0.015 200)",
      input: "oklch(0.85 0.008 200)",
      ring: "oklch(0.35 0.02 200)",
      chart1: "oklch(0.35 0.02 200)",
      chart2: "oklch(0.5 0.03 210)",
      chart3: "oklch(0.45 0.025 190)",
      chart4: "oklch(0.4 0.02 220)",
      chart5: "oklch(0.55 0.02 200)",
    },
    preview: { bg: "#d3d3d3", primary: "#4a4a4a", accent: "#808080" },
  },
  {
    name: "Tangerine",
    style: "rounded",
    radius: "0.75rem",
    colors: {
      background: "oklch(0.98 0.02 60)",
      foreground: "oklch(0.3 0.1 50)",
      card: "oklch(0.99 0.015 60)",
      cardForeground: "oklch(0.3 0.1 50)",
      popover: "oklch(0.99 0.015 60)",
      popoverForeground: "oklch(0.3 0.1 50)",
      primary: "oklch(0.65 0.2 55)",
      primaryForeground: "oklch(0.98 0.01 60)",
      secondary: "oklch(0.94 0.03 60)",
      secondaryForeground: "oklch(0.35 0.1 50)",
      muted: "oklch(0.95 0.025 60)",
      mutedForeground: "oklch(0.5 0.08 50)",
      accent: "oklch(0.75 0.15 70)",
      accentForeground: "oklch(0.3 0.1 50)",
      border: "oklch(0.9 0.04 55)",
      input: "oklch(0.92 0.035 55)",
      ring: "oklch(0.65 0.2 55)",
      chart1: "oklch(0.65 0.2 55)",
      chart2: "oklch(0.7 0.18 40)",
      chart3: "oklch(0.75 0.15 70)",
      chart4: "oklch(0.6 0.22 50)",
      chart5: "oklch(0.8 0.12 65)",
    },
    preview: { bg: "#fff5e6", primary: "#ff8c00", accent: "#ffa54f" },
  },
  {
    name: "Twilight",
    style: "soft",
    radius: "0.5rem",
    colors: {
      background: "oklch(0.22 0.05 270)",
      foreground: "oklch(0.88 0.04 280)",
      card: "oklch(0.26 0.055 270)",
      cardForeground: "oklch(0.88 0.04 280)",
      popover: "oklch(0.26 0.055 270)",
      popoverForeground: "oklch(0.88 0.04 280)",
      primary: "oklch(0.6 0.18 280)",
      primaryForeground: "oklch(0.95 0.02 280)",
      secondary: "oklch(0.3 0.06 270)",
      secondaryForeground: "oklch(0.85 0.04 280)",
      muted: "oklch(0.32 0.055 270)",
      mutedForeground: "oklch(0.7 0.04 280)",
      accent: "oklch(0.7 0.2 300)",
      accentForeground: "oklch(0.95 0.02 280)",
      border: "oklch(0.38 0.06 270)",
      input: "oklch(0.32 0.055 270)",
      ring: "oklch(0.6 0.18 280)",
      chart1: "oklch(0.6 0.18 280)",
      chart2: "oklch(0.7 0.2 300)",
      chart3: "oklch(0.65 0.15 260)",
      chart4: "oklch(0.55 0.22 290)",
      chart5: "oklch(0.75 0.12 310)",
    },
    preview: { bg: "#1a1a3e", primary: "#a855f7", accent: "#8b5cf6" },
  },
  {
    name: "Coral Reef",
    style: "soft",
    radius: "0.5rem",
    colors: {
      background: "oklch(0.98 0.02 25)",
      foreground: "oklch(0.3 0.09 20)",
      card: "oklch(0.99 0.015 25)",
      cardForeground: "oklch(0.3 0.09 20)",
      popover: "oklch(0.99 0.015 25)",
      popoverForeground: "oklch(0.3 0.09 20)",
      primary: "oklch(0.65 0.18 20)",
      primaryForeground: "oklch(0.98 0.01 25)",
      secondary: "oklch(0.94 0.03 25)",
      secondaryForeground: "oklch(0.35 0.09 20)",
      muted: "oklch(0.95 0.025 25)",
      mutedForeground: "oklch(0.5 0.07 20)",
      accent: "oklch(0.75 0.14 35)",
      accentForeground: "oklch(0.3 0.09 20)",
      border: "oklch(0.9 0.04 22)",
      input: "oklch(0.92 0.035 22)",
      ring: "oklch(0.65 0.18 20)",
      chart1: "oklch(0.65 0.18 20)",
      chart2: "oklch(0.7 0.15 10)",
      chart3: "oklch(0.75 0.14 35)",
      chart4: "oklch(0.6 0.2 15)",
      chart5: "oklch(0.8 0.1 40)",
    },
    preview: { bg: "#fff0f0", primary: "#ff6b6b", accent: "#ffa07a" },
  },
  {
    name: "Moss Garden",
    style: "rounded",
    radius: "0.75rem",
    colors: {
      background: "oklch(0.93 0.03 125)",
      foreground: "oklch(0.25 0.08 130)",
      card: "oklch(0.95 0.025 125)",
      cardForeground: "oklch(0.25 0.08 130)",
      popover: "oklch(0.95 0.025 125)",
      popoverForeground: "oklch(0.25 0.08 130)",
      primary: "oklch(0.45 0.12 130)",
      primaryForeground: "oklch(0.96 0.02 125)",
      secondary: "oklch(0.88 0.04 125)",
      secondaryForeground: "oklch(0.3 0.08 130)",
      muted: "oklch(0.9 0.035 125)",
      mutedForeground: "oklch(0.5 0.06 130)",
      accent: "oklch(0.6 0.1 110)",
      accentForeground: "oklch(0.96 0.02 125)",
      border: "oklch(0.82 0.05 125)",
      input: "oklch(0.86 0.045 125)",
      ring: "oklch(0.45 0.12 130)",
      chart1: "oklch(0.45 0.12 130)",
      chart2: "oklch(0.5 0.1 140)",
      chart3: "oklch(0.55 0.08 115)",
      chart4: "oklch(0.4 0.14 135)",
      chart5: "oklch(0.65 0.08 120)",
    },
    preview: { bg: "#dce8d0", primary: "#5a7d4e", accent: "#8ba888" },
  },
  {
    name: "Rust",
    style: "brutalist",
    radius: "0rem",
    colors: {
      background: "oklch(0.88 0.04 40)",
      foreground: "oklch(0.25 0.08 35)",
      card: "oklch(0.92 0.03 40)",
      cardForeground: "oklch(0.25 0.08 35)",
      popover: "oklch(0.92 0.03 40)",
      popoverForeground: "oklch(0.25 0.08 35)",
      primary: "oklch(0.5 0.15 35)",
      primaryForeground: "oklch(0.95 0.02 40)",
      secondary: "oklch(0.82 0.05 40)",
      secondaryForeground: "oklch(0.3 0.08 35)",
      muted: "oklch(0.85 0.045 40)",
      mutedForeground: "oklch(0.45 0.06 35)",
      accent: "oklch(0.6 0.18 45)",
      accentForeground: "oklch(0.95 0.02 40)",
      border: "oklch(0.65 0.1 38)",
      input: "oklch(0.82 0.05 40)",
      ring: "oklch(0.5 0.15 35)",
      chart1: "oklch(0.5 0.15 35)",
      chart2: "oklch(0.55 0.12 25)",
      chart3: "oklch(0.6 0.18 45)",
      chart4: "oklch(0.45 0.18 30)",
      chart5: "oklch(0.65 0.1 50)",
    },
    preview: { bg: "#d4b5a0", primary: "#8b4513", accent: "#cd853f" },
  },
  {
    name: "Sapphire",
    style: "rounded",
    radius: "0.75rem",
    colors: {
      background: "oklch(0.96 0.02 255)",
      foreground: "oklch(0.25 0.08 260)",
      card: "oklch(0.98 0.015 255)",
      cardForeground: "oklch(0.25 0.08 260)",
      popover: "oklch(0.98 0.015 255)",
      popoverForeground: "oklch(0.25 0.08 260)",
      primary: "oklch(0.5 0.18 260)",
      primaryForeground: "oklch(0.98 0.01 255)",
      secondary: "oklch(0.92 0.03 255)",
      secondaryForeground: "oklch(0.3 0.08 260)",
      muted: "oklch(0.93 0.025 255)",
      mutedForeground: "oklch(0.5 0.06 260)",
      accent: "oklch(0.65 0.14 245)",
      accentForeground: "oklch(0.98 0.01 255)",
      border: "oklch(0.86 0.04 255)",
      input: "oklch(0.9 0.035 255)",
      ring: "oklch(0.5 0.18 260)",
      chart1: "oklch(0.5 0.18 260)",
      chart2: "oklch(0.55 0.15 275)",
      chart3: "oklch(0.6 0.12 240)",
      chart4: "oklch(0.45 0.2 265)",
      chart5: "oklch(0.7 0.1 250)",
    },
    preview: { bg: "#e3f2fd", primary: "#1565c0", accent: "#42a5f5" },
  },
  {
    name: "Burgundy",
    style: "soft",
    radius: "0.5rem",
    colors: {
      background: "oklch(0.93 0.03 355)",
      foreground: "oklch(0.25 0.08 350)",
      card: "oklch(0.96 0.025 355)",
      cardForeground: "oklch(0.25 0.08 350)",
      popover: "oklch(0.96 0.025 355)",
      popoverForeground: "oklch(0.25 0.08 350)",
      primary: "oklch(0.4 0.15 350)",
      primaryForeground: "oklch(0.96 0.02 355)",
      secondary: "oklch(0.88 0.04 355)",
      secondaryForeground: "oklch(0.3 0.08 350)",
      muted: "oklch(0.9 0.035 355)",
      mutedForeground: "oklch(0.5 0.06 350)",
      accent: "oklch(0.55 0.18 340)",
      accentForeground: "oklch(0.96 0.02 355)",
      border: "oklch(0.8 0.05 352)",
      input: "oklch(0.85 0.045 352)",
      ring: "oklch(0.4 0.15 350)",
      chart1: "oklch(0.4 0.15 350)",
      chart2: "oklch(0.45 0.12 335)",
      chart3: "oklch(0.5 0.1 5)",
      chart4: "oklch(0.35 0.18 345)",
      chart5: "oklch(0.6 0.08 355)",
    },
    preview: { bg: "#e8d5d8", primary: "#800020", accent: "#a0293f" },
  },
  {
    name: "Olive",
    style: "brutalist",
    radius: "0rem",
    colors: {
      background: "oklch(0.91 0.03 95)",
      foreground: "oklch(0.25 0.08 90)",
      card: "oklch(0.94 0.025 95)",
      cardForeground: "oklch(0.25 0.08 90)",
      popover: "oklch(0.94 0.025 95)",
      popoverForeground: "oklch(0.25 0.08 90)",
      primary: "oklch(0.45 0.1 90)",
      primaryForeground: "oklch(0.95 0.02 95)",
      secondary: "oklch(0.85 0.04 95)",
      secondaryForeground: "oklch(0.3 0.08 90)",
      muted: "oklch(0.88 0.035 95)",
      mutedForeground: "oklch(0.5 0.06 90)",
      accent: "oklch(0.6 0.12 105)",
      accentForeground: "oklch(0.95 0.02 95)",
      border: "oklch(0.7 0.06 92)",
      input: "oklch(0.85 0.04 95)",
      ring: "oklch(0.45 0.1 90)",
      chart1: "oklch(0.45 0.1 90)",
      chart2: "oklch(0.5 0.08 80)",
      chart3: "oklch(0.55 0.06 100)",
      chart4: "oklch(0.4 0.12 85)",
      chart5: "oklch(0.65 0.08 110)",
    },
    preview: { bg: "#d8ddc4", primary: "#6b7839", accent: "#9ca857" },
  },
  {
    name: "Ice Cream",
    style: "soft",
    radius: "0.5rem",
    colors: {
      background: "oklch(0.98 0.015 330)",
      foreground: "oklch(0.35 0.08 325)",
      card: "oklch(0.99 0.01 330)",
      cardForeground: "oklch(0.35 0.08 325)",
      popover: "oklch(0.99 0.01 330)",
      popoverForeground: "oklch(0.35 0.08 325)",
      primary: "oklch(0.7 0.16 325)",
      primaryForeground: "oklch(0.98 0.01 330)",
      secondary: "oklch(0.94 0.025 330)",
      secondaryForeground: "oklch(0.4 0.08 325)",
      muted: "oklch(0.96 0.02 330)",
      mutedForeground: "oklch(0.55 0.06 325)",
      accent: "oklch(0.8 0.12 310)",
      accentForeground: "oklch(0.35 0.08 325)",
      border: "oklch(0.92 0.03 328)",
      input: "oklch(0.94 0.025 328)",
      ring: "oklch(0.7 0.16 325)",
      chart1: "oklch(0.7 0.16 325)",
      chart2: "oklch(0.75 0.13 340)",
      chart3: "oklch(0.8 0.12 310)",
      chart4: "oklch(0.65 0.18 320)",
      chart5: "oklch(0.85 0.09 335)",
    },
    preview: { bg: "#fff0f5", primary: "#ff69b4", accent: "#dda0dd" },
  },
  {
    name: "Denim",
    style: "rounded",
    radius: "0.75rem",
    colors: {
      background: "oklch(0.94 0.02 235)",
      foreground: "oklch(0.28 0.08 240)",
      card: "oklch(0.97 0.015 235)",
      cardForeground: "oklch(0.28 0.08 240)",
      popover: "oklch(0.97 0.015 235)",
      popoverForeground: "oklch(0.28 0.08 240)",
      primary: "oklch(0.5 0.14 240)",
      primaryForeground: "oklch(0.97 0.01 235)",
      secondary: "oklch(0.88 0.03 235)",
      secondaryForeground: "oklch(0.32 0.08 240)",
      muted: "oklch(0.9 0.025 235)",
      mutedForeground: "oklch(0.48 0.06 240)",
      accent: "oklch(0.65 0.12 225)",
      accentForeground: "oklch(0.97 0.01 235)",
      border: "oklch(0.8 0.04 237)",
      input: "oklch(0.85 0.035 237)",
      ring: "oklch(0.5 0.14 240)",
      chart1: "oklch(0.5 0.14 240)",
      chart2: "oklch(0.55 0.11 250)",
      chart3: "oklch(0.6 0.09 220)",
      chart4: "oklch(0.45 0.16 245)",
      chart5: "oklch(0.7 0.08 230)",
    },
    preview: { bg: "#e0e8f0", primary: "#4682b4", accent: "#6fa8dc" },
  },
  {
    name: "Charcoal",
    style: "brutalist",
    radius: "0rem",
    colors: {
      background: "oklch(0.2 0.01 270)",
      foreground: "oklch(0.88 0.02 270)",
      card: "oklch(0.24 0.015 270)",
      cardForeground: "oklch(0.88 0.02 270)",
      popover: "oklch(0.24 0.015 270)",
      popoverForeground: "oklch(0.88 0.02 270)",
      primary: "oklch(0.6 0.08 270)",
      primaryForeground: "oklch(0.95 0.01 270)",
      secondary: "oklch(0.28 0.02 270)",
      secondaryForeground: "oklch(0.85 0.02 270)",
      muted: "oklch(0.3 0.015 270)",
      mutedForeground: "oklch(0.65 0.02 270)",
      accent: "oklch(0.7 0.1 260)",
      accentForeground: "oklch(0.95 0.01 270)",
      border: "oklch(0.45 0.04 270)",
      input: "oklch(0.28 0.02 270)",
      ring: "oklch(0.6 0.08 270)",
      chart1: "oklch(0.6 0.08 270)",
      chart2: "oklch(0.65 0.06 280)",
      chart3: "oklch(0.55 0.1 250)",
      chart4: "oklch(0.5 0.09 265)",
      chart5: "oklch(0.75 0.05 275)",
    },
    preview: { bg: "#2a2a2a", primary: "#6b7280", accent: "#9ca3af" },
  },
  {
    name: "Mint Chocolate",
    style: "rounded",
    radius: "0.75rem",
    colors: {
      background: "oklch(0.94 0.02 165)",
      foreground: "oklch(0.25 0.05 50)",
      card: "oklch(0.97 0.015 165)",
      cardForeground: "oklch(0.25 0.05 50)",
      popover: "oklch(0.97 0.015 165)",
      popoverForeground: "oklch(0.25 0.05 50)",
      primary: "oklch(0.55 0.12 170)",
      primaryForeground: "oklch(0.97 0.01 165)",
      secondary: "oklch(0.4 0.08 50)",
      secondaryForeground: "oklch(0.95 0.01 165)",
      muted: "oklch(0.9 0.025 165)",
      mutedForeground: "oklch(0.5 0.04 50)",
      accent: "oklch(0.7 0.1 155)",
      accentForeground: "oklch(0.25 0.05 50)",
      border: "oklch(0.82 0.04 165)",
      input: "oklch(0.88 0.035 165)",
      ring: "oklch(0.55 0.12 170)",
      chart1: "oklch(0.55 0.12 170)",
      chart2: "oklch(0.4 0.08 50)",
      chart3: "oklch(0.6 0.1 185)",
      chart4: "oklch(0.35 0.1 45)",
      chart5: "oklch(0.7 0.08 150)",
    },
    preview: { bg: "#d5f5e3", primary: "#00a86b", accent: "#3e2723" },
  },
  {
    name: "Sunset Glow",
    style: "rounded",
    radius: "0.75rem",
    colors: {
      background: "oklch(0.96 0.03 55)",
      foreground: "oklch(0.3 0.1 45)",
      card: "oklch(0.98 0.025 55)",
      cardForeground: "oklch(0.3 0.1 45)",
      popover: "oklch(0.98 0.025 55)",
      popoverForeground: "oklch(0.3 0.1 45)",
      primary: "oklch(0.6 0.22 50)",
      primaryForeground: "oklch(0.98 0.01 55)",
      secondary: "oklch(0.92 0.04 55)",
      secondaryForeground: "oklch(0.35 0.1 45)",
      muted: "oklch(0.94 0.035 55)",
      mutedForeground: "oklch(0.5 0.08 45)",
      accent: "oklch(0.7 0.18 35)",
      accentForeground: "oklch(0.98 0.01 55)",
      border: "oklch(0.88 0.05 52)",
      input: "oklch(0.9 0.045 52)",
      ring: "oklch(0.6 0.22 50)",
      chart1: "oklch(0.6 0.22 50)",
      chart2: "oklch(0.65 0.2 65)",
      chart3: "oklch(0.7 0.18 35)",
      chart4: "oklch(0.55 0.24 45)",
      chart5: "oklch(0.75 0.15 70)",
    },
    preview: { bg: "#fff4e6", primary: "#ff8c42", accent: "#ff6347" },
  },
  {
    name: "Lavender Fields",
    style: "soft",
    radius: "0.5rem",
    colors: {
      background: "oklch(0.96 0.025 295)",
      foreground: "oklch(0.3 0.09 295)",
      card: "oklch(0.98 0.02 295)",
      cardForeground: "oklch(0.3 0.09 295)",
      popover: "oklch(0.98 0.02 295)",
      popoverForeground: "oklch(0.3 0.09 295)",
      primary: "oklch(0.6 0.16 295)",
      primaryForeground: "oklch(0.98 0.01 295)",
      secondary: "oklch(0.92 0.035 295)",
      secondaryForeground: "oklch(0.35 0.09 295)",
      muted: "oklch(0.94 0.03 295)",
      mutedForeground: "oklch(0.5 0.07 295)",
      accent: "oklch(0.7 0.14 310)",
      accentForeground: "oklch(0.98 0.01 295)",
      border: "oklch(0.88 0.045 295)",
      input: "oklch(0.9 0.04 295)",
      ring: "oklch(0.6 0.16 295)",
      chart1: "oklch(0.6 0.16 295)",
      chart2: "oklch(0.65 0.13 280)",
      chart3: "oklch(0.7 0.14 310)",
      chart4: "oklch(0.55 0.18 290)",
      chart5: "oklch(0.75 0.11 305)",
    },
    preview: { bg: "#f0e6fa", primary: "#9b59b6", accent: "#ba68c8" },
  },
]

const getStyleInfo = (style: ThemeStyle) => {
  switch (style) {
    case "brutalist":
      return { label: "Sharp", icon: "◼" }
    case "soft":
      return { label: "Soft", icon: "◐" }
    case "rounded":
      return { label: "Round", icon: "◉" }
  }
}

const colorKeys = [
  "background",
  "foreground",
  "card",
  "cardForeground",
  "popover",
  "popoverForeground",
  "primary",
  "primaryForeground",
  "secondary",
  "secondaryForeground",
  "muted",
  "mutedForeground",
  "accent",
  "accentForeground",
  "border",
  "input",
  "ring",
  "chart1",
  "chart2",
  "chart3",
  "chart4",
  "chart5",
] as const

type ColorKey = (typeof colorKeys)[number]

function parseOklch(value: string): { l: number; c: number; h: number } {
  const match = value.match(/oklch$$([\d.]+)\s+([\d.]+)\s+([\d.]+)$$/)
  if (match) {
    return { l: Number.parseFloat(match[1]), c: Number.parseFloat(match[2]), h: Number.parseFloat(match[3]) }
  }
  return { l: 0.5, c: 0.1, h: 0 }
}

function toOklch(l: number, c: number, h: number): string {
  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`
}

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(true)
  const [activeTheme, setActiveTheme] = useState<string>("Default")
  const [isDark, setIsDark] = useState(false)
  const [customColors, setCustomColors] = useState<Record<ColorKey, string>>({} as Record<ColorKey, string>)
  const [editingColor, setEditingColor] = useState<ColorKey | null>(null)
  const [customRadius, setCustomRadius] = useState<string>("0rem")
  const [activeTab, setActiveTab] = useState<string>("presets")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme-name")
    const savedDark = localStorage.getItem("theme-dark") === "true"
    const savedCustom = localStorage.getItem("theme-custom")
    const savedRadius = localStorage.getItem("theme-radius")

    if (savedTheme) {
      setActiveTheme(savedTheme)
      const theme = themes.find((t) => t.name === savedTheme)
      if (theme) {
        setCustomColors(theme.colors)
        setCustomRadius(theme.radius)
      }
    } else {
      setCustomColors(themes[0].colors)
      setCustomRadius(themes[0].radius)
    }

    if (savedCustom) {
      setCustomColors(JSON.parse(savedCustom))
    }

    if (savedRadius) {
      setCustomRadius(savedRadius)
    }

    setIsDark(savedDark)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    Object.entries(customColors).forEach(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase()
      root.style.setProperty(`--${cssKey}`, value)
    })
    root.style.setProperty("--radius", customRadius)

    if (isDark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    localStorage.setItem("theme-name", activeTheme)
    localStorage.setItem("theme-dark", isDark.toString())
    localStorage.setItem("theme-custom", JSON.stringify(customColors))
    localStorage.setItem("theme-radius", customRadius)
  }, [customColors, isDark, activeTheme, customRadius])

  const applyTheme = (theme: Theme) => {
    setActiveTheme(theme.name)
    setCustomColors(theme.colors)
    setCustomRadius(theme.radius)
  }

  const resetToDefault = () => {
    const defaultTheme = themes[0]
    setActiveTheme(defaultTheme.name)
    setCustomColors(defaultTheme.colors)
    setCustomRadius(defaultTheme.radius)
    setIsDark(false)
    localStorage.removeItem("theme-custom")
    localStorage.removeItem("theme-radius")
  }

  const updateColor = (key: ColorKey, value: string) => {
    setCustomColors((prev) => ({ ...prev, [key]: value }))
    setActiveTheme("Custom")
  }

  const updateRadius = (value: string) => {
    setCustomRadius(value)
    setActiveTheme("Custom")
  }

  const currentTheme = themes.find((t) => t.name === activeTheme)

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed left-0 top-1/2 -translate-y-1/2 z-50 p-2 bg-card border-2 border-border shadow-lg transition-all",
          isOpen ? "translate-x-80" : "translate-x-0",
          customRadius === "0rem" ? "rounded-none" : customRadius === "9999px" ? "rounded-r-full" : "rounded-r-lg",
        )}
      >
        {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-80 bg-card border-r-2 border-border shadow-xl z-40 transition-transform duration-300 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="p-4 border-b-2 border-border shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              <h2 className="font-bold text-lg">Themes</h2>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)} className="h-8 w-8">
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={resetToDefault} className="h-8 w-8">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Current: {activeTheme}</span>
            {currentTheme && (
              <span className="px-2 py-0.5 bg-muted text-xs font-medium">
                {getStyleInfo(currentTheme.style).icon} {getStyleInfo(currentTheme.style).label}
              </span>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="mx-4 mt-4 grid grid-cols-2 shrink-0">
            <TabsTrigger value="presets">Presets</TabsTrigger>
            <TabsTrigger value="custom">
              <Sliders className="h-4 w-4 mr-1" />
              Custom
            </TabsTrigger>
          </TabsList>

          {/* Presets Tab */}
          <TabsContent value="presets" className="flex-1 overflow-hidden mt-0">
            <ScrollArea className="h-full">
              <div className="p-4 grid grid-cols-2 gap-2">
                {themes.map((theme) => {
                  const styleInfo = getStyleInfo(theme.style)
                  return (
                    <button
                      key={theme.name}
                      onClick={() => applyTheme(theme)}
                      className={cn(
                        "p-2 border-2 transition-all text-left",
                        activeTheme === theme.name
                          ? "border-primary ring-2 ring-ring"
                          : "border-border hover:border-primary/50",
                        theme.radius === "0rem"
                          ? "rounded-none"
                          : theme.radius === "9999px"
                            ? "rounded-2xl"
                            : theme.radius === "0.75rem"
                              ? "rounded-xl"
                              : "rounded-lg",
                      )}
                    >
                      {/* Color Preview */}
                      <div
                        className={cn(
                          "flex h-6 mb-2 overflow-hidden border border-border/50",
                          theme.radius === "0rem" ? "rounded-none" : "rounded",
                        )}
                      >
                        <div className="flex-1" style={{ backgroundColor: theme.preview.bg }} />
                        <div className="flex-1" style={{ backgroundColor: theme.preview.primary }} />
                        <div className="flex-1" style={{ backgroundColor: theme.preview.accent }} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium truncate">{theme.name}</span>
                        <span className="text-[10px] opacity-60" title={styleInfo.label}>
                          {styleInfo.icon}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Custom Tab */}
          <TabsContent value="custom" className="flex-1 overflow-hidden mt-0">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-4">
                <div className="space-y-3 pb-4 border-b border-border">
                  <Label className="text-sm font-semibold">Corner Style</Label>
                  {/* Removed pill option from custom corner style controls */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "0rem", label: "Sharp", icon: "◼" },
                      { value: "0.5rem", label: "Soft", icon: "◐" },
                      { value: "0.75rem", label: "Round", icon: "◉" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateRadius(option.value)}
                        className={cn(
                          "p-2 border-2 transition-all flex flex-col items-center gap-1",
                          customRadius === option.value
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50",
                          option.value === "0rem"
                            ? "rounded-none"
                            : option.value === "0.75rem"
                              ? "rounded-xl"
                              : "rounded-lg",
                        )}
                      >
                        <span className="text-lg">{option.icon}</span>
                        <span className="text-[10px] font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs">Custom:</Label>
                    <Input
                      value={customRadius}
                      onChange={(e) => updateRadius(e.target.value)}
                      className="h-7 text-xs font-mono"
                      placeholder="e.g., 0.5rem"
                    />
                  </div>
                </div>

                {/* Color Controls */}
                <Label className="text-sm font-semibold">Colors</Label>
                {colorKeys.map((key) => {
                  const value = customColors[key] || ""
                  const parsed = parseOklch(value)
                  const isEditing = editingColor === key

                  return (
                    <div key={key} className="space-y-2">
                      <button
                        onClick={() => setEditingColor(isEditing ? null : key)}
                        className={cn(
                          "w-full flex items-center gap-3 p-2 border transition-all",
                          isEditing ? "border-primary bg-muted" : "border-border hover:border-primary/50",
                          customRadius === "0rem" ? "rounded-none" : "rounded-lg",
                        )}
                      >
                        <div
                          className={cn(
                            "w-8 h-8 border border-border shrink-0",
                            customRadius === "0rem" ? "rounded-none" : "rounded",
                          )}
                          style={{ backgroundColor: value }}
                        />
                        <div className="flex-1 text-left">
                          <div className="text-xs font-medium">{key.replace(/([A-Z])/g, " $1").trim()}</div>
                          <div className="text-[10px] font-mono text-muted-foreground truncate">{value}</div>
                        </div>
                      </button>

                      {isEditing && (
                        <div
                          className={cn(
                            "p-3 bg-muted border border-border space-y-3",
                            customRadius === "0rem" ? "rounded-none" : "rounded-lg",
                          )}
                        >
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Lightness</span>
                              <span>{(parsed.l * 100).toFixed(0)}%</span>
                            </div>
                            <Slider
                              value={[parsed.l * 100]}
                              onValueChange={([v]) => updateColor(key, toOklch(v / 100, parsed.c, parsed.h))}
                              max={100}
                              step={1}
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Chroma</span>
                              <span>{parsed.c.toFixed(3)}</span>
                            </div>
                            <Slider
                              value={[parsed.c * 100]}
                              onValueChange={([v]) => updateColor(key, toOklch(parsed.l, v / 100, parsed.h))}
                              max={40}
                              step={0.5}
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Hue</span>
                              <span>{parsed.h.toFixed(0)}°</span>
                            </div>
                            <Slider
                              value={[parsed.h]}
                              onValueChange={([v]) => updateColor(key, toOklch(parsed.l, parsed.c, v))}
                              max={360}
                              step={1}
                            />
                          </div>
                          <div className="pt-2 border-t border-border">
                            <Label className="text-xs">Raw Value</Label>
                            <Input
                              value={value}
                              onChange={(e) => updateColor(key, e.target.value)}
                              className="mt-1 h-7 text-xs font-mono"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
