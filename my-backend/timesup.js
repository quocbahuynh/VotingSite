let today = new Date();
const startDate = process.env.TIMEUP;
const endDate = today;
const diffInMs = (new Date(startDate) - new Date(endDate)) / 1000;

export default diffInMs;
