// --- 修正箇所：ポイント計算ロジック ---
// budgetPoints を Math.floor で整数化
const budgetPoints = Math.floor((budget - 4000) / 1500);
const totalAvailablePoints = guestPoints + budgetPoints;
const remainingPoints = totalAvailablePoints - (bevLevel + ingLevel);

// --- 修正箇所：Time Select のレイアウト (start - end に固定) ---
// Time Selectの div クラスに flex-nowrap を追加し、幅を最適化しました
<div className="flex items-center justify-center border-b border-zinc-800 py-1 transition-colors w-full">
  <div className="flex flex-nowrap items-center justify-center gap-1">
    <select onChange={(e)=>setFormData({...formData, startTime:e.target.value})} required className="bg-transparent text-white outline-none font-elegant text-base md:text-lg appearance-none cursor-pointer focus:text-amber-500 text-center w-16 md:w-20">
      <option value="" className="bg-zinc-900 text-stone-500">Start</option>
      {Array.from({ length: 25 }, (_, i) => { const h = Math.floor(i / 2) + 10; const m = i % 2 === 0 ? "00" : "30"; const t = `${h}:${m}`; return h <= 21 ? <option key={t} value={t} className="bg-zinc-900 text-white">{t}</option> : null; })}
    </select>
    <span className="text-stone-600 font-elegant text-base md:text-lg">-</span>
    <select onChange={(e)=>setFormData({...formData, endTime:e.target.value})} required className="bg-transparent text-white outline-none font-elegant text-base md:text-lg appearance-none cursor-pointer focus:text-amber-500 text-center w-16 md:w-20">
      <option value="" className="bg-zinc-900 text-stone-500">End</option>
      {Array.from({ length: 25 }, (_, i) => { const h = Math.floor(i / 2) + 10; const m = i % 2 === 0 ? "00" : "30"; const t = `${h}:${m}`; return h <= 22 ? <option key={t} value={t} className="bg-zinc-900 text-white">{t}</option> : null; })}
    </select>
  </div>
</div>
