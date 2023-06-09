import * as React from 'react';

export interface GlobalStyleProps {
    children: React.ReactNode;
}

export default function GlobalStyle(props: GlobalStyleProps) {
    return <>{props.children}</>;
}
