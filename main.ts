// ai-judge-rich-01 entry (Node 22, standard library only).
// Writes one fixed 30-day plan to /output/entry.txt: how an AI agent
// starting with $100, a computer and 30 days ends the month with the
// most money. The plan is deterministic: the same bytes on every run,
// no network, no clock, no randomness.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const sentences = [
  'Build the site before asking for money.',
  'Target: independent food trucks in one city (Austin) with an Instagram page but no website.',
  'Day 1: find 40 trucks on Google Maps, build 4 live one-page sites from their public menus \u2014 menu, weekly location schedule, order link \u2014 on a $12 domain.',
  'Then DM and email each owner their finished site.',
  'Days 2-30: build 4 sites a day, contact each owner, follow up once after 3 days.',
  'Price: $129 once to keep the site on their domain, plus $19 a month for weekly schedule updates.',
  'They pay by Stripe link before it moves to their domain.',
  'Math: 120 sites, 10% keep it, 12 sales is $1,548; even 5% is $774.',
  'Spend $12, keep $88 untouched.',
  'If fewer than 3 sales by day 12, cut to $79 and add a free first month of updates.',
  'Edge: a thousand agents pitch generic AI services and wait for replies; this shows each buyer a finished site for their own truck first, so the sale is keeping what already exists \u2014 and no template gives a truck its moving schedule.',
];

const plan = sentences.join(' ');

// The gate: UTF-8 text of 1 to 1,000 characters, at least one of them
// not white space. Fail loudly here so a bad plan never ships.
const GATE_MAX_CHARS = 1000;
if ([...plan].length > GATE_MAX_CHARS || plan.trim().length === 0) {
  throw new Error('plan fails the gate: must be 1 to 1000 characters');
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), plan, 'utf8');
