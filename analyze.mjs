#!/usr/bin/env node
/**
 * analyze.mjs — Analisis konten smauii-dev-content
 * Jalankan: node analyze.mjs
 * Atau:     node analyze.mjs --missing   (tampilkan slot kosong)
 * Atau:     node analyze.mjs --json      (output JSON)
 */

import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

const TRACKS_DIR = "./tracks";
const SHOW_MISSING = process.argv.includes("--missing");
const JSON_OUTPUT = process.argv.includes("--json");

// Parse frontmatter sederhana
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split("\n")) {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) fm[key.trim()] = rest.join(":").trim().replace(/['"]/g, "");
  }
  return fm;
}

function readDir(dir) {
  try { return readdirSync(dir); } catch { return []; }
}

function isDir(p) {
  try { return statSync(p).isDirectory(); } catch { return false; }
}

// Warna terminal
const c = {
  reset: "\x1b[0m", bold: "\x1b[1m", dim: "\x1b[2m",
  green: "\x1b[32m", yellow: "\x1b[33m", blue: "\x1b[34m",
  cyan: "\x1b[36m", red: "\x1b[31m", gray: "\x1b[90m",
};

function bar(pct, width = 20) {
  const filled = Math.round((pct / 100) * width);
  return `[${"█".repeat(filled)}${"░".repeat(width - filled)}]`;
}

// ── Kumpulkan data ────────────────────────────────────────────────────────

const tracks = [];

for (const trackName of readDir(TRACKS_DIR).sort()) {
  const trackPath = join(TRACKS_DIR, trackName);
  if (!isDir(trackPath)) continue;

  const trackReadme = join(trackPath, "README.md");
  let trackMeta = {};
  try { trackMeta = parseFrontmatter(readFileSync(trackReadme, "utf8")); } catch {}

  const modules = [];
  for (const modName of readDir(trackPath).sort()) {
    const modPath = join(trackPath, modName);
    if (!isDir(modPath)) continue;

    const modReadme = join(modPath, "README.md");
    let modMeta = {};
    try { modMeta = parseFrontmatter(readFileSync(modReadme, "utf8")); } catch {}

    const lessons = [];
    for (const file of readDir(modPath).sort()) {
      if (!file.endsWith(".md") || file === "README.md") continue;
      const filePath = join(modPath, file);
      const content = readFileSync(filePath, "utf8");
      const meta = parseFrontmatter(content);
      const words = content.replace(/```[\s\S]*?```/g, "").split(/\s+/).length;
      lessons.push({
        file, slug: `${trackName}/${modName}/${file.replace(".md", "")}`,
        title: meta.title || file, level: meta.level || "?",
        duration: meta.duration || "?", author: meta.author || "?",
        updated: meta.updated || "?", words,
        hasLatex: content.includes("$$") || content.includes("$`"),
        hasMermaid: content.includes("```mermaid"),
        hasExercise: /## Latihan/i.test(content),
      });
    }
    modules.push({ name: modName, title: modMeta.title || modName, lessons });
  }
  tracks.push({ name: trackName, title: trackMeta.title || trackName, icon: trackMeta.icon || "📁", modules });
}

// ── JSON output ───────────────────────────────────────────────────────────

if (JSON_OUTPUT) {
  console.log(JSON.stringify(tracks, null, 2));
  process.exit(0);
}

// ── Pretty output ─────────────────────────────────────────────────────────

const totalLessons = tracks.flatMap(t => t.modules.flatMap(m => m.lessons)).length;
const totalModules = tracks.flatMap(t => t.modules).length;
const totalTracks = tracks.length;
const maxLessons = Math.max(...tracks.map(t => t.modules.flatMap(m => m.lessons).length));

console.log(`
${c.bold}${c.cyan}╔══════════════════════════════════════════════════╗
║       smauii-dev-content — Content Analyzer      ║
╚══════════════════════════════════════════════════╝${c.reset}

${c.bold}Ringkasan:${c.reset}
  ${c.green}●${c.reset} ${totalTracks} track  ${c.green}●${c.reset} ${totalModules} modul  ${c.green}●${c.reset} ${totalLessons} lesson
`);

