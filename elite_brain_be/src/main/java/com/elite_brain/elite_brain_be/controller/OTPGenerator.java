package com.elite_brain.elite_brain_be.controller;

import java.util.Random;

public class OTPGenerator {
    private static final int OTP_LENGTH = 6;

    public static String generateOtp() {
        Random random = new Random();
        StringBuilder otp = new StringBuilder();

        for (int i = 0; i < OTP_LENGTH; i++) {
            otp.append(random.nextInt(10));
        }

        return otp.toString();
    }

//    private static final Integer EXPIRE_MIN = 5;
//    private LoadingCache<String, Integer> otpCache;
//
//    /**
//     * Constructor configuration.
//     */
//    public OTPGenerator()
//    {
//        super();
//        otpCache = CacheBuilder.newBuilder()
//                .expireAfterWrite(EXPIRE_MIN, TimeUnit.MINUTES)
//                .build(new CacheLoader<String, Integer>() {
//                    @Override
//                    public Integer load(String s) throws Exception {
//                        return 0;
//                    }
//                });
//    }
//
//    /**
//     * Method for generating OTP and put it in cache.
//     *
//     * @param key - cache key
//     * @return cache value (generated OTP number)
//     */
//    public Integer generateOTP(String key)
//    {
//        Random random = new Random();
//        int OTP = 100000 + random.nextInt(900000);
//        otpCache.put(key, OTP);
//
//        return OTP;
//    }
//
//    public int getOtp(String key) {
//        try {
//            return otpCache.get(key);
//        } catch (Exception e) {
//            return 0;
//        }
//    }
//
//    /**
//     * Method for getting OTP value by key.
//     *
//     * @param key - target key
//     * @return OTP value
//     */
//    public Integer getOPTByKey(String key)
//    {
//        return otpCache.getIfPresent(key);
//    }
//
//    /**
//     * Method for removing key from cache.
//     *
//     * @param key - target key
//     */
//    public void clearOTPFromCache(String key) {
//        otpCache.invalidate(key);
//    }
}