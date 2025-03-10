package com.example.clientmicroservice.interceptor;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Slf4j
public class JwtInterceptor implements HandlerInterceptor {

    private static final String SECRET_KEY = "a-string-secret-at-least-256-bits-long";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("Intercepting request to check if user is over 18 years old");

        // Check if the Authorization header is present and has a Bearer token
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {

            // Extract the token from the Authorization header excluding the "Bearer " prefix
            token = token.substring(7);
            try {

                // Verify the token using the secret key
                Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(token);

                // Check if the age claim is present and if the user is over 18 years old
                int age = decodedJWT.getClaim("age").asInt();
                if (age < 18) {

                    // Send a 403 Forbidden response if the user is under 18 years old
                    sendErrorResponse(response, HttpServletResponse.SC_FORBIDDEN, "User is under 18 years old");
                    return false;
                }
            } catch (Exception e) {

                // Send a 401 Unauthorized response if the token is invalid
                sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
                return false;
            }
        } else {

            // Send a 401 Unauthorized response if the Authorization header is missing or has an invalid format
            sendErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Missing or invalid Authorization");
            return false;
        }
        return true;
    }

    private void sendErrorResponse(HttpServletResponse response, int status, String message) throws IOException {

        // Send an error response with the specified status code and message
        response.setStatus(status);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\": \"" + message + "\"}");
    }
}