// ── Per track ─────────────────────────────────────────────────────────────

for (const track of tracks) {
  const lessons = track.modules.flatMap(m => m.lessons);
  const pct = Math.round((lessons.length / maxLessons) * 100);
  const levels = { beginner: 0, intermediate: 0, advanced: 0, "?": 0 };
  lessons.forEach(l => levels[l.level] = (levels[l.level] || 0) + 1);

  console.log(`${c.bold}${track.icon} ${track.title}${c.reset} ${c.gray}(${track.name})${c.reset}`);
  console.log(`  ${c.dim}${bar(pct)}${c.reset} ${lessons.length} lesson / ${track.modules.length} modul`);
  console.log(`  ${c.green}▸ beginner:${c.reset} ${levels.beginner}  ${c.yellow}▸ intermediate:${c.reset} ${levels.intermediate}  ${c.red}▸ advanced:${c.reset} ${levels.advanced}`);

  for (const mod of track.modules) {
    const hasReadme = readDir(join(TRACKS_DIR, track.name, mod.name)).includes("README.md");
    const readmeIcon = hasReadme ? c.green + "✓" + c.reset : c.red + "✗" + c.reset;
    console.log(`\n  ${c.cyan}📂 ${mod.title || mod.name}${c.reset} ${readmeIcon}`);

    if (mod.lessons.length === 0) {
      console.log(`     ${c.red}⚠  Belum ada lesson!${c.reset}`);
    } else {
      for (const l of mod.lessons) {
        const levelColor = l.level === "beginner" ? c.green : l.level === "intermediate" ? c.yellow : c.red;
        const features = [
          l.hasLatex ? "LaTeX" : "", l.hasMermaid ? "Mermaid" : "", l.hasExercise ? "Latihan" : ""
        ].filter(Boolean).join(", ");
        console.log(`     ${c.dim}${l.file}${c.reset}`);
        console.log(`       ${levelColor}${l.level}${c.reset}  ⏱ ${l.duration}m  👤 ${l.author}  💬 ${l.words} kata  ${c.dim}${features}${c.reset}`);
      }
    }
  }
  console.log();
}

// ── Slot kosong (--missing) ───────────────────────────────────────────────

if (SHOW_MISSING) {
  console.log(`${c.bold}${c.yellow}⚠  Slot yang Butuh Kontribusi:${c.reset}\n`);

  // Modul tanpa lesson
  for (const track of tracks) {
    for (const mod of track.modules) {
      if (mod.lessons.length === 0) {
        console.log(`  ${c.red}KOSONG${c.reset}  ${track.icon} ${track.title} › ${mod.title}`);
        console.log(`         Buat: tracks/${track.name}/${mod.name}/01-nama-lesson.md\n`);
      } else if (mod.lessons.length < 2) {
        console.log(`  ${c.yellow}PERLU +${c.reset}  ${track.icon} ${track.title} › ${mod.title} (${mod.lessons.length} lesson)`);
        console.log(`         Buat: tracks/${track.name}/${mod.name}/0${mod.lessons.length + 1}-nama-lesson.md\n`);
      }
    }
  }

  // Lesson tanpa latihan
  console.log(`${c.bold}${c.yellow}Lesson tanpa section ## Latihan:${c.reset}\n`);
  for (const track of tracks) {
    for (const mod of track.modules) {
      for (const l of mod.lessons) {
        if (!l.hasExercise) {
          console.log(`  ${c.dim}${track.name}/${mod.name}/${l.file}${c.reset}`);
        }
      }
    }
  }
}

// ── Saran kontribusi ──────────────────────────────────────────────────────

if (!SHOW_MISSING) {
  console.log(`${c.bold}${c.cyan}💡 Cara Berkontribusi:${c.reset}

  1. Lihat slot kosong:     ${c.bold}node analyze.mjs --missing${c.reset}
  2. Pilih modul yang ingin diisi
  3. Baca panduan:          ${c.bold}cat CONTRIBUTING.md${c.reset}
  4. Buat lesson baru dan PR ke main

  ${c.dim}Butuh inspirasi? Baca CONTRIBUTING.md#roadmap-konten-yang-dibutuhkan${c.reset}
`);
}
