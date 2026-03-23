export type TabKey = 'media' | 'businesses' | 'partners';

export const data: Record<
  TabKey,
  { items: string[]; btn: string; tab: string }
> = {
  media: {
    items: [
      'Got experience with sweepstakes and large ad budgets? Looking for a team where you can grow and scale without limits?',
      'Multiply your profits with MULTICPA — we provide the budget, all the toolsand high profit shares'
    ],
    btn: 'JOIN THE TEAM',
    tab: 'For Media Buyers'
  },
  businesses: {
    items: [
      'Need real customers — not theories on how to get them? Have a budget, but no traffic team, creatives, or strategy?',
      'Contact MULTICPA — we’ll build everything from the ground up, drive traffic, and deliver leads in any niche'
    ],
    btn: 'Launch Now',
    tab: 'For Businesses'
  },
  partners: {
    items: [
      'Experienced solo buyer or running a whole team? Need a reliable partner program with fast onboarding in sweepstakes and full support?',
      'Work with MULTICPA — you run the traffic, we handle everything else. From infrastructure and tech support to funnels, creatives, and expert guidance'
    ],
    btn: 'partner up',
    tab: 'For Partners'
  }
};
