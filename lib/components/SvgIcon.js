var _this = this;

import React from 'react';
import PropTypes from 'prop-types';
import { Platform, ViewPropTypes, Animated } from 'react-native';
import Svg from 'react-native-svg';
import extractBrush from 'react-native-svg/lib/extract/extractBrush';

var SvgIcon = function SvgIcon(props) {
    if (!props.name) {
        return null;
    }

    var name = props.svgs[props.name + '.' + Platform.OS] || props.svgs[props.name];

    if (!name) {
        return null;
    }

    var height = props.height && props.height.toString();
    var width = props.width && props.width.toString();
    var strokeWidth = props.strokeWidth && props.strokeWidth.toString();

    var isSimple = React.isValidElement(name);
    var svgEl = isSimple ? name : name.svg;

    var viewBox = void 0;

    if (props.viewBox && props.viewBox !== SvgIcon.defaultProps.viewBox) {
        viewBox = props.viewBox;
    } else if (!isSimple && name.viewBox) {
        viewBox = name.viewBox;
    } else if (props.defaultViewBox) {
        viewBox = props.defaultViewBox;
    } else {
        viewBox = SvgIcon.defaultProps.viewBox;
    }

    updateFillProps();

    return React.createElement(
        Svg,
        { height: height, width: width, viewBox: viewBox, style: props.style },
        React.cloneElement(svgEl, {
            fill: props.fill.hexString ? props.fill.hexString() : props.fill.__getValue(),
            fillRule: props.fillRule,
            stroke: props.stroke,
            strokeWidth: strokeWidth,
            ref: function ref(_ref) {
                return _this.path = _ref;
            }
        })
    );

    /**
     * Override 'fill' attribute to handle the color variation of icon
     */
    function updateFillProps() {
        var _this2 = this;

        if (!props.fill || !props.animatedValue) return;

        props.animatedValue.addListener(function () {
            _this2.path.setNativeProps({
                fill: extractBrush(props.fill.__getAnimatedValue())
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
    fill: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
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