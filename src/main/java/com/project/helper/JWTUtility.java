package com.project.helper;

import com.project.final_year_project.model.java.User;

import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JWTUtility {
    private final static String key = "8MGuma2moGSpmZYVt9HCjCa357LpIwd9w8inbw2KeMnW9aiZlutpE8nNijRQV6b";
    private final static SecretKey signWithKey = Keys.hmacShaKeyFor(Base64.getDecoder().decode(key));

    /**
     * 
     * @param username name of user who is going to recieve a token
     * @return the generated token for that user
     */
    public static String generateUserToken(User user) {
        Date expirationDate = new Date(System.currentTimeMillis() + 1000 * 60 * 60);
        String token = Jwts.builder().setSubject(user.getUsername()).claim("userID", user.getUserID())
                .claim("password", user.getPassword()).setIssuedAt(new Date()).setExpiration(expirationDate)
                .signWith(signWithKey, SignatureAlgorithm.HS256).compact();
        return token;
    }
}
