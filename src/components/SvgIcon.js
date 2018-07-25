import React from 'react';
import PropTypes from 'prop-types';
import { Platform, ViewPropTypes, Animated } from 'react-native';
import Svg from 'react-native-svg';
import extractBrush from 'react-native-svg/lib/extract/extractBrush';

const SvgIcon = (props) => {
    if (!props.name) {
        return null;
    }

    const name = props.svgs[`${props.name}.${Platform.OS}`] || props.svgs[props.name];

    if (!name) {
        return null;
    }

    const height = props.height && props.height.toString();
    const width = props.width && props.width.toString();
    const strokeWidth = props.strokeWidth && props.strokeWidth.toString();

    const isSimple = React.isValidElement(name);
    const svgEl = isSimple ? name : name.svg;

    let viewBox;

    if (props.viewBox && props.viewBox !== SvgIcon.defaultProps.viewBox) {
        viewBox = props.viewBox;
    }
    else if (!isSimple && name.viewBox) {
        viewBox = name.viewBox;
    }
    else if (props.defaultViewBox) {
        viewBox = props.defaultViewBox;
    }
    else {
        viewBox = SvgIcon.defaultProps.viewBox;
    }

    updateFillProps();

    return (
        <Svg height={height} width={width} viewBox={viewBox} style={props.style}>
            {React.cloneElement(svgEl, {
                fill: props.fill.hexString ? props.fill.hexString() : props.fill.__getValue(),
                fillRule: props.fillRule,
                stroke: props.stroke,
                strokeWidth: strokeWidth,
                ref: ref => (this.path = ref)
            })}
        </Svg>
    );

    /**
     * Override 'fill' attribute to handle the color variation of icon
     */
    function updateFillProps() {
      if (!props.fill || !props.animatedValue)
        return ;

      props.animatedValue.addListener(() => {
        this.path.setNativeProps({
          fill: extractBrush(props.fill.__getAnimatedValue()),
        });
      });
    }
  };

SvgIcon.defaultProps = {
    fill: '#000',
    fillRule: 'evenodd',
    height: '44',
    width: '44',
    viewBox: '0 0 100 100'
};

SvgIcon.propTypes = {
    fill: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
    animatedValue: PropTypes.instanceOf(Animated.Value),
    fillRule: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.oneOfType([ViewPropTypes.style, PropTypes.array, PropTypes.object]),
    svgs: PropTypes.object.isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    viewBox: PropTypes.string
};

export default SvgIcon;
