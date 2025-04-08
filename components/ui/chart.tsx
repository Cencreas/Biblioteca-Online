import type React from "react"
export const Chart = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative">{children}</div>
}

export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="absolute inset-0">{children}</div>
}

export const ChartLegend = () => {
  return null
}

export const ChartTooltip = () => {
  return null
}

export const ChartTooltipContent = () => {
  return null
}

export const ChartTooltipItem = () => {
  return null
}

export const ChartTooltipLabel = () => {
  return null
}

export const ChartTooltipValue = () => {
  return null
}
