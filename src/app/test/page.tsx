import React from 'react'

const COLOR_CLASSES = [
  'bg-background',
  'bg-foreground',
  'bg-card',
  'bg-card-foreground',
  'bg-popover',
  'bg-popover-foreground',
  'bg-primary',
  'bg-primary-foreground',
  'bg-secondary',
  'bg-secondary-foreground',
  'bg-muted',
  'bg-muted-foreground',
  'bg-accent',
  'bg-accent-foreground',
  'bg-destructive',
  'bg-destructive-foreground',
  'bg-border',
  'bg-input',
  'bg-ring',
  'bg-chart-1',
  'bg-chart-2',
  'bg-chart-3',
  'bg-chart-4',
  'bg-chart-5',
  'bg-sidebar',
  'bg-sidebar-foreground',
  'bg-sidebar-primary',
  'bg-sidebar-primary-foreground',
  'bg-sidebar-accent',
  'bg-sidebar-accent-foreground',
  'bg-sidebar-border',
  'bg-sidebar-ring',
]

const FONT_VARS = ['sans', 'serif', 'mono']
const RADIUS_VARS = ['sm', 'md', 'lg', 'xl']
const SHADOW_VARS = ['2xs','xs','sm','md','lg','xl','2xl']
const OTHER_TESTS = [
  { label: 'spacing', cls: 'm-spacing p-4 bg-muted' },
  { label: 'tracking-normal', cls: 'tracking-normal text-lg' },
]

export default function Page() {
  return (
    <div className="p-8 space-y-12 bg-background text-foreground min-h-screen">
      {/* Colors */}
      <section>
        <h2 className="text-2xl mb-4 font-semibold">Color Swatches</h2>
        <div className="grid grid-cols-4 gap-4">
          {COLOR_CLASSES.map(bgClass => {
            // derive the CSS var name from the class
            const varName = `--${bgClass.replace('bg-', '')}`
            return (
              <div key={bgClass} className="flex items-center space-x-3">
                <div
                  className={`${bgClass} h-8 w-8 border border-border rounded-md`}
                />
                <span className="text-sm font-mono">{varName}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* Fonts */}
      <section>
        <h2 className="text-2xl mb-4 font-semibold">Font Families</h2>
        <div className="space-y-3">
          {FONT_VARS.map(f => (
            <p key={f} className={`font-${f}`}>
              <span className="font-bold">{`font-${f}: `}</span>
              The quick brown fox jumps over the lazy dog.
            </p>
          ))}
        </div>
      </section>

      {/* Radii */}
      <section>
        <h2 className="text-2xl mb-4 font-semibold">Border Radius</h2>
        <div className="flex items-center space-x-4">
          {RADIUS_VARS.map(r => (
            <div key={r} className="flex flex-col items-center">
              <div className={`bg-primary h-12 w-12 rounded-${r}`} />
              <span className="mt-2 text-sm">{`rounded-${r}`}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Shadows */}
      <section>
        <h2 className="text-2xl mb-4 font-semibold">Box Shadows</h2>
        <div className="flex flex-wrap gap-6">
          {SHADOW_VARS.map(s => (
            <div key={s} className="flex flex-col items-center">
              <div
                className={`bg-background h-16 w-16 shadow-${s} border border-border rounded-md`}
              />
              <span className="mt-2 text-sm">{`shadow-${s}`}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing & Tracking */}
      <section>
        <h2 className="text-2xl mb-4 font-semibold">Misc Utilities</h2>
        <div className="flex flex-wrap gap-6">
          {OTHER_TESTS.map(t => (
            <div key={t.label} className="flex flex-col items-start">
              <div className={t.cls}>
                <span>{t.label}</span>
              </div>
              <span className="mt-2 text-sm">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Input & Ring */}
      <section>
        <h2 className="text-2xl mb-4 font-semibold">Input & Ring</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Input test"
            className="bg-input border border-border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring">
            Button
          </button>
        </div>
      </section>
    </div>
  )
}
