import GitHubButton from '@/components/GithubButton';
import GoogleButton from '@/components/GoogleButton';
import InputElement from '@/components/InputElement';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { BsFacebook } from 'react-icons/bs';
import Lottie from 'lottie-react';
import { storageToken } from '@/utils/TokenStorage';
import { AccountLoginRequest } from '@/models/request/AccountLoginRequest';
import { signIn, signUpWithoutVerify } from '@/services/AuthService';
import animationSignIn from '@/assets/lottieJson/signin.json';
import { useRouter } from 'next/navigation';
import { RegisterWithoutVerifyRequest } from '@/models/request/RegisterWithoutVerifyRequest';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Link from 'next/link';

export default function Login() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const token: string | null = storageToken.get();
        let roles: string = '';
        if (token != null) {
            const accessToken = JSON.parse(token).token;
            if (accessToken.length > 0) {
                const decoded: any = jwt_decode(accessToken);
                roles = decoded.authorities;
                const time = decoded.exp;
                const currentTime = Date.now() / 1000;
                if (time < currentTime) {
                    storageToken.remove();
                    setIsLogin(false);
                }

                switch (roles) {
                    case 'ROLE_ADMIN':
                        router.push('/dashboard');
                        break;
                    case 'ROLE_USER':
                        router.push('/');
                        break;
                    default:
                        break;
                }
            }
        }

        if (typeof window !== 'undefined') {
            window.fbAsyncInit = function () {
                FB.init({
                    appId: process.env.NEXT_PUBLIC_FACEBOOK_ID,
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: 'v17.0',
                });
            };

            (function (d: any, s: any, id: any) {
                var js,
                    fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = 'https://connect.facebook.net/en_US/sdk.js';
                fjs.parentNode.insertBefore(js, fjs);
            })(document, 'script', 'facebook-jssdk');
        }
        return () => {
            window.fbAsyncInit = function () {
                FB.init({
                    appId: process.env.NEXT_PUBLIC_FACEBOOK_ID,
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: 'v17.0',
                });
            };
        };
    }, [isLogin, router]);

    const handleLogin = async (e: any) => {
        try {
            e.preventDefault();
            const accountValue: AccountLoginRequest = {
                username,
                password,
            };
            const response = await signIn(accountValue);
            if (response.status === 200) {
                setIsLogin(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const onFBLoginClick = () => {
        try {
            window.FB.login(function (response: any) {
                try {
                    if (response.authResponse) {
                        window.FB.api(
                            '/me?fields=email,name,picture, id',
                            async function (response: any) {
                                const account: RegisterWithoutVerifyRequest = {
                                    email: response.email,
                                    avatar: response.picture.data.url,
                                    fullName: response.name,
                                    password: response.id,
                                    username: response.id,
                                };
                                try {
                                    const loginFB = await signIn({
                                        username: account.username,
                                        password: account.password,
                                    });
                                    if (loginFB.status === 200) {
                                        setIsLogin(true);
                                        return;
                                    }
                                } catch (err) {
                                    console.log(err);
                                }
                                if (isLogin === false) {
                                    const signUp = await signUpWithoutVerify(account);
                                    if (signUp.status === 200) {
                                        setIsLogin(true);
                                        await signIn({
                                            username: account.username,
                                            password: account.password,
                                        });
                                    }
                                } else {
                                    return;
                                }
                            }
                        );
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                } catch (err) {
                    console.log(err);
                }
            });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <form
            onSubmit={handleLogin}
            className="flex flex-wrap justify-around items-center flex-row pt-16"
        >
            <Lottie className="w-[38%] hidden md:block" animationData={animationSignIn} />
            <div className="flex-shrink-0 w-[330px] mt-20 text-2xl">
                <div className="flex flex-col justify-center items-center w-full">
                    <div className="text-center md:text-left w-full">
                        <label className="text-[30px] font-visbyCF">Sign in</label>
                        <p className="text-[15px] mt-4 mb-6 text-[#7C7F84] font-brandon">
                            Let practice and see your rewards!
                        </p>

                        <div className="flex justify-center items-center gap-10">
                            <GoogleButton />
                            <GitHubButton />
                            <BsFacebook
                                onClick={onFBLoginClick}
                                className="bg-white text-blue-500 rounded-full w-16 h-16 p-3 cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 w-full">
                        <p className="mx-4 mb-0 text-center font-semibold text-slate-500">or</p>
                    </div>
                    <div className="w-full flex flex-col">
                        <InputElement
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            id="username"
                            name="username"
                        />
                        <InputElement
                            className="relative"
                            value={password}
                            password
                            id="password"
                            name="password"
                            placeholder="Password"
                            visible={visible}
                            IconVisible={<AiFillEye />}
                            IconInvisible={<AiFillEyeInvisible />}
                            onChange={(e) => setPassword(e.target.value)}
                            onClick={() => setVisible(!visible)}
                        />
                    </div>
                    <div className="mt-10 w-full flex items-center justify-between font-semibold text-2xl">
                        <label className="flex items-center text-slate-500 hover:text-slate-600 cursor-pointer">
                            <input className="mr-1" type="checkbox" />
                            <span>Remember Me</span>
                        </label>
                        <a
                            className="text-blue-600 hover:text-blue-700 underline hover:underline-offset-4"
                            href="#"
                        >
                            Forgot Password?
                        </a>{' '}
                    </div>
                    <button
                        onClick={handleLogin}
                        className="w-full text-[20px] text-white mt-20 font-semibold bg-[#304ecc] rounded-xl p-4 text-center flex items-center justify-center"
                    >
                        Sign in
                    </button>
                    <div className="font-semibold text-slate-500 text-center mt-10 w-full">
                        <span>Don&apos;t have an account?</span>
                        <Link
                            href="/auth/register"
                            className="text-[#304ecc] hover:underline hover:underline-offset-4 cursor-pointer"
                        >
                            Sign up for free
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
}
