#!/usr/bin/env node
/*
 * _validate.js — RevArc Command Centre page validator
 * Usage:  node _validate.js <file.html>        (one file)
 *         node _validate.js                     (all *.html in cwd)
 *
 * Enforces the guardrail from .cursorrules: never remove an element JS writes to,
 * or rename an id, without updating every reference.
 *
 * Checks per file:
 *   1. Every inline <script> parses (JS syntax).
 *   2. Every getElementById("id") resolves to an id present in the markup.   [ERROR]
 *   3. Every bare querySelector("#id") / querySelectorAll("#id") resolves.   [warn]
 *   4. No duplicate ids in the markup.                                       [ERROR]
 *   5. If the command palette is present, window.__rkCmdkPort guard exists.  [warn]
 *
 * Prints "ALL JS OK" and exits 0 on success (warnings allowed).
 * Prints a report and exits 1 on any ERROR.
 */
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');

function listTargets() {
  const arg = process.argv[2];
  if (arg) return [arg];
  return fs.readdirSync(process.cwd()).filter(f => f.toLowerCase().endsWith('.html'));
}

function validate(file) {
  let html;
  try { html = fs.readFileSync(file, 'utf8'); }
  catch (e) { return { file, errors: ['cannot read file: ' + e.message], warnings: [] }; }

  const errors = [];
  const warnings = [];
  let m;

  // --- ids defined in markup (ignore ids that appear inside <script> strings) ---
  const htmlNoScript = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,
    s => '\n'.repeat((s.match(/\n/g) || []).length));
  const idDefs = new Map();
  const idAttrRe = /\sid\s*=\s*("([^"]*)"|'([^']*)')/g;
  while ((m = idAttrRe.exec(htmlNoScript))) {
    const id = (m[2] !== undefined ? m[2] : m[3]).trim();
    if (id) idDefs.set(id, (idDefs.get(id) || 0) + 1);
  }
  for (const [id, c] of idDefs) if (c > 1) errors.push(`duplicate id "${id}" (${c}×)`);

  // --- extract inline JS script blocks (skip external + non-JS types) ---
  const scripts = [];
  const scriptRe = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  while ((m = scriptRe.exec(html))) {
    const attrs = m[1] || '';
    if (/\bsrc\s*=/.test(attrs)) continue;
    if (/type\s*=\s*["'](?!text\/javascript|module|application\/javascript)/i.test(attrs)) continue;
    const line = (html.slice(0, m.index).match(/\n/g) || []).length + 1;
    scripts.push({ code: m[2], line });
  }

  // --- 1. syntax check ---
  for (const s of scripts) {
    try { new vm.Script(s.code, { filename: `${file}:${s.line}` }); }
    catch (e) { errors.push(`JS syntax error near line ${s.line}: ${e.message}`); }
  }

  const js = scripts.map(s => s.code).join('\n');

  // --- 2. getElementById references ---
  const gebi = /getElementById\(\s*(['"`])([^'"`]+)\1\s*\)/g;
  const missing = new Set();
  while ((m = gebi.exec(js))) if (!idDefs.has(m[2])) missing.add(m[2]);
  for (const id of missing) errors.push(`getElementById("${id}") → no element with that id`);

  // --- 3. bare #id querySelector references (warn: id may be created at runtime) ---
  const qs = /querySelector(All)?\(\s*(['"`])([^'"`]+)\2\s*\)/g;
  const qsMissing = new Set();
  while ((m = qs.exec(js))) {
    const simple = /^#([A-Za-z][\w-]*)$/.exec(m[3].trim());
    if (simple && !idDefs.has(simple[1])) qsMissing.add(simple[1]);
  }
  for (const id of qsMissing) warnings.push(`querySelector("#${id}") → no static element with id "${id}" (runtime-created?)`);

  // --- 5. command palette guard ---
  if (/__rkCmdkPort/.test(js) || /rk-cmdk/.test(html)) {
    if (!/window\.__rkCmdkPort/.test(js)) warnings.push('command palette present but window.__rkCmdkPort guard not found');
  }

  return { file, errors, warnings };
}

let failed = false;
for (const f of listTargets()) {
  const { file, errors, warnings } = validate(f);
  if (errors.length) {
    failed = true;
    console.error(`✗ ${path.basename(file)}`);
    for (const e of errors) console.error('  ERROR  ' + e);
    for (const w of warnings) console.error('  warn   ' + w);
  } else {
    for (const w of warnings) console.error(`  warn   ${path.basename(file)}: ${w}`);
    console.log(`ALL JS OK${process.argv[2] ? '' : '  — ' + path.basename(file)}`);
  }
}
process.exit(failed ? 1 : 0);
