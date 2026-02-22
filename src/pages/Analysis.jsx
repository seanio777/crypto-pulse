import MarketChart from '../components/MarketChart';

const Analysis = () => {
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Market Analysis</h1>
      <MarketChart />
    </div>
  );
};

export default Analysis;