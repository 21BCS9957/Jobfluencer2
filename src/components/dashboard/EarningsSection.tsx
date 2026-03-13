'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const monthlyData = [
  { month: 'Jan', amount: 2400 },
  { month: 'Feb', amount: 3200 },
  { month: 'Mar', amount: 2800 },
  { month: 'Apr', amount: 4100 },
  { month: 'May', amount: 3600 },
  { month: 'Jun', amount: 4800 },
]

const transactions = [
  { date: '2026-03-12', project: 'E-commerce Redesign', amount: 2500, status: 'Completed' },
  { date: '2026-03-10', project: 'Portfolio Website', amount: 1200, status: 'Completed' },
  { date: '2026-03-08', project: 'Logo Design', amount: 450, status: 'Completed' },
  { date: '2026-03-05', project: 'Mobile App UI', amount: 3800, status: 'Pending' },
]

const Y_AXIS_STEPS = 5

export function EarningsSection() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const maxAmount = Math.max(...monthlyData.map(d => d.amount))
  const step = Math.ceil(maxAmount / 1000) * 1000 / (Y_AXIS_STEPS - 1)
  const yAxisLabels = Array.from({ length: Y_AXIS_STEPS }, (_, i) =>
    i === 0 ? 0 : Math.round(step * i)
  ).reverse()

  return (
    <section 
      ref={sectionRef}
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <h2 className="text-3xl font-bold mb-8">Earnings & Payments</h2>

      {/* Bar chart */}
      <div className="bg-[var(--brand-dark)] rounded-2xl p-6 sm:p-8 border border-white/10 mb-6 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Monthly Earnings</h3>
          <span className="text-sm text-gray-400">Last 6 months</span>
        </div>

        <div className="flex gap-1 sm:gap-2 min-h-[240px]">
          {/* Y-axis labels */}
          <div className="flex flex-col justify-between py-1 pr-2 text-right shrink-0">
            {yAxisLabels.map((val, i) => (
              <span key={i} className="text-xs font-medium text-gray-500 tabular-nums">
                {val >= 1000 ? `$${val / 1000}k` : `$${val}`}
              </span>
            ))}
          </div>

          {/* Chart area with grid */}
          <div className="flex-1 relative flex flex-col">
            {/* Horizontal grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {yAxisLabels.slice(0, -1).map((_, i) => (
                <div
                  key={i}
                  className="w-full border-b border-white/5"
                  style={{ flex: 0 }}
                />
              ))}
            </div>

            {/* Bars row - bars grow from bottom */}
            <div className="flex-1 flex items-end gap-2 sm:gap-3 pt-2 pb-1 px-1 h-[200px]">
              {monthlyData.map((data, i) => {
                const heightPct = maxAmount > 0 ? data.amount / maxAmount : 0
                const barHeightPx = Math.max(heightPct * 200, 12)
                return (
                  <motion.div
                    key={i}
                    className="flex-1 flex flex-col items-center min-w-0 h-full"
                    initial="hidden"
                    animate={visible ? 'visible' : 'hidden'}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { delay: i * 0.06 },
                      },
                    }}
                  >
                    <div className="relative w-full flex flex-col items-center flex-1 min-h-0 group h-full">
                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[52px] flex flex-col items-center"
                        style={{ height: 200, transformOrigin: 'bottom' }}
                        variants={{
                          hidden: { scaleY: 0 },
                          visible: {
                            scaleY: 1,
                            transition: {
                              delay: 0.15 + i * 0.06,
                              duration: 0.5,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          },
                        }}
                      >
                        <span className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#1a0f14] border border-white/10 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white whitespace-nowrap shadow-xl z-10">
                          ${data.amount.toLocaleString()}
                        </span>
                        <div
                          className="w-full rounded-t-lg bg-gradient-to-t from-[var(--brand-primary)] to-[var(--brand-secondary)] shadow-lg shadow-[var(--brand-primary)]/20 hover:brightness-110 transition-all duration-200 absolute bottom-0 left-0 right-0"
                          style={{ height: barHeightPx }}
                        />
                      </motion.div>
                    </div>
                    <span className="text-xs font-medium text-gray-400 mt-2 truncate w-full text-center shrink-0">
                      {data.month}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-[var(--brand-dark)] rounded-xl p-6 border border-white/10 mb-6">
        <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 text-sm font-medium text-gray-400">Date</th>
                <th className="text-left py-3 text-sm font-medium text-gray-400">Project</th>
                <th className="text-left py-3 text-sm font-medium text-gray-400">Amount</th>
                <th className="text-left py-3 text-sm font-medium text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 text-sm text-gray-300">{tx.date}</td>
                  <td className="py-3 text-sm">{tx.project}</td>
                  <td className="py-3 text-sm font-semibold text-[#22c55e]">${tx.amount.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tx.status === 'Completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdraw Button */}
      <button className="px-6 py-3 bg-gradient-to-r from-[#22c55e] to-[#16a34a] rounded-lg font-semibold hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105">
        Withdraw Earnings
      </button>
    </section>
  )
}
