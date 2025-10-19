#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function readPackageJson(pkgPath) {
  try {
    const raw = fs.readFileSync(pkgPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read package.json:', err.message);
    process.exit(1);
  }
}

function writePackageJson(pkgPath, pkg, dryRun) {
  try {
    const content = JSON.stringify(pkg, null, 2) + '\n';
    if (dryRun) return; // do not write on dry run
    fs.writeFileSync(pkgPath, content, 'utf8');
  } catch (err) {
    console.error('Failed to write package.json:', err.message);
    process.exit(1);
  }
}

function parseArgs(argv) {
  const type = argv[2];
  const flags = new Set(argv.slice(3));
  const dryRun = flags.has('--dry') || flags.has('-d');
  if (!['major', 'minor', 'patch'].includes(type)) {
    console.error(
      'Usage: node scripts/bumbUpVersion.js <major|minor|patch> [--dry|-d]',
    );
    process.exit(1);
  }
  return { type, dryRun };
}

function parseVersion(verStr) {
  // Accept flexible numeric segments, then normalize
  const parts = verStr.split('.');
  if (parts.length !== 3) {
    console.error(
      `Invalid version format in package.json: "${verStr}". Expected x.x.x`,
    );
    process.exit(1);
  }
  const [majS, minS, patS] = parts;
  const major = Number(majS);
  const minor = Number(minS);
  const patch = Number(patS);
  if (
    !Number.isInteger(major) ||
    !Number.isInteger(minor) ||
    !Number.isInteger(patch) ||
    major < 0 ||
    minor < 0 ||
    patch < 0
  ) {
    console.error(`Invalid version numbers in package.json: "${verStr}"`);
    process.exit(1);
  }
  return { major, minor, patch };
}

function formatVersion({ major, minor, patch }) {
  return `${major}.${minor}.${patch}`;
}

function normalize({ major, minor, patch }) {
  // Carry overflows from patch/minor to satisfy minor,patch in 0..9
  if (patch >= 10) {
    const carry = Math.floor(patch / 10);
    patch = patch % 10;
    minor += carry;
  }
  if (minor >= 10) {
    const carry = Math.floor(minor / 10);
    minor = minor % 10;
    major += carry;
  }
  return { major, minor, patch };
}

function bump(version, type) {
  let { major, minor, patch } = version;
  if (type === 'patch') {
    patch += 1;
  } else if (type === 'minor') {
    minor += 1;
    patch = 0;
  } else if (type === 'major') {
    major += 1;
    minor = 0;
    patch = 0;
  }
  return normalize({ major, minor, patch });
}

function main() {
  const { type, dryRun } = parseArgs(process.argv);
  const pkgPath = path.resolve(__dirname, '..', 'package.json');
  const pkg = readPackageJson(pkgPath);
  if (!pkg.version || typeof pkg.version !== 'string') {
    console.error('package.json does not contain a valid "version" field.');
    process.exit(1);
  }

  const current = parseVersion(pkg.version);
  const next = bump(current, type);

  const currentStr = formatVersion(current);
  const nextStr = formatVersion(next);

  // Ensure last 2 segments are single digits
  if (!/^\d+\.[0-9]\.[0-9]$/.test(nextStr)) {
    console.error(
      `Internal error: computed version "${nextStr}" violates x.[0-9].[0-9] constraint.`,
    );
    process.exit(1);
  }

  console.log(
    `${dryRun ? '[dry-run] ' : ''}Bumping version: ${currentStr} -> ${nextStr} (${type})`,
  );

  pkg.version = nextStr;
  writePackageJson(pkgPath, pkg, dryRun);
}

main();
