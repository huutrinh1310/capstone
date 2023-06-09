import { getProfile } from '@/services/AuthService';
import { storageToken } from '@/utils/TokenStorage';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface HomeLayoutProps {}

export default function HomeLayout(props: HomeLayoutProps) {
    const [isLogin, setIsLogin] = React.useState<Boolean>(false);
    const router = useRouter();

    React.useEffect(() => {
        const checkAuthen = async () => {
            try {
                const result = await getProfile();
                const loginFail = typeof result.data === 'string';
                if (loginFail) {
                    storageToken.remove();
                    router.push('/auth');
                }
            } catch (e) {
                console.log(e);
            }
        };
        checkAuthen().then((r) => console.log(r));
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin]);

    return <div></div>;
}
