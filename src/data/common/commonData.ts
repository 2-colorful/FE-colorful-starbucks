export const SCROLL_TO_TOP_HIDDEN_PATHS = [
  '/cart',
  '/payment',
  '/my-page',
  '/orders',
  '/coupon',
  '/address',
  '/search',
  '/sign',
  '/pay',
] as const;

export const SCROLL_CONSTANTS = {
  THROTTLE_WAIT: 300,
  SCROLL_THRESHOLD: 100,
  ANIMATION_STEPS: 20,
  ANIMATION_INTERVAL: 15,
} as const;
