const generatePastelColor = () => {
  const hue = Math.floor(Math.random() * 360); 
  const saturation = Math.floor(Math.random() * 30) + 70; 
  const lightness = Math.floor(Math.random() * 10) + 70;
  return `hsl(${hue},${saturation}%,${lightness}%)`;
}

export default generatePastelColor;