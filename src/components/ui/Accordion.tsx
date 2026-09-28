import { useState } from 'react'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
      {items.map((item, i) => (
        <div key={i}>
          <button
            className="w-full flex items-center justify-between py-5 text-left gap-4 transition-colors duration-150 hover:text-accent"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-sans font-medium text-base pr-2">{item.question}</span>
            <span
              className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border transition-transform duration-300"
              style={{
                borderColor: 'var(--color-border)',
                transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
              }}
              aria-hidden
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
          </button>

          <div
            className="grid overflow-hidden transition-all duration-300 ease-in-out"
            style={{ gridTemplateRows: open === i ? '1fr' : '0fr' }}
          >
            <div className="min-h-0">
              <p className="font-sans text-sm pb-5" style={{ color: 'var(--color-ink-muted)', lineHeight: '1.7' }}>
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
