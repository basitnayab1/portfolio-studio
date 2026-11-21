import type { ProfileId } from './data/portfolio';

const subdomains: Record<ProfileId, string> = {
  basit: 'basitnayab',
  faraz: 'faraz',
  ahram: 'ahram',
  mubashir: 'mubashir',
};

export function profileFromHostname(hostname: string): ProfileId | null {
  const host = hostname.toLowerCase().replace(/\.$/, '');

  // Dedicated custom domains (e.g. mubashirmuneer.com, mubashir.ae, etc.)
  if (host.includes('mubashir')) return 'mubashir';
  if (host.includes('basitnayab')) return 'basit';
  if (host.includes('faraz')) return 'faraz';
  if (host.includes('ahram')) return 'ahram';

  // Subdomains of cinetrio.com
  if (host.endsWith('.cinetrio.com')) {
    const subdomain = host.slice(0, -'.cinetrio.com'.length);
    return (Object.keys(subdomains) as ProfileId[]).find((id) => subdomains[id] === subdomain) ?? null;
  }

  return null;
}

export function profileUrl(id: ProfileId): string {
  return `https://${subdomains[id]}.cinetrio.com/`;
}

export function isStudioDomain(hostname: string): boolean {
  return ['cinetrio.com', 'www.cinetrio.com'].includes(hostname.toLowerCase().replace(/\.$/, ''));
}
