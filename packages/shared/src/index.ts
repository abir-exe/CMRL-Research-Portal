export const VERSION = '1.0.0';

export const UNIVERSITIES = [
  'Pabna University of Science and Technology',
  'University of Dhaka',
  'Bangladesh University of Engineering and Technology',
  'Rajshahi University',
  'Shahjalal University of Science and Technology',
  'Other University',
] as const;

export type UniversityOption = (typeof UNIVERSITIES)[number];

export const DEPARTMENTS = [
  'Department of Physics',
  'Department of Chemistry',
  'Department of Materials Science and Engineering',
  'Department of Computer Science and Engineering',
  'Department of Electrical and Electronic Engineering',
  'Other Department',
] as const;

export type DepartmentOption = (typeof DEPARTMENTS)[number];

/**
 * Validates and normalizes Bangladeshi mobile numbers.
 * Accepts format: 013XXXXXXXX..019XXXXXXXX or +88013XXXXXXXX..+88019XXXXXXXX.
 * Returns normalized string in +8801XXXXXXXXX format, or null if invalid.
 */
export function normalizeBDMobile(input: string): string | null {
  const trimmed = input.trim().replace(/[\s-]/g, '');
  if (!trimmed) return null;

  // Regex matches 01[3-9]XXXXXXXX or +8801[3-9]XXXXXXXX
  const bdMobileRegex = /^(?:\+?88)?(01[3-9]\d{8})$/;
  const match = trimmed.match(bdMobileRegex);

  if (!match) return null;

  const localTenDigits = match[1]; // e.g. 01712345678
  return `+88${localTenDigits}`;
}

/**
 * Validates University Roll: must contain digits only.
 */
export function validateUniversityRoll(roll: string): boolean {
  const trimmed = roll.trim();
  if (!trimmed) return false;
  return /^\d+$/.test(trimmed);
}
