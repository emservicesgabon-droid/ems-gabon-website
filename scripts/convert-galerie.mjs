// scripts/convert-galerie.mjs
// -----------------------------------------------------------------------------
// Convertit les photos JPG / JPEG / PNG déposées dans public/galerie/* en WebP
// (qualité 80), au même endroit et avec le même nom de base.
//
// Utilisation :
//   node scripts/convert-galerie.mjs            -> convertit tout ce qui n'a pas
//                                                  déjà un .webp à côté
//   node scripts/convert-galerie.mjs --force    -> reconvertit même si le .webp
//                                                  existe déjà (écrase)
//   node scripts/convert-galerie.mjs --delete   -> supprime le JPG/PNG source
//                                                  après une conversion réussie
//
// Raccourci npm : npm run galerie:webp
// -----------------------------------------------------------------------------

import { readdir, stat, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const GALERIE_DIR = path.join(ROOT, "public", "galerie");

const SOURCE_EXTS = new Set([".jpg", ".jpeg", ".png"]);
const QUALITY = 80;

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const DELETE = args.includes("--delete");

// --- helpers -----------------------------------------------------------------

function humanSize(bytes) {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

/** Liste récursivement tous les fichiers d'un dossier. */
async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return []; // dossier absent -> rien à faire
  }
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

// --- main --------------------------------------------------------------------

async function main() {
  console.log("\n🖼️  Conversion JPG/PNG → WebP (qualité " + QUALITY + ")");
  console.log("   Dossier : public/galerie/\n");

  if (!existsSync(GALERIE_DIR)) {
    console.log("⚠️  Le dossier public/galerie/ est introuvable. Rien à convertir.\n");
    return;
  }

  const allFiles = await walk(GALERIE_DIR);
  const images = allFiles.filter((f) => SOURCE_EXTS.has(path.extname(f).toLowerCase()));

  if (images.length === 0) {
    console.log("ℹ️  Aucune image .jpg / .jpeg / .png trouvée dans public/galerie/.");
    console.log("   Dépose tes photos dans les sous-dossiers puis relance la commande.\n");
    return;
  }

  let converted = 0;
  let skipped = 0;
  let failed = 0;
  let bytesIn = 0;
  let bytesOut = 0;

  for (const input of images) {
    const rel = path.relative(GALERIE_DIR, input).replace(/\\/g, "/");
    const output = input.slice(0, input.length - path.extname(input).length) + ".webp";
    const outRel = path.relative(GALERIE_DIR, output).replace(/\\/g, "/");

    if (existsSync(output) && !FORCE) {
      console.log(`⏭️  ${rel}  (déjà converti, ignoré)`);
      skipped++;
      continue;
    }

    try {
      const inSize = (await stat(input)).size;
      await sharp(input).webp({ quality: QUALITY }).toFile(output);
      const outSize = (await stat(output)).size;

      bytesIn += inSize;
      bytesOut += outSize;
      converted++;

      const gain = inSize > 0 ? Math.round((1 - outSize / inSize) * 100) : 0;
      console.log(
        `✅  ${rel} → ${outRel}  ` +
          `(${humanSize(inSize)} → ${humanSize(outSize)}, -${gain}%)`
      );

      if (DELETE) {
        await unlink(input);
        console.log(`   🗑️  source supprimée : ${rel}`);
      }
    } catch (err) {
      failed++;
      console.error(`❌  ${rel}  — échec : ${err.message}`);
    }
  }

  console.log("\n──────────────────────────────────────────────");
  console.log(`   Converties : ${converted}`);
  console.log(`   Ignorées   : ${skipped}` + (skipped ? "  (relance avec --force pour écraser)" : ""));
  if (failed) console.log(`   Échecs     : ${failed}`);
  if (converted) {
    const gainTotal = bytesIn > 0 ? Math.round((1 - bytesOut / bytesIn) * 100) : 0;
    console.log(
      `   Poids      : ${humanSize(bytesIn)} → ${humanSize(bytesOut)}  (-${gainTotal}%)`
    );
  }
  console.log("──────────────────────────────────────────────");
  console.log(
    "\n👉  Ajoute maintenant les entrées correspondantes dans data/galerie.json " +
      "(chemin en .webp), puis « pousse ».\n"
  );
}

main().catch((err) => {
  console.error("\n❌  Erreur inattendue :", err);
  process.exit(1);
});
