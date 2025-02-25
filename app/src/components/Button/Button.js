import React from 'react'
import classNames from 'classnames'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import { linkShape } from '../../utils/link-generators.js'

import css from './Button.scss'

export const BUTTON_PALETTES = ['black', 'blue', 'orange']

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  inverted: PropTypes.bool,
  link: PropTypes.shape(linkShape),
  onClick: PropTypes.func,
  palette: PropTypes.oneOf(BUTTON_PALETTES),
  simple: PropTypes.bool,
}

export default function Button({
  children,
  className,
  disabled = false,
  inverted = false,
  link,
  onClick = null,
  palette = 'blue',
  simple = false,
  ...otherProps
}) {
  const { target, download, ...linkProps } = link || {}
  const buttonClassNames = classNames(css.button, css[palette], className, {
    [css.disabled]: disabled,
    [css.inverted]: inverted && !simple,
    [css.simple]: simple,
  })
  onClick = disabled ? () => false : onClick

  return !disabled && link ? (
    <Link {...linkProps}>
      <a
        className={buttonClassNames}
        target={target || null}
        download={download}
        tabIndex={disabled ? -1 : null}
        {...otherProps}
      >
        {children}
      </a>
    </Link>
  ) : (
    <button className={buttonClassNames} onClick={onClick} tabIndex={disabled ? -1 : null}>
      {children}
    </button>
  )
}
