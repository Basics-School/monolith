import React from 'react'

const css = `
  html[data-theme="dark"] .graphic-icon {
    filter: brightness(0) invert(1);
  }

  .graphic-icon {
    width: 32px;
    height: auto;
  }
`

export const Icon = () => {
    return (
        <svg
            className="graphic-icon"
            fill="currentColor"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
        >
            <style type="text/css">{ css }</style>
            {/* Custom icon - replace with your brand icon */ }
            <circle cx="50" cy="50" r="40" fill="#000000" />
            <text
                x="50"
                y="65"
                fontFamily="Arial, sans-serif"
                fontSize="48"
                fontWeight="bold"
                fill="#ffffff"
                textAnchor="middle"
            >
                Y
            </text>
        </svg>
    )
}
