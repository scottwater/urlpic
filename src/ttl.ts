const unitsOfTime: { [unit: string]: number } = {
  second: 60,
  hour: 60 * 60,
  day: 24 * 60 * 60,
  month: 30 * 24 * 60 * 60,
  year: 365 * 24 * 60 * 60
};

const formatRawData = (rawData: string): string => {
  let newRawData = rawData.toLowerCase().trim();
  if (newRawData.endsWith("s")) {
    return newRawData.substr(0, newRawData.length - 1);
  }

  return newRawData;
};

export default function(rawData: string): number {
  const formattedRawData = formatRawData(rawData);

  const re = new RegExp("(\\d+)\\s*(\\w*)");

  const matches = formattedRawData.match(re);

  if (matches) {
    const number = Number(matches[1] || "1");
    const units = matches[2];
    const unitMultiplyer = unitsOfTime[units] || unitsOfTime.second;
    return number * unitMultiplyer;
  }

  return 60;
}
