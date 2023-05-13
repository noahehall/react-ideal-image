import React, { useEffect, useState, type FC } from 'react'

import compose from '../composeStyle'
import {icons as defaultIcons} from '../constants'
import defaultTheme from '../theme'

const {load, loading, loaded, error, noicon, offline} = defaultIcons

const Media: FC<MediaProps> = ({
  iconColor = '#fff',
  iconSize = 64,
  icons = defaultIcons,
  theme = defaultTheme,
  ...props
}) => {
  const [dimensionElement, setDimensionElement] = useState<SVGSVGElement | null>(null)

  const renderIcon = (useProps) => {
    const {icon, icons, iconColor: fill, iconSize: size, theme} = useProps
    const iconToRender = icons[icon]

    if (!iconToRender) return null

    const styleOrClass = compose(
      {width: size + 100, height: size, color: fill},
      theme.icon,
    )

    return React.createElement('div', styleOrClass, [
      React.createElement(iconToRender, {fill, size, key: 'icon'}),
      React.createElement('br', {key: 'br'}),
      useProps.message,
    ])
  }

  const renderImage = (useProps) => {
    return useProps.icon === loaded ? (
      <img
        {...compose(useProps.theme.img)}
        src={useProps.src}
        alt={useProps.alt}
        width={useProps.width}
        height={useProps.height}
      />
    ) : (
      <svg
          {...compose(useProps.theme?.img ?? {})} // TODO(noah): shouldnt be undefined
        width={useProps.width}
        height={useProps.height}
        ref={ref => (setDimensionElement(ref))}
      />
    )
  }

  const renderNoscript = (useProps) => {
    return useProps.ssr ? (
      <noscript>
        <img
          {...compose(useProps.theme.img, useProps.theme.noscript)}
          src={useProps.nsSrc}
          srcSet={useProps.nsSrcSet}
          alt={useProps.alt}
          width={useProps.width}
          height={useProps.height}
        />
      </noscript>
    ) : null
  }

  useEffect(() => {
    if (props.onDimensions && dimensionElement)
      /* Firefox returns 0 for both clientWidth and clientHeight.
      To fix this we can check the parentNode's clientWidth and clientHeight as a fallback. */
      props.onDimensions({
        width:
          dimensionElement.clientWidth ||
          dimensionElement.parentNode?.clientWidth,
        height:
          dimensionElement.clientHeight ||
          dimensionElement.parentNode?.clientHeight,
      })
  }, [])

  const useProps = {
    iconColor,
    iconSize,
    icons,
    theme,
    ...props
  }

  let background
  if (useProps.icon === loaded) {
    background = {}
  } else if (useProps.placeholder.lqip) {
    background = {
      backgroundImage: `url("${useProps.placeholder.lqip}")`,
    }
  } else {
    background = {
      backgroundColor: useProps.placeholder.color,
    }
  }

  return (
    <div
      {...compose(
        useProps.theme.placeholder,
        background,
        useProps.style,
        useProps.className,
      )}
      onClick={useProps.onClick}
      onKeyPress={useProps.onClick} // TODO(noah): deprecated
      ref={useProps.innerRef}
    >
      {renderImage(useProps)}
      {renderNoscript(useProps)}
      {renderIcon(useProps)}
    </div>
  )
}


export default Media;
