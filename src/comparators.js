
export const semVer = (v, vSet) => {
  let s = v.split('.')
  if (s.length === 1) s = `${s[0]}.0.0`
  if (s.length === 2) s = `${s[0]}.${s[1]}.0`
  else s = s.join('.')
  s = s.toLowerCase()
  if (vSet.includes(s)) return s
  return undefined
}
