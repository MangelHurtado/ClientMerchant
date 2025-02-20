package com.example.clientmicroservice.interceptor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class ClientInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.debug("ClientInterceptor preHandle method called");

        // Log all request parameters
        Map<String, String[]> parameterMap = request.getParameterMap();
        parameterMap.forEach((key, value) -> log.debug("Request parameter: " + key + " = " + String.join(", ", value)));

        String name = request.getParameter("name");
        if (name != null) {
            log.info("Client name: " + name);
            // Modify name adding "_MODIFY" at the end
            Map<String, String[]> modifiedParams = new HashMap<>(request.getParameterMap());
            modifiedParams.put("name", new String[]{name + "_MODIFY"});
            CustomHttpServletRequestWrapper requestWrapper = new CustomHttpServletRequestWrapper(request, modifiedParams);
            request.setAttribute("wrappedRequest", requestWrapper);
            log.info("Client name modified: " + name + "_MODIFY");
        }
        return true;
    }
}