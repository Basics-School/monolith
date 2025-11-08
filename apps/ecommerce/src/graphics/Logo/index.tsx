import React from 'react'

const css = `
  html[data-theme="dark"] .graphic-logo {
    filter: brightness(0) invert(1);
  }

  .graphic-logo {
    width: 180px;
    height: auto;
  }
`

export const Logo = () => {
    return (
        <div className="graphic-logo">
            <style type="text/css">{ css }</style>
            <svg
                fill="currentColor"
                viewBox="0 0 200 50"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Custom logo - replace with your brand logo */ }
                <text
                    x="10"
                    y="35"
                    fontFamily="Arial, sans-serif"
                    fontSize="32"
                    fontWeight="bold"
                    fill="#000000"
                >
                    Your Brand
                </text>
            </svg>
        </div>
    )
}
