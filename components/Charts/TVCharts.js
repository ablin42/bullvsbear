// @EXTERNALS
import React from "react";
// @COMPONENTS
import { TradingViewWidget } from "./TVWidget";

// * RETURNS TRADINGVIEW CHARTS FOR BTC/USDT AND BNB/USDT *
export default function TVCharts() {
  const studies = ["BB@tv-basicstudies", "WilliamsFractal@tv-basicstudies"];

  return (
    <div style={{ display: "flex" }}>
      <TradingViewWidget
        symbol={"BTCUSDT"}
        interval="5"
        locale="en"
        timezone="Europe/Paris"
        hideSideToolbar={true}
        studies={studies}
        idd="abc"
      />
      <TradingViewWidget
        symbol={"BNBUSDT"}
        interval="5"
        locale="en"
        timezone="Europe/Paris"
        hideSideToolbar={true}
        studies={studies}
        idd="bcd"
      />
    </div>
  );
}
