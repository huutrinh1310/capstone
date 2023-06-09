import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './button.module.scss';

const cx = classNames.bind(styles);
export interface ButtonProps {
    to?: string;
    href?: string;
    outline?: boolean;
    text?: string;
    small?: boolean;
    rounded?: boolean;
    large?: boolean;
    maxWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    submit?: boolean;
    disabled?: boolean;
    primary?: boolean;
}
export default function Button(props: ButtonProps) {
    let Element: string = 'button';
    let buttonProps: any = {
        onClick: props.onClick,
    };

    if (props.disabled) {
        <T extends object, U extends keyof T>(key: U) =>
            (obj: T) => {
                if (key.toString().startsWith('on') && typeof obj[key] === 'function') {
                    delete obj[key];
                }
            };
    }

    if (props.to) {
        buttonProps.to = props.to;
    } else if (props.href) {
        buttonProps.href = props.href;
        Element = 'a';
    }

    const classes: string = cx('wrapper', {
        className: props.className,
        primary: props.primary,
        outline: props.outline,
        text: props.text,
        disabled: props.disabled,
        rounded: props.rounded,
        small: props.small,
        large: props.large,
        maxWidth: props.maxWidth,
    });

    return (
        <Element className={classes} {...buttonProps}>
            {props.leftIcon && <span className={cx('left-icon')}>{props.leftIcon}</span>}
            <span className={cx('title')}>{props.children}</span>
            {props.rightIcon && <span className={cx('right-icon')}>{props.rightIcon}</span>}
        </Element>
    );
}
