export function transformWaveData(grouped) {

  const toUnix = (str) => {
    const [date, time] = str.split(" ");
    const [y, m, d] = date.split("-").map(Number);
    const [hh, mm, ss] = time.split(":").map(Number);
    return Date.UTC(y, m - 1, d, hh, mm, ss) / 1000;
  };

  // remove ocean sensor garbage values
  const clean = (v) => {
    const n = Number(v);

    if (
      isNaN(n) ||
      n === 0 ||
      n === -999 ||
      n === -9999 ||
      n === 9999 ||
      Math.abs(n) > 1000
    ) return null;

    return n;
  };

  const convert = (rows = []) => ({

    time: rows.map(r => toUnix(r.obstime)),

    hm0: rows.map(r => clean(r.hm0)),
    t1: rows.map(r => clean(r.t1)),
    dirp: rows.map(r => clean(r.dirp)),
    cs: rows.map(r => clean(r.cs)),

    lat: rows.map(r => Number(r.latitude)),
    lon: rows.map(r => Number(r.longitude)),
  });

  return {
    source1: convert(grouped["1"]),
    source2: convert(grouped["2"]),
  };
}
