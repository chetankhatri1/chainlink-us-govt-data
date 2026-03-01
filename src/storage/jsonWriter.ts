import { promises as fs } from 'fs';
import * as path from 'path';
import { CollectionResult, FeedRecord } from '../types';

export interface WriteReport {
  /** Successful records appended to records.ndjson. */
  written: number;
  /** Collection errors that produced no record. */
  skipped: number;
  /** Records written but flagged as stale. */
  stale: number;
}

/**
 * Appends one NDJSON line per successful FeedRecord to
 *   {outputDir}/records.ndjson
 *
 * The file grows with every collection run, giving a full historical
 * time-series.  Each line is a self-contained JSON object.
 *
 * Failed collection results are written to {outputDir}/errors.ndjson
 * so problems are visible without polluting the records file.
 */
export async function appendRecords(
  results: CollectionResult[],
  outputDir: string,
): Promise<WriteReport> {
  await fs.mkdir(outputDir, { recursive: true });

  const successes = results.filter((r): r is { ok: true; record: FeedRecord } => r.ok);
  const failures = results.filter(
    (r): r is Extract<CollectionResult, { ok: false }> => !r.ok,
  );

  if (successes.length > 0) {
    const lines = successes.map((r) => JSON.stringify(r.record)).join('\n') + '\n';
    await fs.appendFile(path.join(outputDir, 'records.ndjson'), lines, 'utf-8');
  }

  if (failures.length > 0) {
    const ts = new Date().toISOString();
    const lines = failures.map((r) => JSON.stringify({ ...r, ts })).join('\n') + '\n';
    await fs.appendFile(path.join(outputDir, 'errors.ndjson'), lines, 'utf-8');
  }

  return {
    written: successes.length,
    skipped: failures.length,
    stale: successes.filter((r) => r.record.stale).length,
  };
}

/**
 * Overwrites {outputDir}/latest.json with the most recent successful
 * record for each feed×network key ("BASE/GDP_LEVEL", etc.).
 *
 * Intended as a lightweight snapshot for dashboards and monitoring.
 */
export async function writeLatest(
  results: CollectionResult[],
  outputDir: string,
): Promise<void> {
  await fs.mkdir(outputDir, { recursive: true });

  const snapshot: Record<string, FeedRecord> = {};
  for (const r of results) {
    if (r.ok) {
      snapshot[`${r.record.network}/${r.record.feedId}`] = r.record;
    }
  }

  await fs.writeFile(
    path.join(outputDir, 'latest.json'),
    JSON.stringify(snapshot, null, 2),
    'utf-8',
  );
}

/**
 * Convenience wrapper: appends records and refreshes latest.json in one call.
 * Returns the WriteReport from appendRecords.
 */
export async function persist(
  results: CollectionResult[],
  outputDir: string,
): Promise<WriteReport> {
  const [report] = await Promise.all([
    appendRecords(results, outputDir),
    writeLatest(results, outputDir),
  ]);
  return report;
}
