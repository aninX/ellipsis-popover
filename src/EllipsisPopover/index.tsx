/**
 * @file Ellipsis Popover
 * @author anin
 * @lastEditors
 */

import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {PopoverProps} from 'antd';
import {Popover} from 'antd';
import 'antd/es/popover/style/css'
export interface EllipsisPopoverProp extends PopoverProps {
    text: string | React.ReactNode;
    tag?: React.ReactNode;
}
const EllipsisPopover: FC<EllipsisPopoverProp> = ({text, tag, ...rest}) => {
    const [Visible, setVisible] = useState<boolean>(false);
    const eleRef = useRef<HTMLDivElement>(null);
    const setVisibleHandle = useCallback(() => {
        const ele = eleRef.current;
        if (ele && ele.scrollWidth > ele.offsetWidth) {
            setVisible(true);
            return;
        }
        setVisible(false);
    }, []);
    useEffect(() => {
        setVisibleHandle();
        window.addEventListener('resize', setVisibleHandle);
        return () => {
            window.removeEventListener('resize', setVisibleHandle);
        };
    }, [setVisibleHandle, text]);
    const content = (
        <div
            ref={eleRef}
            style={{
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            }}
        >
            {tag}
            {text || '-'}
        </div>
    );

    return (
        <div className="ellipsis-popover">
            {Visible ? (
                <Popover
                    content={text}
                    {...rest}
                    // trigger={['click', 'hover']}
                >
                    {content}
                </Popover>
            ) : (
                content
            )}
        </div>
    );
};
export default EllipsisPopover;