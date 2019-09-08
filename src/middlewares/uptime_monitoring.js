const aliveAt = new Date();

export const uptimeMonitoring = (req, res) => res.json({
  alive: true, // Static value to ensure response integrity
  aliveAt: aliveAt.toString(), // Used to calculate roll-out times
  timestamp: new Date().toString() // Is the system clock in sync?
});
