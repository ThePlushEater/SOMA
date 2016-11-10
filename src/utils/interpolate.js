export function cosineInterpolate(start, end, mu) {
  let mu2 = (1 - Math.cos(mu * Math.PI)) / 2;
  return[(start[0] * (1 - mu2) + end[0] * mu2), (start[1] * (1 - mu2) + end[1] * mu2), (start[2] * (1 - mu2) + end[2] * mu2)];
}

export function linearInterpolate(start, end, mu) {
  return[(start[0] * (1 - mu) + end[0] * mu), (start[1] * (1 - mu) + end[1] * mu), (start[2] * (1 - mu) + end[2] * mu)];
}
