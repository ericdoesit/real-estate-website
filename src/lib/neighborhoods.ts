const PHOTOS = [
  '13705488963_76a358d8ac_o.jpg',
  '15060426861_f6d33577bb_k.jpg',
  '15306603569_ba5fff0f60_k.jpg',
  '15873911522_636c4c213a_o.jpg',
  '5609986343_1b278c4750_o.jpg',
  '9595594302_64be79ce3a_o.jpg',
  'alexis-balinoff-2KIDkMzmO-k-unsplash.jpg',
  'hero-1.jpg',
  'hero-2.jpg',
  'hero-3.jpg',
  'ivan-karpov-7oLuzIZ3QIg-unsplash.jpg',
  'pexels-anthony-thomas-733236359-18409401.jpg',
  'pexels-blackmakaw-19964276.jpg',
  'pexels-davidmcelwee-11695725.jpg',
  'pexels-duggiefresch-4329924.jpg',
  'pexels-loquellano-17928132.jpg',
  'pexels-martinpechy-2763964.jpg',
  'pexels-martinpechy-2763967.jpg',
  'pexels-myatezhny39-30151761.jpg',
  'pexels-myatezhny39-30151773.jpg',
  'pexels-rdne-8782693.jpg',
  'pexels-rdne-8783581.jpg',
  'pexels-rdne-8783590.jpg',
  'pexels-rdne-8783844.jpg',
  'pexels-robertkso-34960816.jpg',
  'pexels-rockwell-branding-agency-85164430-9137653.jpg',
  'pexels-rpnickson-2709964.jpg',
  'pexels-sergei-a-1322276-2539437.jpg',
  'pexels-vincent-gerbouin-445991-2263669.jpg',
  'pexels-vlada-karpovich-4449625.jpg',
]

export function getNeighborhoodPhoto(seed: string): string {
  const hash = seed.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  return PHOTOS[hash % PHOTOS.length]
}
